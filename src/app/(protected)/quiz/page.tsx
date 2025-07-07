'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter, redirect } from 'next/navigation'
import QuizCard from '@/components/QuizCard'
import { createClient } from '@/utils/supabase/client'
import { saveMistake } from '@/actions/mistakes'

interface Quiz {
  index: number
  word: string
  meaning: string
  options: string[]
  correct: string
}

export default function QuizPage() {
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)

  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  const searchParams = useSearchParams()
  const router = useRouter()

  // 何問目かを取得
  const [currentIndex, setCurrentIndex] = useState<number>(0)



  const handleNext = () => {
    setTimeout(() => {
      if (currentIndex < quizList.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsAnswered(false)
      } else {
        // クイズ終了時に結果ページに遷移
        // スコア情報をURLパラメータとlocalStorageの両方に保存
        localStorage.setItem('quiz_score', score.toString())
        localStorage.setItem('quiz_total', quizList.length.toString())
        
        router.push(`/quiz/result?score=${score}&total=${quizList.length}&language=${language}&level=${level}`)
      }
    }, 1000)
  }

  const currentQuiz = quizList[currentIndex]

  const language = searchParams.get('language') || 'english'
  const level = searchParams.get('level') || 'beginner'

  if(!user){
    redirect('/login')
  }else if(!language || !level){
      redirect('/')
  } else{
    useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quiz?language=${language}&level=${level}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()
        setQuizList(data)
        setLoading(false)
      } catch (err) {
        console.error('Fetch error:', err)
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [language, level])
  }

  const handleAnswer = async (selected: string, correct: string) => {
    if (isAnswered) return
    setIsAnswered(true)

    if (selected === correct) {
      setScore(prev => prev + 1)
    } else {
      // 間違えた場合、mistakesテーブルに保存
      if (user) {
        try {
          const result = await saveMistake(
            user.id,
            currentQuiz.meaning,
            correct,
            language,
            level
          )

          if (result.status === 'success') {
            console.log('Mistake saved successfully:', result.data)
          } else {
            console.error('Error saving mistake:', result.message)
          }
        } catch (error) {
          console.error('Error saving mistake:', error)
        }
      } else {
        console.warn('User not authenticated, cannot save mistake')
      }
    }

    handleNext()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">クイズを読み込み中...</p>
        </div>
      </div>
    )
  }
  
  if (!currentQuiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">クイズデータがありません</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー情報 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">クイズ</h1>
            <div className="text-right">
              <p className="text-lg font-semibold text-blue-600">スコア: {score}</p>
              <p className="text-sm text-gray-600">
                問題 {currentIndex + 1} / {quizList.length}
              </p>
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / quizList.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* クイズカード */}
        <QuizCard
          currentIndex={currentIndex}
          word={currentQuiz.word}
          meaning={currentQuiz.meaning}
          options={currentQuiz.options}
          correct={currentQuiz.correct}
          onAnswer={handleAnswer}
          disabled={isAnswered}
        />
      </div>
    </div>
  )
}