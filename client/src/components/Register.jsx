import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="h-screen  grow flex items-center justify-center  ">
      <div className="mb-32 p-8 border border-gray-100 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-semibold text-center mb-4  ">Register</h1>
        <form className="max-w-md mx-auto flex flex-col gap-4  p4">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
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
