import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginAPI } from '../../helpers/api-communicator'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isAuth = localStorage.getItem('isAuth')

  useEffect(() => {
    isAuth ? navigate('/') : navigate('/login')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await LoginAPI({ email, password })
    toast.success(data.message)
    navigate('/')
  }
  return (
    <div className="h-screen  grow flex items-center justify-center  ">
      <div className="mb-32 p-8 border border-gray-100 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center mb-4  ">Login</h1>
        <form
          className="max-w-md mx-auto flex flex-col gap-4  p4"
          onSubmit={handleSubmit}
        >
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
          <button type="submit" className="primary mt-4">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link
              className=" underline text-black hover:font-bold"
              to={'/register'}
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
