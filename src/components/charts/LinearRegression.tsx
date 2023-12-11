'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useFileStore } from '@/stores/file.store'
import { useRegressionDatasetStore } from '@/stores/regression.store'
import {
  generateRegressionDataset,
  getRegressionChartDataset,
} from '@/utils/seeder/regression'
import * as echarts from 'echarts'
// @ts-ignore
import { transform } from 'echarts-stat'
import React, { useState } from 'react'

export const LinearRegression: React.FC = () => {
  echarts.registerTransform(transform.regression)

  const { regressionDataset, setRegressionDataset, clearRegressionDataset } =
    useRegressionDatasetStore()
  const { selectedFile } = useFileStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    const getDataset = async () => {
      if (selectedFile && selectedFile.type === 'regression') {
        getRegressionChartDataset(selectedFile)
          .then(dataset => {
            setRegressionDataset(dataset)
          })
          .catch(err => {
            setError(err.message)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        setRegressionDataset(generateRegressionDataset(20))
        setIsLoading(false)
      }
    }
    getDataset()
    return () => {
      clearRegressionDataset()
    }
  }, [selectedFile])

  // if (!selectedFile) return <div>Select a file to plot</div>
  // if (selectedFile?.type !== 'regression')
  //   return <div>Selected dataset is not suitable for regression</div>

  if (error) return <div>{error}</div>
  if (!regressionDataset) return <div>Dataset is empty</div>

  const data = regressionDataset.dataItems

  const chartOption: echarts.EChartsOption = {
    dataset: [
      {
        source: data,
      },
      {
        transform: {
          type: 'ecStat:regression',
          config: { method: 'linear' },
        },
      },
    ],
    title: {
      text: 'Linear Regression',
      left: 'center',
      top: 16,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      splitNumber: 20,
    },
    yAxis: {
      min: -40,
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter',
      },
      {
        name: 'line',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 },
      },
    ],
  }

  return <EChartsWrapper option={chartOption} isLoading={isLoading} />
}
