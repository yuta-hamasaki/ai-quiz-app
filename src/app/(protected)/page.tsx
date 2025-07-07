
import { createClient } from '@/utils/supabase/server'
import HomeForm from '@/components/HomeForm'
import { redirect } from 'next/navigation'
// import ClientComponent from '@/components/ClientComponent'

export default async function HomePage() {

  const supabase = createClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
    {user&&(
      <HomeForm/>
    )}
    </>
  )
}