import React from 'react'

const Container = ({ children }) => {
  return (
    <div className='container mx-auto px-6 lg:px-40 w-full h-full'>
      {children}
    </div>
  )
}

export default Container
