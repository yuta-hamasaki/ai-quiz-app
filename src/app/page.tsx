'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ClientComponent from '@/components/ClientComponent'

export default function HomePage() {
  const [language, setLanguage] = useState('english')
  const [level, setLevel] = useState('beginner')
  const router = useRouter()

  const handleStart = () => {
    const params = new URLSearchParams({ language, level })
    router.push(`/quiz?${params.toString()}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">AI Word Quiz</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">言語を選択</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 border rounded">
          <option value="english">英語</option>
          <option value="german">ドイツ語</option>
          <option value="german">スペイン語</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">レベルを選択</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="p-2 border rounded">
          <option value="A1">A1(初級)
          </option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2(上級)</option>
        </select>
      </div>

      <button onClick={handleStart} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        クイズを始める
      </button>

      <ClientComponent/>
    </div>
  )
}
