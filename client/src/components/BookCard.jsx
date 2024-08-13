import React from 'react'

const BookCard = ({book}) => {
  return (
    <div
      className="w-36 h-44 bg-white shadow-xl rounded-lg overflow-hidden flex flex-col items-center "
    >
      <div className="p-2 text-center">
        <h3 className="text-sm font-semibold mb-1">{book.title}</h3>
        <p className="text-xs text-gray-600">{book.author}</p>
      </div>
    </div>
  )
}

export default BookCard
