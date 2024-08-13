import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoute = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('access-token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  if (!token) {
    return <p>Loading...</p> // Or a loading spinner
  }

  return <Outlet />
}

export default PrivateRoute
