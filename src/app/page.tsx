import { redirect } from 'next/navigation';
import { verifySession } from './lib/session';

export default async function App() {

  const {isAuth} = await verifySession()
  if (!isAuth) {
    redirect('/login')
  }
  redirect('/home')
}
