import { Routes, Route } from 'react-router-dom'
import AuthPage from "./pages/AuthPage"
import HomePage from './pages/HomePage'
import { useEffect, useState } from 'react'
import useAuthStore from './store/useAuthStore'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import AddAssignment from './pages/AddAssignment'
import Spinner from './components/ui/spinner'
import UpdateAssignment from './pages/UpdateAssignment'
import { useNavigate } from 'react-router-dom'

function App() {
  const { user, setUser, setToken } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)

      const token = localStorage.getItem('token')
      if (token) {
        setToken(token)

        try{
          const decoded = jwtDecode(token)
          setUser(decoded.sub)

          const response = await fetch(`${import.meta.env.VITE_API_URL}/check-auth`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (!response.ok) {
            throw new Error(data.message || "Something went wrong!")
          }

          setLoading(false)
        } catch (error) {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          navigate("/auth");
        }
      }
      setLoading(false);
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={user? <HomePage /> : <Navigate to="/auth"/>} />
      <Route path="/auth" element={!user? <AuthPage /> : <Navigate to="/"/>} />
      <Route path="/assignment" element={user? <AddAssignment /> : <Navigate to="/auth"/>} />
      <Route path="/assignment/:id" element={user? <UpdateAssignment /> : <Navigate to="/auth"/>} />
    </Routes>
  )
}

export default App
