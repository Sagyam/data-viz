import EChartsWrapper from '@/components/EChartWrapper'
import { useClusteringDatasetStore } from '@/stores/custering.store'
import { generateClusteringDataset } from '@/utils/seeder/clustering'
import * as echarts from 'echarts'
import { transform } from 'echarts-stat'
import React, { useEffect } from 'react'

export const Clustering: React.FC = () => {
  echarts.registerTransform(transform.clustering)

  const { clusteringDataset, setClusteringDataset } =
    useClusteringDatasetStore()

  useEffect(() => {
    setClusteringDataset(generateClusteringDataset(50))
  }, [])

  if (!clusteringDataset) {
    return <div>No data</div>
  }

  const data = clusteringDataset.dataItem
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

  return <EChartsWrapper option={chartOption} style={{ height: '600px' }} />
}
