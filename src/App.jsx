import { useState, useEffect } from 'react'
import Container from './components/Container'
import { Accordion } from './components/Accordion'

import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from './features/emailSlice'

function App() {
  // Get the data from redux state
  const { data, selectedItems, isLoading } = useSelector(
    (state) => state.emails
  )

  const dispatch = useDispatch()

  // Delete Button
  const onDeleteHandler = (e) => {
    e.preventDefault()

    if (selectedItems && selectedItems.length > 0) {
      dispatch(deleteItem(selectedItems))
    }
  }

  return (
    <div className='py-12'>
      <Container>
        <div className=''>
          <div className='flex items-center justify-between'>
            <div className='h-30 flex space-x-4 items-center'>
              <input
                id='default-checkbox'
                type='checkbox'
                value=''
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
              />

              <button
                type='button'
                className='flex items-center text-green-700 bg-green-100 text-xs hover:text-white border border-green-400 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-center mr-2 mb-2 px-3 py-1 uppercase'>
                Save{' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='ml-1 w-3 h-3'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                  />
                </svg>
              </button>

              <button
                type='button'
                className='flex items-center text-xs text-gray-900 hover:text-white border border-gray-400 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md px-3 py-1 text-center mr-2 mb-2 uppercase'>
                Manage Filters
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='ml-1 w-3 h-3'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
                  />
                </svg>
              </button>

              <button
                type='button'
                onClick={onDeleteHandler}
                className='flex items-center text-red-700 text-xs hover:text-white bg-red-100 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-center mr-2 mb-2 px-3 py-1 uppercase'>
                Delete
                <div className='bg-red-500 flex padding-round justify-center items-center rounded-full ml-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='#fff'
                    className='w-2 h-2'>
                    <path
                      fillRule='evenodd'
                      d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </button>
            </div>

            <div>
              <p className='text-gray-800 text-sm'>
                <button>{`<`}</button>
                <span className='mx-2'>50 of 100</span>
                <button>{`>`}</button>
              </p>
            </div>
          </div>
        </div>

        <hr className='my-4' />

        <div className='flex justify-between items-center mb-4'>
          <p className='font-semibold text-gray-400 text-sm'>Unread</p>
          <div className='bg-gray-300 rounded-full px-2 py-2 text-white'>
            <span className='text-xs text-white flex items-centen'>3 v</span>
          </div>
        </div>

        <div id='accordion-collapse' data-accordion='open'>
          {!isLoading &&
            data.map((val) => <Accordion val={val} key={val.id} />)}
        </div>
      </Container>
    </div>
  )
}

export default App
