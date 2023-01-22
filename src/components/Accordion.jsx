import { useState, useEffect } from 'react'
import AccordionBody from './AccordionBody'

import { useDispatch } from 'react-redux'
import moment from 'moment/moment'
import { selectItem } from '../features/emailSlice'
import Tag from './Tag'

export const Accordion = ({ val }) => {
  const [expand, setExpand] = useState(false)

  const dispatch = useDispatch()

  const [tags, setTags] = useState(val.tags.split(','))

  const [tagCount, setTagCount] = useState(0)

  useEffect(() => {
    if (val.tags && tags.length != 1) {
      tags.forEach((tag, index) => {
        // Check if tag has too much text
        if (tag.length > 20) {
          // Remove tag
          const newTags = [...tags]
          newTags.splice(index, 1)
          setTags(newTags)

          // Add Removed Count
          setTagCount(tagCount + 1)
        }
      })
    }
  }, [tags])

  // If Checkbox is Checked/unchecked
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target

    dispatch(
      selectItem({
        value,
        checked,
      })
    )
  }

  return (
    <>
      {/* Accordion Head */}
      <div
        id={`accordion-collapse-heading-${val.id}`}
        className='mt-5 border border-b-2 rounded-xl w-top'>
        <button
          onClick={() => setExpand(!expand)}
          type='button'
          className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl bg-white'
          data-accordion-target={`#accordion-collapse-body-${val.id}`}
          aria-expanded={expand}
          aria-controls={`accordion-collapse-body-${val.id}`}>
          <div className='flex flex-col md:flex-row space-x-4 items-center'>
            <div className='flex space-x-4 items-center'>
              <div className='rotate-90 text-lg p-0 m-0'>𓃎</div>
              <input
                id={`checkbox-${val.id}`}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 '
                value={val.id}
                onChange={handleChange}
              />
              <div className='bg-green-500 rounded-full w-4 h-4'></div>
              <div className='border border-gray-200 bg-slate-50 rounded-md text-center px-2 py-1'>
                <div className='font-semibold text-sm'>
                  {moment(val.date).format('DD')}
                </div>
                <div className='text-xs uppercase'>
                  {moment(val.date).format('MMM')}
                </div>
              </div>
              <div className='bg-gray-500 rounded-full px-3 py-2 text-white uppercase'>
                <span className='text-sm'>TA</span>
              </div>
            </div>

            <div className='flex flex-col'>
              <p className='font-semibold text-gray-600'>Fwd: {val.subject}</p>
              <p className='text-sm text-gray-400'>
                {/* Sender */}
                {val.sender.split('<')[0]}
                <span className='text-gray-400 text-sm'>
                  {/* Sender Email */}
                  {`<${val.sender.split('<')[1]} ${moment(val.date).format(
                    'MMMM D, YYYY [at] h:mmA'
                  )}`}
                </span>
              </p>
            </div>
          </div>

          <div className='hidden lg:flex items-center space-x-3 w-tags justify-end'>
            <div className='text-right hidden lg:flex flex-wrap items-center justify-end'>
              {!expand && (
                <>
                  {tags &&
                    tags.length > 0 &&
                    tags.map((tag, index) => <Tag key={index} tag={tag} />)}

                  {tagCount > 0 && <Tag tag={tagCount} />}
                </>
              )}
            </div>

            <div className='flex text-sm w-62 bg-yellow-50'>
              <div className='block'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='block text-xs text-yellow-300'>1 min</div>
            </div>

            <svg
              data-accordion-icon
              className='w-6 h-6 -rotate-90 shrink-0'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'></path>
            </svg>
          </div>
        </button>
      </div>
      {/* Accordion Body */}
      <div
        id={`accordion-collapse-body-${val.id}`}
        className={`mb-5 rounded-md border border-2 ${
          expand == false ? 'hidden' : 'block'
        }`}
        aria-labelledby={`accordion-collapse-heading-${val.id}`}>
        <AccordionBody val={val} />
      </div>
    </>
  )
}
