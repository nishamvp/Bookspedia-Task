import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterAPI } from '../helpers/api-communicator'
import { toast } from 'react-toastify'

const Register = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await RegisterAPI({ username:userName,email, password })
    if(data.status==='success'){
      navigate('/login')
      toast.success(data.message)
    }
    navigate('/')
  }
  return (
    <div className="h-screen  grow flex items-center justify-center  ">
      <div className="mb-32 p-8 border border-gray-100 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center mb-4  ">Register</h1>
        <form
          className="max-w-md mx-auto flex flex-col gap-4 p4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary mt-4">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account yet?{' '}
            <Link
              className=" underline text-black hover:font-bold"
              to={'/login'}
            >
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
