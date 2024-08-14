import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { DeleteBook, EditBook, getFavBooks } from '../helpers/api-communicator'
import { useDispatch, useSelector } from 'react-redux'
import { setBooks, setSubmitForm } from '../slices/appSlice'
import { toast } from 'react-toastify'
import { swalPopup } from '../helpers/swalPopup'

const BookTable = () => {
  const books = useSelector((state) => state.app.books)
  const isSubmitForm = useSelector((state) => state.app.isSubmitForm)
  const dispatch = useDispatch()

  useEffect(() => {
    const getBooks = async () => {
      const response = await getFavBooks()
      dispatch(setBooks(response?.data))
    }
    getBooks()
  }, [dispatch, isSubmitForm])

  const handleEdit = async (e, book) => {
    const editedData = await swalPopup(e, book)
    if (editedData) {
      dispatch(setSubmitForm(true))
      const response = await EditBook(book?.id, editedData)
      dispatch(setBooks(response?.data))
      toast.success('Edited Successfully')
    }
    dispatch(setSubmitForm(false))
  }

  const handleDelete = async (id) => {
    const response = await DeleteBook(id)
    if (response) {
      dispatch(setSubmitForm(true))
      dispatch(setBooks(response?.data))
      toast.success(response.message)
    }
    dispatch(setSubmitForm(false))
  }

  return (
    <div className=" flex  justify-center items-center">
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
            {books?.length > 0 &&
              books?.map((book) => (
                <tr key={book?.id} className="hover:bg-gray-100">
                  <td className="border-b p-4">{book?.title}</td>
                  <td className="border-b p-4">{book?.author}</td>
                  <td className="border-b p-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={(e) => handleEdit(e, book)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline ml-4"
                      onClick={() => handleDelete(book?.id)}
                    >
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
