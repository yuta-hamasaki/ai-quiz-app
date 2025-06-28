
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import Logout from './Logout'

export default async function Header () {
  const supabase = await createClient()
  const { data } = await supabase.auth.getSession()

  return (
    <header>
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">AI Word Quiz</h1>
        <div>
          <Link href="/" className="mr-4 hover:underline">Home</Link>
          <Link href="/quiz" className="hover:underline">Quiz</Link>
          {data ? (
            <Logout/>
          ):(
            <Link href="/login" className="ml-4 hover:underline">Login</Link>
          )
        }
        </div>
      </div>
      <div className="p-4 bg-gray-100">
        <p className="text-sm text-gray-600">AIを使った語彙クイズアプリ</p>
      </div>
    </header>
  )
}
