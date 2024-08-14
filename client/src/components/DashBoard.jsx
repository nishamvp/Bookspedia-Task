import React, { useEffect } from 'react'
import { getFavBooks } from '../helpers/api-communicator'
import BookCard from './BookCard'
import BookForm from './BookForm'
import { useDispatch, useSelector } from 'react-redux'
import { setBooks } from '../slices/appSlice'
import { Link } from 'react-router-dom'

const DashBoard = () => {
  const dispatch = useDispatch()
  const books = useSelector(state=>state.app.books)
  const isSubmitForm = useSelector(state=>state.app.isSubmitForm)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getFavBooks()
        if (response && response.data) {
           dispatch(setBooks(response.data));
        }
      } catch (error) {
        console.error('Failed to fetch books:', error)
      }
    }

    fetchBooks()
  }, [dispatch,isSubmitForm])

  return (
    <div className='flex gap-6 items-start justify-center'>
    <div className=" w-3/4 flex justify-center items-center p-4 ">
      <div className="w-full max-w-4xl bg-primary p-6 rounded-lg shadow-md">
      <Link className='text-white font-medium hover:font-semibold' to={'/booklist'}>Booklist</Link>
        <h1 className="text-3xl font-bold mb-6 text-center text-white  ">My Books</h1>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          { books?.length > 0 ? (
            books.map(book => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="text-center text-primary">No books found</p>
          )}
        </div>
      </div>
    </div>
      <BookForm/>
      </div>
  )
}

export default DashBoard
