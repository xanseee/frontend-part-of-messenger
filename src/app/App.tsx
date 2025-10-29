import { useEffect } from 'react'
import { useUserStore } from '../entities/user/model/user.store'
import { Messenger, SignIn } from '../pages';

function App() {
  const { refresh, isLoading, user } = useUserStore();
  
  useEffect(() => {
    refresh();
  }, [])

  if(isLoading) {
    return<div>User Loading...</div>
  }
  
  return (
    <>
      {user ? <Messenger/> : <SignIn/>}
    </>
  )
}

export default App
