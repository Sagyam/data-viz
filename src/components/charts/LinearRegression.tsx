'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useRegressionDatasetStore } from '@/stores/regression.store'
import { generateRegressionDataset } from '@/utils/seeder/regression'
import * as echarts from 'echarts'
// @ts-ignore
import { transform } from 'echarts-stat'
import React, { useEffect } from 'react'

export const LinearRegression: React.FC = () => {
  echarts.registerTransform(transform.regression)

  const { regressionDataset, setRegressionDataset } =
    useRegressionDatasetStore()

  useEffect(() => {
    setRegressionDataset(generateRegressionDataset(20))
  }, [])

  if (!regressionDataset) {
    return <div>No data</div>
  }

  const data = regressionDataset.dataItem

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

  return <EChartsWrapper option={chartOption} />
}
