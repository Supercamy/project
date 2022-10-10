import { useEffect, useState } from 'react'
import myData from '../data/gg.json'

import { projectGrid } from '../data/dummy'

const Gantt = () => {
  const [projectssub, setProjectssub] = useState([])
  const [totalValue, settotalValue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    // const average = myData(COST_REPLACE).reduce((a, b) => a + b, 0) / arr.length

    const result = myData.reduce(function (acc, obj) {
      return acc + obj.COST_REPLACE
    }, 0)

    const avAge = myData.reduce(function (acc, obj) {
      return acc + obj.COST_REPLACE / myData.length
    }, 0)

    function numFormatter(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
      } else if (num < 900) {
        return num // if value < 1000, nothing to do
      }
    }

    const modifiedTotalNumber = numFormatter(result)

    console.log(myData)

    settotalValue(modifiedTotalNumber)
    setProjectssub(myData)
    setLoading(false)
  }

  if (!loading) {
    return (
      <div className='m-1 md:m-4 p-2 md:p-4 bg-white rounded-3xl '>
        <div className='m-2 p-2'></div>
        <div className='grid gap-7 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-row  shadow-md bg-gradient-to-r  from-slate-700 via-slate-800 to-slate-900 p-6 gap-8 rounded-lg border-2 border-slate-500'>
            <div className='my-auto'>
              <div className='text-lg text-slate-300'>Total Assets</div>
              <div className='text-4xl text-slate-100'>
                {myData.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
            <div className='text-slate-300 my-auto shadow-md bg-gradient-to-l from-slate-700 via-slate-800 to-slate-900 rounded-full p-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
              </svg>
            </div>
          </div>
          <div className='p-5 bg-white rounded shadow-md'>
            <div className='text-base text-gray-400 '>Avg Condition</div>
            <div className='flex items-center pt-1'>
              <div className='text-2xl font-bold text-gray-900 '>
                {myData.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          </div>
          <div className='p-5 bg-white rounded shadow-md'>
            <div className='text-base text-gray-400 '>Qty End of Life</div>
            <div className='flex items-center pt-1'>
              <div className='text-2xl font-bold text-gray-900 '>250.00</div>
            </div>
          </div>

          <div className='p-5 bg-white rounded shadow-md'>
            <div className='text-base text-gray-400 '>Total Asset Value</div>
            <div className='flex items-center pt-1'>
              <div className='text-2xl font-bold text-gray-900 '>
                ${totalValue}
              </div>
            </div>
          </div>
        </div>
        <div className='m-2 p-2'></div>
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

export default Gantt
