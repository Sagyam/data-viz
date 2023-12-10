'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useBarchartDatasetStore } from '@/stores/bar-chart.store'
import { generateBarChartDataset } from '@/utils/seeder/barchart'
import * as echarts from 'echarts'
import React, { useEffect } from 'react'

export const BarChart: React.FC = () => {
  const { barchartDataset, setBarchartDataset } = useBarchartDatasetStore()

  useEffect(() => {
    setBarchartDataset(generateBarChartDataset(12))
  }, [])

  if (!barchartDataset) {
    return <div>No data</div>
  }

  const chartOption: echarts.EChartsOption = {
    title: {
      text: 'Bar Chart',
      left: 'center',
    },
    dataset: {
      source: [['score', 'amount', 'product'], ...barchartDataset.dataItem],
    },
    grid: { containLabel: true },
    xAxis: { name: 'amount' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product',
        },
      },
    ],
  }

  return <EChartsWrapper option={chartOption} style={{ height: '600px' }} />
}
