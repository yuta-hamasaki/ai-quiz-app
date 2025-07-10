"use server"
import { createClient } from '@/utils/supabase/server'

const updateLastQuizAt = async (userId: string) => {
  try {
    const supabase = createClient()
    
    // timestamptz型の場合はISO文字列をそのまま使用
    const { error } = await (await supabase)
      .from('user_profile')
      .update({ last_quiz_at: new Date().toISOString() })
      .eq('id', userId)
    
    if (error) {
      console.error('Update last_quiz_at error:', error)
      throw new Error(`Failed to update last_quiz_at: ${error.message}`)
    }
  } catch (error) {
    console.error('updateLastQuizAt function error:', error)
    throw error
  }
}

// もしtime型のままにする場合の代替関数
const updateLastQuizAtTimeOnly = async (userId: string) => {
  try {
    const supabase = createClient()
    
    // time型の場合は時刻のみを保存
    const now = new Date()
    const timeOnly = now.toTimeString().split(' ')[0] // "HH:MM:SS"形式
    
    const { error } = await (await supabase)
      .from('user_profile')
      .update({ last_quiz_at: timeOnly })
      .eq('id', userId)
    
    if (error) {
      console.error('Update last_quiz_at error:', error)
      throw new Error(`Failed to update last_quiz_at: ${error.message}`)
    }
  } catch (error) {
    console.error('updateLastQuizAtTimeOnly function error:', error)
    throw error
  }
}

const canUserTakeQuiz = async (userId: string) => {
  try {
    const standardPlanId = process.env.STANDARD_PLAN_ID
    
    if (!standardPlanId) {
      throw new Error('STANDARD_PLAN_ID environment variable is not set')
    }

    const supabase = createClient()
    const { data: userProfile, error } = await (await supabase)
      .from('user_profile')
      .select('last_quiz_at, price')
      .eq('id', userId)
      .single() 

    if (error) {
      console.error('Database query error:', error)
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

    // last_quiz_atがtime型かtimestamp型かによって処理を分岐
    let lastQuizTime: Date
    
    if (typeof userProfile.last_quiz_at === 'string') {
      // timestamp型の場合
      if (userProfile.last_quiz_at.includes('T') || userProfile.last_quiz_at.includes('-')) {
        lastQuizTime = new Date(userProfile.last_quiz_at)
      } else {
        // time型の場合 - 今日の日付と組み合わせる
        const today = new Date().toISOString().split('T')[0]
        lastQuizTime = new Date(`${today}T${userProfile.last_quiz_at}`)
      }
    } else {
      lastQuizTime = new Date(userProfile.last_quiz_at)
    }

    const now = new Date()
    const timeDiff = now.getTime() - lastQuizTime.getTime()
    const hoursElapsed = timeDiff / (1000 * 60 * 60)

    if (hoursElapsed >= 24) {
      return { canTake: true, hoursLeft: 0 }
    } else {
      const hoursLeft = 24 - hoursElapsed
      return { canTake: false, hoursLeft }
    }
  } catch (error) {
    console.error('canUserTakeQuiz function error:', error)
    throw error
  }
}

export const standardCalculator = async (userId: string) => {
  if (!userId) {
    return { status: 'error', message: 'ユーザーIDが必要です。' }
  }

  try {
    const { canTake, hoursLeft } = await canUserTakeQuiz(userId)
    
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
    
    if (error instanceof Error) {
      // データ型エラーの場合
      if (error.message.includes('invalid input syntax for type time')) {
        return { 
          status: 'error', 
          message: 'データベース設定に問題があります。管理者にお問い合わせください。' 
        }
      }
      
      if (error.message.includes('STANDARD_PLAN_ID')) {
        return { 
          status: 'error', 
          message: 'システム設定エラー: 管理者にお問い合わせください。' 
        }
      }
    }
    
    return { 
      status: 'error', 
      message: 'クイズの利用制限の確認中にエラーが発生しました。' 
    }
  }
}