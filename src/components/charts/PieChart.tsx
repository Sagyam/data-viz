'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useFileStore } from '@/stores/file.store'
import { usePieChartDatasetStore } from '@/stores/pie-chart.store'
import { getPieChartDataset } from '@/utils/seeder/piechart'
import * as echarts from 'echarts'
import React, { useState } from 'react'

export const PieChart: React.FC = () => {
  const { pieChartDataset, setPieChartDataset, clearPieChartDataset } =
    usePieChartDatasetStore()
  const { selectedFile } = useFileStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    const getDataset = async () => {
      if (!selectedFile) return
      if (selectedFile?.type !== 'pie-chart') return

      getPieChartDataset(selectedFile)
        .then(dataset => {
          setPieChartDataset(dataset)
        })
        .catch(err => {
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    getDataset()
    return () => {
      clearPieChartDataset()
    }
  }, [selectedFile])

  if (!selectedFile) return <div>Select a file to visualize</div>

  if (selectedFile?.type !== 'pie-chart')
    return <div>Selected dataset is not suitable for pie chart</div>

  if (error) return <div>{error}</div>

  if (pieChartDataset?.dataItems.length === 0)
    return <div>Dataset is empty</div>

  const chartOption: echarts.EChartsOption = {
    title: {
      text: `${pieChartDataset?.datasetName} Pie Chart`,
      left: 'center',
    },
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Dataset',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 8,
        },
        data: pieChartDataset?.dataItems,
      },
    ],
  }

  return <EChartsWrapper option={chartOption} isLoading={isLoading} />
}
