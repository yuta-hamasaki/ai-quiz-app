'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import QuizCard from '@/components/QuizCard'
import {createClient} from '@/utils/supabase/client'

interface Quiz {
  index: number
  word: string
  meaning: string
  options: string[]
  correct: string
}

export default async function QuizPage() {
  const [quizList, setQuizList] = useState<Quiz[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  const searchParams = useSearchParams()
  const router = useRouter()

  const supabase = await createClient()
  
  // 何問目かを取得
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleNext = () =>{
    setTimeout(()=>{
    if (currentIndex < quizList.length - 1){
      setCurrentIndex(currentIndex + 1)
      setIsAnswered(false)
    } else {
      router.push('/quiz/result')
    }
    },1000)
  }

  const currentQuiz = quizList[currentIndex]

  const language = searchParams.get('language') || 'english'
  const level = searchParams.get('level') || 'beginner'

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
      }
    }

    fetchQuiz()
  }, [language, level])

  const handleAnswer = async(selected: string, correct: string) => {
    if(isAnswered) return 
    setIsAnswered(true)

    if(selected === correct){
      setScore(prev => prev + 1)
    } else {
      const mistake = await supabase.from('mistakes').insert([{
        word: currentQuiz.word,
        meaning: currentQuiz.meaning,
        selected: selected,
        correct: correct,
        language,
        level,
      }
    ])

    if(Error){
      console.error('Error saving mistake:', Error)
    }
    }

    handleNext()
  }


  if (loading) return <p>読み込み中...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">クイズページ</h1>
      <p className="mb-2">現在のスコア: {score}</p>
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
  )
}
