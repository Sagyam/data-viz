import EChartsWrapper from '@/components/EChartWrapper'
import { useDatasetStore } from '@/stores/data-store'
import * as echarts from 'echarts'
import React from 'react'

interface seriesI {
  name: string
  type: string
  stack: string
  smooth: boolean
  data: number[]
}

const getSeries = (datasets: any[]): seriesI[] => {
  return datasets.map(d => ({
    name: d.datasetName,
    type: 'line',
    stack: 'total',
    smooth: true,
    data: d.data,
  }))
}

export const LineChart: React.FC = () => {
  const { getAllDatasetsWithLabel1D } = useDatasetStore()
  const datasets = getAllDatasetsWithLabel1D()
  const allDatasetNames = datasets.map(d => d.datasetName)

  if (datasets.length === 0) {
    return null
  }

  const chartOption: echarts.EChartsOption = {
    title: {
      text: 'Stacked Line',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: allDatasetNames,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: datasets[0].labels,
    },
    yAxis: {
      type: 'value',
    },
    series: getSeries(datasets),
  }

  return <EChartsWrapper option={chartOption} style={{ height: '500px' }} />
}
