"use client"
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Logout from './Logout'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }
    
    getUser()
  }, [])

  return (
    <header className="relative">
      {/* Main header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo section */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-200">
                AI Word Quiz
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
              >
                🏠 ホーム
              </Link>
              {user && (
                <>
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
                >
                  📊 ダッシュボード
                </Link>
                <Link 
                  href="/misstakes" 
                  className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
                >
                  📚間違いノート
                </Link>
                </>
              )}
            </nav>

            {/* User section */}
            <div className="flex items-center space-x-3">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  {/* User avatar and info */}
                  <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-white/90 hidden sm:block">
                      {user.email?.split('@')[0] || 'ユーザー'}
                    </span>
                  </div>
                  <Logout />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/login"
                    className="px-4 py-2 text-blue-600 bg-white rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 shadow-sm"
                  >
                    ログイン
                  </Link>
                  <Link 
                    href="/signup"
                    className="px-4 py-2 text-white bg-white/20 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 border border-white/30"
                  >
                    新規登録
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}