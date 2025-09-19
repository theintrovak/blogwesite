import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './Appwrite/Auth'
import './App.css'
import { Footer, Header, Loader, RouteChangeLoader } from './Components'
import { login, logout } from './Store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    const init = async () => {
      try {
        // 🔹 Just check if user is already logged in
        const userData = await authservice.getCurrentUser();


        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout()); // no session → guest mode
        }
      } catch (err) {
        if (err.code === 401) {
          console.log("User not found.");
        }

      } finally {
        setLoading(false)
      }
    };

    init();
  }, [dispatch]);
  if (loading) return <Loader />
  else return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block' >
        <RouteChangeLoader />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
