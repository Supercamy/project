import { useEffect, useState } from 'react'

import myData from '../data/gg.json'
import SelectFilterB from '../components/SelectFilterB'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Graph = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  })
  const [chartOptions, setChartOptions] = useState({})

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChartsG()
  }, [])

  const fetchChartsG = () => {
    var groupedCostbyBuildingChart = []
    myData.reduce(function (preValue, curValue) {
      if (!preValue[curValue.BLNAME]) {
        preValue[curValue.BLNAME] = {
          BLNAME: curValue.BLNAME,
          COST_REPLACE: 0,
        }
        groupedCostbyBuildingChart.push(preValue[curValue.BLNAME])
      }
      preValue[curValue.BLNAME].COST_REPLACE += curValue.COST_REPLACE
      return preValue
    }, {})

    groupedCostbyBuildingChart.sort((a, b) => {
      return b.COST_REPLACE - a.COST_REPLACE
    })

    const slicedArray = groupedCostbyBuildingChart.slice(0, 10)

    console.log(slicedArray)

    const data = slicedArray.map((item) => item.COST_REPLACE)
    const labels = slicedArray.map((item) => item.BLNAME)

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Total Building Cost $',
          data: data,
          borderColor: 'rgb(15, 23, 42)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
        },
      ],
    })
    setChartOptions({
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Total Asset Cost by Building',
        },
        // scales: {
        //   y: {
        //     ticks: {
        //       callback: function (label, index, labels) {
        //         return label + 'K'
        //       },
        //     },
        //   },
        // },
        // axisX: {
        //   labelMaxWidth: 100,
        // },
        // scales: {
        //   xAxes: [
        //     {
        //       ticks: {
        //         callback: function (label, index, labels) {
        //           if (/\s/.test(label)) {
        //             return label.split(' ')
        //           } else {
        //             return label
        //           }
        //         },
        //       },
        //     },
        //   ],
        // },
      },
    })

    setLoading(false)
  }

  return (
    <div className='m-1 md:m-4 p-2 md:p-4 bg-white rounded-3xl'>
      <SelectFilterB />
      <div className='grid gap-7 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
        <div className='p-5 bg-white rounded shadow-md'>
          <Bar options={chartOptions} data={chartData} />
        </div>
        <div className='p-5 bg-white rounded shadow-md'>GG</div>
      </div>
    </div>
  )
}

export default Graph
