import { signOut } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import MobileNav from './MobileNav'
import PortalBtn from './PortalBtn'

// ユーザー型定義
interface User {
  id: string
  email?: string
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

export default async function Header() {
  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  return (
    <header className="relative z-[9999]">
      {/* Main header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo section */}
            <Link 
              href={user ? '/' : '/landing'}
              className="flex items-center space-x-3 group"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl group-hover:bg-white/30 group-hover:scale-105 transition-all duration-200 shadow-md">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-200">
                AI Word Quiz
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1" role="navigation">
              {user && (
                <>
                  <Link 
                    href="/" 
                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="ホームページへ移動"
                  >
                    <span className="mr-2" aria-hidden="true">🏠</span>
                    ホーム
                  </Link>
                  {/* <Link 
                    href="/dashboard" 
                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="ダッシュボードへ移動"
                  >
                    <span className="mr-2" aria-hidden="true">📊</span>
                    ダッシュボード
                  </Link> */}
                  
                  <Link 
                    href="/mistakes" 
                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="間違いノートへ移動"
                  >
                    <span className="mr-2" aria-hidden="true">📚</span>
                    間違いノート
                  </Link>
                  <div
                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="サブスクリプション管理画面へ移動"
                  >
                    <PortalBtn/>
                  </div>
                </>
              )}
            </nav>

            {/* User section */}
            <div className="items-center space-x-3 hidden md:flex">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* User avatar and info */}
                  <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
                    <div className="w-6 h-6 bg-gradient-to-br from-white/30 to-white/20 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xs font-semibold text-white">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-white/90 hidden sm:block font-medium">
                      {user.email?.split('@')[0] || 'ユーザー'}
                    </span>
                  </div>
                  
                  {/* Logout button */}
                  <form action={signOut}>
                    <button 
                      className="px-4 py-2 text-white bg-gray-500/80 hover:bg-gray-500 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label="ログアウト"
                    >
                      ログアウト
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/login"
                    className="px-4 py-2 text-blue-600 bg-white rounded-lg font-medium hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    ログイン
                  </Link>
                  <Link 
                    href="/register"
                    className="px-4 py-2 text-white bg-white/20 rounded-lg font-medium hover:bg-white/30 hover:scale-105 transition-all duration-200 border border-white/30 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    新規登録
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <MobileNav
              user={user} 
              signOut={signOut}
            />
          </div>
        </div>
      </div>
    </header>
  )
}