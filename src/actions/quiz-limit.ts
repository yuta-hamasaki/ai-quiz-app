"use server"
import { createClient } from '@/utils/supabase/server'

// 環境変数の検証を関数として分離
const getStandardPlanId = (): string => {
  const standardPlanId = process.env.STANDARD_PLAN_ID
  if (!standardPlanId) {
    throw new Error('STANDARD_PLAN_ID environment variable is not set')
  }
  return standardPlanId
}

const updateLastQuizAt = async (userId: string) => {
  const supabase = createClient()
  const { error } = await (await supabase)
    .from('user_profile')
    .update({ last_quiz_at: new Date().toISOString() })
    .eq('id', userId)
  
  if (error) {
    throw new Error(`Failed to update last_quiz_at: ${error.message}`)
  }
}

const canUserTakeQuiz = async (userId: string, standardPlanId: string) => {
  const supabase = createClient()
  const { data: userProfile, error } = await (await supabase)
    .from('user_profile')
    .select('last_quiz_at, price')
    .eq('id', userId)
    .single() 

  if (error) {
    throw new Error(`Failed to fetch user profile: ${error.message}`)
  }

  // プランがstandardプランでない場合は制限なし
  if (userProfile.price !== standardPlanId) {
    return { canTake: true, hoursLeft: 0 }
  }

  // 最後にクイズを受けた時間がない場合は受けられる
  if (!userProfile.last_quiz_at) {
    return { canTake: true, hoursLeft: 0 }
  }

  // 最後にクイズを受けた時間から24時間経過したかチェック
  const lastQuizTime = new Date(userProfile.last_quiz_at)
  const now = new Date()
  const timeDiff = now.getTime() - lastQuizTime.getTime()
  const hoursElapsed = timeDiff / (1000 * 60 * 60) // ミリ秒を時間に変換

  if (hoursElapsed >= 24) {
    return { canTake: true, hoursLeft: 0 }
  } else {
    const hoursLeft = 24 - hoursElapsed
    return { canTake: false, hoursLeft }
  }
}

// ユーザーがクイズを受けることができるかどうかを確認する関数
export const standardCalculator = async (userId: string) => {
  if (!userId) {
    return { status: 'error', message: 'ユーザーIDが必要です。' }
  }

  try {
    // 環境変数の取得と検証
    const standardPlanId = getStandardPlanId()
    
    const { canTake, hoursLeft } = await canUserTakeQuiz(userId, standardPlanId)
    
    if (!canTake) {
      return { 
        status: 'error', 
        message: `1日1回の利用制限があります。あと${hoursLeft.toFixed(1)}時間お待ちください。` 
      }
    }

    // 利用可能 → last_quiz_at を更新して処理続行
    await updateLastQuizAt(userId)

    return { status: 'success', message: 'クイズを開始できます。' }
  } catch (error) {
    console.error('Error in standardCalculator:', error)
    
    // 環境変数のエラーかどうかで分岐
    if (error instanceof Error && error.message.includes('STANDARD_PLAN_ID')) {
      return { 
        status: 'error', 
        message: 'システム設定エラーが発生しました。管理者にお問い合わせください。' 
      }
    }
    
    return { 
      status: 'error', 
      message: 'エラーが発生しました。' 
    }
  }
}