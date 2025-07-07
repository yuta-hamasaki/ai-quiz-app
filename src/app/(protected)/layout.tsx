import { getUserSession } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await getUserSession()
  if(!response?.user) {
    redirect('/login')
  }
  return <>{children}</>;
}