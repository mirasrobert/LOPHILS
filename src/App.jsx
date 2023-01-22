import { useEffect } from 'react'
import Container from './components/Container'
import { Accordion } from './components/Accordion'

import { useDispatch, useSelector } from 'react-redux'
import { getItems } from './features/emailSlice'

import { ToastContainer } from 'react-toastify'
import Header from './components/Header'

function App() {
  const dispatch = useDispatch()

  // Get the data from redux state
  const { data, isLoading } = useSelector((state) => state.emails)

  useEffect(() => {
    // Get All Data
    dispatch(getItems())
  }, [])

  return (
    <div className='py-12'>
      <Container>
        <Header />

        <div id='accordion-collapse' data-accordion='open'>
          {!isLoading &&
            data.map((val) => <Accordion val={val} key={val.id} />)}
        </div>
      </Container>

      <ToastContainer />
    </div>
  )
}

export default App
