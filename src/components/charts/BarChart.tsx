'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useBarchartDatasetStore } from '@/stores/bar-chart.store'
import { useFileStore } from '@/stores/file.store'
import {
  generateBarChartDataset,
  getBarChartDataset,
} from '@/utils/seeder/barchart'
import * as echarts from 'echarts'
import React, { useState } from 'react'

export const BarChart: React.FC = () => {
  const { barchartDataset, setBarchartDataset, clearBarchartDataset } =
    useBarchartDatasetStore()
  const { selectedFile } = useFileStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    const getDataset = async () => {
      if (selectedFile && selectedFile.type === 'bar-chart') {
        getBarChartDataset(selectedFile)
          .then(dataset => {
            setBarchartDataset(dataset)
          })
          .catch(err => {
            setError(err.message)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        setBarchartDataset(generateBarChartDataset(12))
        setIsLoading(false)
      }
    }
    getDataset()
    return () => {
      clearBarchartDataset()
    }
  }, [selectedFile])

  // if (!selectedFile) return <div>Select a file to visualize</div>
  //
  // if (selectedFile?.type !== 'bar-chart')
  //   return <div>Selected dataset is not suitable for bar chart</div>

  if (!barchartDataset) return <div>Dataset is empty</div>

  if (error) return <div>{error}</div>

  const chartOption: echarts.EChartsOption = {
    title: {
      text: 'Bar Chart',
      left: 'center',
    },
    dataset: {
      source: [
        ['price', 'sales', 'product_name'],
        ...barchartDataset.dataItems,
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: 'sales' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High', 'Low'],
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
    },
    series: [
      {
        type: 'bar',
        encode: {
          x: 'sales',
          y: 'product_name',
        },
      },
    ],
  }

  return <EChartsWrapper option={chartOption} isLoading={isLoading} />
}
