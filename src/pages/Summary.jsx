import { useEffect, useState } from 'react'
import myData from '../data/gg.json'
import myProject from '../data/ggaa.json'

let ggmyProjectDate = myProject.map((obj) => {
  return {
    ...obj,
    PROJECT_START_DATE: new Date(obj.PROJECT_START_DATE),
  }
})

ggmyProjectDate = ggmyProjectDate.map((obj) => {
  return {
    ...obj,
    PROJECT_END_SCHEDULED_DATE: new Date(obj.PROJECT_END_SCHEDULED_DATE),
  }
})

ggmyProjectDate = ggmyProjectDate.filter(
  (ggmyProjectDate) =>
    ggmyProjectDate.PROJECT_END_SCHEDULED_DATE != 'Invalid Date' &&
    ggmyProjectDate.PROJECT_START_DATE != 'Invalid Date' &&
    ggmyProjectDate.PROJECT_STAGE != 'Project Closure' &&
    ggmyProjectDate.PROJECT_STAGE != 'Complete' &&
    ggmyProjectDate.PROJECT_STAGE != 'Project Pipeline' &&
    ggmyProjectDate.PROJECT_STAGE != 'Project Proposal'
)

const Summary = () => {
  const [selectedTeam, setSelectedTeam] = useState()
  const [mainData, setMainData] = useState(ggmyProjectDate)

  useEffect(() => {
    fetchDate()
  }, [])

  const fetchDate = () => {
    console.log(ggmyProjectDate)
    setMainData(ggmyProjectDate)
  }

  function handleTeamSelectionChange(event) {
    // console.log(event.target.value)
    setSelectedTeam(event.target.value)

    let ggmyProjectDateFilter = ggmyProjectDate.filter(
      (ggmyProjectDate) => ggmyProjectDate.PF_PILLAR_TEAM == event.target.value
    )

    setMainData(ggmyProjectDateFilter)
  }

  function handleTeamSelectionChangeButton(event) {
    console.log('Im here')

    let ggmyProjectDateFilter = ggmyProjectDate.filter(
      (ggmyProjectDate) => ggmyProjectDate
    )

    setMainData(ggmyProjectDateFilter)
  }

  return (
    <div className='m-1 md:m-4 p-2 md:p-4 bg-white rounded-3xl'>
      <div className='m-1 md:m-4 p-2 md:p-4 bg-white rounded-3xl'>
        <select
          className='select select-primary w-full max-w-xs'
          value={selectedTeam}
          onChange={handleTeamSelectionChange}
          defaultValue={'DEFAULT'}
        >
          <option disabled value='DEFAULT'>
            Select Team
          </option>
          <option value='Construction_one'>Construction One</option>
          <option value='Construction_two'>Construction Two</option>
          <option value='Construction_three'>Construction Three</option>
          <option value='Transitions'>Transitions</option>
          <option value='Infrastructure'>Infrastructure</option>
        </select>
        <button
          onClick={handleTeamSelectionChangeButton}
          className='btn btn-outline btn-primary'
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default Summary
