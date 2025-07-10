"use server"
import { createClient } from '@/utils/supabase/server'

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
  if (userProfile.price!== standardPlanId) {
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

export const standardCulculator = async (userId: string) => {
  const standardPlanId = process.env.STANDARD_PLAN_ID as string

  if (!userId) {
    return { status: 'error', message: 'ユーザーIDが必要です。' }
  }

  if (!standardPlanId) {
    return { status: 'error', message: 'プラン設定が見つかりません。' }
  }

  try {
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
    console.error('Error in standardCulculator:', error)
    return { 
      status: 'error', 
      message: 'クイズの利用制限の確認中にエラーが発生しました。' 
    }
  }
}