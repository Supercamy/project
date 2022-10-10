import { useState, Component, useEffect } from 'react'
import Select from 'react-select'
import myData from '../data/gg.json'

const Hotels = [
  { value: 1, label: 'Coral Beach Maldives' },
  { value: 2, label: 'Ilaa Beach Maldives' },
  { value: 3, label: 'Finolhu' },
  { value: 4, label: 'Arena' },
  { value: 5, label: 'Kaani Beach Hotel' },
]

const SelectFilterB = () => {
  const [selectedOptions, setSelectedOptions] = useState(null)
  const [selectedList, setSelectedList] = useState(null)

  useEffect(() => {
    fetchChartsD()
  }, [])

  const fetchChartsD = () => {
    const unique = [...new Set(myData.map((item) => item.BLNAME))]
    const technologyList = []
    unique.forEach(function (element) {
      technologyList.push({ label: element, value: element })
    })

    setSelectedList(technologyList)
  }

  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : [])
  }

  return (
    <div className=' py-4 '>
      <h1 className='text-md text-slate-700'>Select Building</h1>
      <div>
        {/* <div className='flex flex-wrap items-center lg:justify-between justify-center'> */}
        <div className=' px-2	'>
          <Select options={selectedList} onChange={setHandle} isMulti />
        </div>
        <div className=' py-4 '>{selectedOptions}</div>
      </div>
    </div>
  )
}

export default SelectFilterB
