import moment from 'moment/moment'
import Tag from './Tag'

const AccordionBody = ({ val }) => {
  return (
    <div className='p-5 font-light border-gray-200'>
      <div className='flex flex-col md:flex-row justify-between'>
        <div>
          <p className='font-semibold text-gray-600'>
            {val.sender.split('<')[0]}
          </p>
          <p className='text-gray-500'>
            {moment(val.date).format('DD MMM YYYY hh:mm A')}
          </p>
        </div>
        <div>
          {val.tags.split(',').map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
      </div>
      <div>
        <p className='text-gray-500 text-sm mt-5'>{val.content}</p>
      </div>

      <div>
        <p className='text-gray-500 text-sm mt-5'>
          ----- Forwarded message -----
        </p>
        <p className='text-gray-500 text-sm'>
          From:
          <span className='pl-1 font-semibold'>{val.sender.split('<')[0]}</span>
          <span className='pl-1 text-blue-500 font-base'>
            {`<${val.sender.split('<')[1]}`}
          </span>
        </p>
        <p className='text-gray-500 text-sm'>
          Date: {moment(val.date).format('ddd, MMM D, YYYY [at] h:mm A')}
        </p>
        <p className='text-gray-500 text-sm'>Subject: {val.subject}</p>
        <p className='text-gray-500 text-sm'>
          To:
          <span className='pl-1'>{val.receiver.split('<')[0]}</span>
          <span className='pl-1 text-blue-500 font-base'>
            {`<${val.receiver.split('<')[1]}`}
          </span>
        </p>
      </div>
    </div>
  )
}

export default AccordionBody
