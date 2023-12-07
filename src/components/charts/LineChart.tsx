import EChartsWrapper from '@/components/EChartWrapper'
import { LineChartDataset } from '@/entities/linechart.dataset'
import { useLineChartDatasetStore } from '@/stores/line-chart.store'
import { generateLineChartDataset } from '@/utils/seeder/linechart'
import * as echarts from 'echarts'
import React, { useEffect } from 'react'

interface seriesI {
  name: string
  type: string
  stack: string
  smooth: boolean
  data: number[]
}

const getSeries = (datasets: LineChartDataset[]): seriesI[] => {
  return datasets.map(d => ({
    name: d.datasetName,
    type: 'line',
    stack: 'total',
    smooth: true,
    data: d.dataItem.map(item => item.data),
  }))
}

const getAllLabels = (datasets: LineChartDataset[]): string[] => {
  const labels: string[] = []
  datasets.forEach(d => {
    d.dataItem.forEach(item => {
      if (!labels.includes(item.label)) {
        labels.push(item.label)
      }
    })
  })
  return labels
}

export const LineChart: React.FC = () => {
  const { lineChartDataset, setLineChartDataset } = useLineChartDatasetStore()
  const datasetNames = lineChartDataset.map(d => d.datasetName)

  useEffect(() => {
    setLineChartDataset(generateLineChartDataset(3, 10))
  }, [])

  if (lineChartDataset.length === 0) {
    return <div>No data</div>
  }

  const chartOption: echarts.EChartsOption = {
    title: {
      text: 'Stacked Line Chart',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: datasetNames,
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
      data: getAllLabels(lineChartDataset),
    },
    yAxis: {
      type: 'value',
    },
    series: getSeries(lineChartDataset) as any,
  }

  return <EChartsWrapper option={chartOption} style={{ height: '500px' }} />
}
