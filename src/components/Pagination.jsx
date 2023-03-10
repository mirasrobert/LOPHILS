function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  currentItemsCount,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div>
      <button
        className='text-gray-800 text-sm'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        {`<`}
      </button>
      <span className='text-gray-800 text-sm mx-2'>
        {currentItemsCount} of {totalItems}
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
