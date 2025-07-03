'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
// import ClientComponent from '@/components/ClientComponent'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [language, setLanguage] = useState('english')
  const [level, setLevel] = useState('A1')
  const router = useRouter()

    useEffect(() => {
      const getUser = async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      }
      getUser()
    }, [])
    
  const handleStart = () => {
    const params = new URLSearchParams({ language, level })
    if(user) {
      router.push(`/quiz?${params.toString()}`)
    }else {
      router.push(`/login`)
    }
  }

  return (
    <div className="bg-blue-50 flex flex-col items-center justify-center p-4">
      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            AI Word Quiz
          </h1>
          <p className="text-gray-600 text-sm">
            AIを使った効率的な語彙学習
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 space-y-6">
          {/* Language selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📚 学習言語を選択
            </label>
            <div className="relative">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)} 
                className="w-full p-4 pr-10 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 font-medium appearance-none cursor-pointer hover:border-gray-200"
              >
                <option value="english">🇺🇸 英語</option>
                <option value="german">🇩🇪 ドイツ語</option>
                <option value="spanish">🇪🇸 スペイン語</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Level selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🎯 学習レベルを選択
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'A1', label: 'A1', desc: '初級' },
                { value: 'A2', label: 'A2', desc: '初中級' },
                { value: 'B1', label: 'B1', desc: '中級' },
                { value: 'B2', label: 'B2', desc: '中上級' },
                { value: 'C1', label: 'C1', desc: '上級' },
                { value: 'C2', label: 'C2', desc: '最上級' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setLevel(item.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                    level === item.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold text-sm">{item.label}</div>
                  <div className="text-xs opacity-75">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <button 
            onClick={handleStart} 
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🚀 クイズを始める</span>
          </button>

          {/* Feature highlights */}
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl">🧠</div>
                <div className="text-xs text-gray-600 font-medium">AI学習</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl">⚡</div>
                <div className="text-xs text-gray-600 font-medium">高速習得</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl">📈</div>
                <div className="text-xs text-gray-600 font-medium">進歩追跡</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ClientComponent/> */}
    </div>
  )
}