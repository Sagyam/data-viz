'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useClusteringDatasetStore } from '@/stores/custering.store'
import { useFileStore } from '@/stores/file.store'
import {
  generateClusteringDataset,
  getClusteringChartDataset,
} from '@/utils/seeder/clustering'
import * as echarts from 'echarts'
// @ts-ignore
import { transform } from 'echarts-stat'
import React, { useState } from 'react'

export const Clustering: React.FC = () => {
  echarts.registerTransform(transform.clustering)

  const { clusteringDataset, setClusteringDataset, clearClusteringDataset } =
    useClusteringDatasetStore()
  const { selectedFile } = useFileStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    const getDataset = async () => {
      if (selectedFile && selectedFile.type === 'clustering') {
        getClusteringChartDataset(selectedFile)
          .then(dataset => {
            setClusteringDataset(dataset)
          })
          .catch(err => {
            setError(err.message)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
        setClusteringDataset(generateClusteringDataset(100))
      }
    }
    getDataset()
    return () => {
      clearClusteringDataset()
    }
  }, [selectedFile])

  // if (!selectedFile) return <div>Select a file to visualize</div>
  // if (selectedFile?.type !== 'clustering')
  //   return <div>Selected dataset is not suitable for clustering</div>

  if (error) return <div>{error}</div>

  if (!clusteringDataset) return <div>Dataset is empty</div>

  const data = clusteringDataset.dataItems
  const CLUSTER_COUNT = 4
  const DIMENSION_CLUSTER_INDEX = 2
  const COLOR_ALL = [
    '#37A2DA',
    '#e06343',
    '#37a354',
    '#b55dba',
    '#b5bd48',
    '#8378EA',
    '#96BFFF',
  ]
  const pieces = []
  for (let i = 0; i < CLUSTER_COUNT; i++) {
    pieces.push({
      value: i,
      label: 'cluster ' + i,
      color: COLOR_ALL[i],
    })
  }
  const chartOption: echarts.EChartsOption = {
    dataset: [
      {
        source: data,
      },
      {
        transform: {
          type: 'ecStat:clustering',
          // print: true,
          config: {
            clusterCount: CLUSTER_COUNT,
            outputType: 'single',
            outputClusterIndexDimension: DIMENSION_CLUSTER_INDEX,
          },
        },
      },
    ],
    tooltip: {
      position: 'top',
    },
    visualMap: {
      type: 'piecewise',
      top: 'middle',
      min: 0,
      max: CLUSTER_COUNT,
      left: 10,
      splitNumber: CLUSTER_COUNT,
      dimension: DIMENSION_CLUSTER_INDEX,
      pieces: pieces,
    },
    grid: {
      left: 120,
    },
    xAxis: {},
    yAxis: {},
    series: {
      type: 'scatter',
      encode: { tooltip: [0, 1] },
      symbolSize: 15,
      itemStyle: {
        borderColor: '#555',
      },
      datasetIndex: 1,
    },
  }

  return <EChartsWrapper option={chartOption} isLoading={isLoading} />
}
