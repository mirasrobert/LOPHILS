import React from 'react'

const Tag = ({ tag }) => {
  return (
    <span className='text-blue-800 text-xs font-medium mt-1 mr-1 px-2.5 py-0.5 rounded border badge font-semibold'>
      {tag}
      {typeof tag == 'number' && '+'}
    </span>
  )
}

export default Tag
