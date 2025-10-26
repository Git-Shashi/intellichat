import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/slices/authSlice'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import ChatLayout from './components/chat/ChatLayout'

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  // Add debug logging
  console.log('App rendering, isAuthenticated:', isAuthenticated);

  useEffect(() => {
    console.log('App useEffect running');
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <LoginForm />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              !isAuthenticated ? (
                <RegisterForm />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/*" 
            element={
              isAuthenticated ? (
                <ChatLayout />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
