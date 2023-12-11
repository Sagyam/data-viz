'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useBoxplotDatasetStore } from '@/stores/box-plot.store'
import { useFileStore } from '@/stores/file.store'
import {
  generateDatasetForBoxPlot,
  getBoxplotDataset,
} from '@/utils/seeder/boxplot'
import * as echarts from 'echarts'
import React, { useState } from 'react'

export const BoxPlot: React.FC = () => {
  const { boxplotDataset, setBoxplotDataset, clearBoxplotDataset } =
    useBoxplotDatasetStore()
  const { selectedFile } = useFileStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    const getDataset = async () => {
      if (selectedFile && selectedFile.type === 'box-plot') {
        getBoxplotDataset(selectedFile)
          .then(dataset => {
            setBoxplotDataset(dataset)
          })
          .catch(err => {
            setError(err.message)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        setBoxplotDataset(generateDatasetForBoxPlot(8))
        setIsLoading(false)
      }
    }
    getDataset()
    return () => {
      clearBoxplotDataset()
    }
  }, [selectedFile])

  // if (!selectedFile) return <div>Select a file to plot</div>
  // if (selectedFile?.type !== 'box-plot')
  //   return <div>Selected dataset is not suitable for boxplot</div>

  if (error) return <div>{error}</div>

  if (!boxplotDataset) return <div>Dataset is empty</div>

  const chartOption: echarts.EChartsOption = {
    title: [
      {
        text: 'BoxPlot',
        left: 'center',
      },
    ],
    dataset: [
      {
        source: boxplotDataset.table,
      },
      {
        transform: {
          type: 'boxplot',
          config: { itemNameFormatter: 'expr {value}' },
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

  return <EChartsWrapper option={chartOption} isLoading={isLoading} />
}
