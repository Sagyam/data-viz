'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { usePieChartDatasetStore } from '@/stores/pie-chart.store'
import { generatePieChartDataset } from '@/utils/seeder/piechart'
import * as echarts from 'echarts'
import React, { useEffect } from 'react'

export const PieChart: React.FC = () => {
  const { pieChartDataset, setPieChartDataset } = usePieChartDatasetStore()

  useEffect(() => {
    setPieChartDataset(generatePieChartDataset(1, 5))
  }, [])

  if (!pieChartDataset) {
    return null
  }

  const chartOption: echarts.EChartsOption = {
    title: {
      text: `${pieChartDataset.datasetName} Pie Chart`,
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
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: pieChartDataset.dataItem,
      },
    ],
  }

  return <EChartsWrapper option={chartOption} style={{ height: '600px' }} />
}
