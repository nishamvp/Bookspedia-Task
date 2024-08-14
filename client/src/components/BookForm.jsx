import React, { useState } from 'react'
import { AddBook } from '../helpers/api-communicator'
import { useDispatch } from 'react-redux'
import { setSubmitForm } from '../slices/appSlice'

const BookForm = () => {
  const [bookTitle, setBookTitle] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (bookTitle && bookAuthor) {
      dispatch(setSubmitForm(true))
      const data = await AddBook({ title: bookTitle, author: bookAuthor })
      setBookTitle('')
      setBookAuthor('')
    }
    dispatch(setSubmitForm(false))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-8 m-5 w-1/3 bg-slate-50 rounded-lg   "
    >
      <input
        type="text"
        placeholder="Book Title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Book Author"
        value={bookAuthor}
        onChange={(e) => setBookAuthor(e.target.value)}
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-primary text-white rounded">
        Add Book
      </button>
    </form>
  )
}

export default BookForm
