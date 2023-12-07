import EChartsWrapper from '@/components/EChartWrapper'
import * as echarts from 'echarts'
import { transform } from 'echarts-stat'
import React from 'react'

export const PolyRegression: React.FC = () => {
  echarts.registerTransform(transform.regression)

  const data = [
    [73.18, 29.42],
    [14.57, 66.83],
    [41.29, 50.07],
    [88.54, 5.12],
    [62.76, 33.91],
    [19.08, 77.65],
    [55.92, 42.36],
    [10.47, 91.24],
    [36.75, 58.09],
    [84.61, 12.88],
    [27.33, 68.74],
    [49.16, 45.53],
    [95.07, 3.26],
    [70.49, 24.67],
    [17.81, 80.02],
    [44.53, 37.81],
    [9.19, 93.36],
    [31.01, 63.2],
    [77.45, 20.15],
    [54.62, 53.08],
  ]

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
      text: 'Polynomical Regression',
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

  return <EChartsWrapper option={chartOption} style={{ height: '600px' }} />
}
