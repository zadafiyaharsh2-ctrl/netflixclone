import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { auth } from './firebase' // Adjust path according to your structure
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <Routes>
        <Route 
          path='/' 
          element={user ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path='/login' 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path='/player/:id' 
          element={user ? <Player /> : <Navigate to="/login" />} 
        />
        {/* Fallback route */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App