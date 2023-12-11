'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useBoxplotDatasetStore } from '@/stores/box-plot.store'
import { generateDatasetForBoxPlot } from '@/utils/seeder/boxplot'
import * as echarts from 'echarts'
import React, { useEffect } from 'react'

export const BoxPlot: React.FC = () => {
  const { boxplotDataset, setBoxplotDataset } = useBoxplotDatasetStore()

  useEffect(() => {
    setBoxplotDataset(generateDatasetForBoxPlot(5, 8))
  }, [])

  if (boxplotDataset.length === 0) {
    return <div>No data</div>
  }

  const chartOption: echarts.EChartsOption = {
    title: [
      {
        text: 'BoxPlot',
        left: 'center',
      },
    ],
    dataset: [
      {
        source: boxplotDataset.map(dataset => dataset.data),
      },
      {
        transform: {
          type: 'boxplot',
          config: { itemNameFormatter: 'Dataset {value}' },
        },
      },
      {
        fromDatasetIndex: 1,
        fromTransformResult: 1,
      },
    ],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Y axis units',
      splitArea: {
        show: true,
      },
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        datasetIndex: 1,
      },
      {
        name: 'outlier',
        type: 'scatter',
        datasetIndex: 2,
      },
    ],
  }

  return <EChartsWrapper option={chartOption} />
}
