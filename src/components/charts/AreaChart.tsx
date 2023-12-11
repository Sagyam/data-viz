'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import { useAreaChartDatasetStore } from '@/stores/area-chart.store'
import { useFileStore } from '@/stores/file.store'
import { getAreaChartDataset } from '@/utils/seeder/areachart'
import * as echarts from 'echarts'
import React, { useState } from 'react'

export const AreaChart: React.FC = () => {
  const { areaChartDataset, setAreaChartDataset, clearAreaChartDataset } =
    useAreaChartDatasetStore()
  const { selectedFile } = useFileStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    setIsLoading(true)
    const getDataset = async () => {
      if (!selectedFile) return
      if (selectedFile?.type !== 'area-chart') return

      getAreaChartDataset(selectedFile)
        .then(dataset => {
          setAreaChartDataset(dataset)
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
      clearAreaChartDataset()
    }
  }, [selectedFile])

  if (!selectedFile) return <div>Select a file to visualize</div>

  if (selectedFile?.type !== 'area-chart')
    return <div>Selected dataset is not suitable for area chart</div>

  if (error) return <div>{error}</div>

  if (areaChartDataset?.dataArray.length === 0)
    return <div>Dataset is empty</div>

  const chartOption: echarts.EChartsOption = {
    showLoading: 'default',
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      },
    },
    title: {
      left: 'center',
      text: 'Area Chart',
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: areaChartDataset?.dateArray,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: areaChartDataset?.datasetName,
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)',
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)',
            },
          ]),
        },
        data: areaChartDataset?.dataArray,
      },
    ],
  }

  return <EChartsWrapper option={chartOption} isLoading={isLoading} />
}
