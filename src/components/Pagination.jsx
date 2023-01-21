function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  //const pages = [...Array(totalPages).keys()].map((i) => i + 1)

  return (
    <div>
      <button
        className='text-gray-800 text-sm'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        {`<`}
      </button>
      <span className='text-gray-800 text-sm mx-2'>
        {itemsPerPage} of {totalItems}
      </span>
      <button
        className='text-gray-800 text-sm'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}>
        {`>`}
      </button>
    </div>
  )
}

export default Pagination
