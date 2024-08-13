import React from 'react'
import { Link } from 'react-router-dom'

const BookTable = () => {
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
  ]

  return (
    <div className="h-screen flex  justify-center items-center">
      <div className="flex flex-col   w-full max-w-4xl bg-white m-6 rounded-lg shadow-md overflow-hidden">
        <Link
          to={'/'}
          className="p-3 bg-primary text-white hover:font-semibold "
        >
          Dashboard
        </Link>
        <table className="min-w-full border-collapse">
          <thead className="bg-primary">
            <tr className="text-white">
              <th className="border-b-2 p-4 text-left">Book Title</th>
              <th className="border-b-2 p-4 text-left">Book Author</th>
              <th className="border-b-2 p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-100">
                <td className="border-b p-4">{book.title}</td>
                <td className="border-b p-4">{book.author}</td>
                <td className="border-b p-4">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline ml-4">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookTable
