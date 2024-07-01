import AuthService from '@/modules/(auth)/services/auth-service';
import { redirect } from 'next/navigation';


export default async function App() {

  const {isAuth} = await AuthService.verifySession()
  if (!isAuth) {
    redirect('/login')
  }
  redirect('/home')
}
