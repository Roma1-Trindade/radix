import { getUser } from '../lib/dal';


export default async function Home(){
  const user = await getUser();
  

  return (
    <div>
      <h2>Olá {user?.email}</h2>
      <h1>Home inside app!</h1>
      <button
      className="flex w-30 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Logout</button>
    </div>
  );
}