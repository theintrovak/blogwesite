import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './Appwrite/Auth'
import './App.css'
import { Loader } from './Components/Loader'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authservice.getCurrentUser().then((userData) => {
      (userData) ? dispatch(login({ userData })) : dispatch(logout())
    }).finally(() => setLoading(false))
      (!loading) ? <Loader /> : null
  }, [])
  return (
    <>
      <h1>test</h1>
    </>
  )
}

export default App
