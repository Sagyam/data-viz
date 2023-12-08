import EChartsWrapper from '@/components/EChartWrapper'
import { useAreaChartDatasetStore } from '@/stores/area-chart.store'
import { generateAreaChart } from '@/utils/seeder/areachart'
import * as echarts from 'echarts'
import React, { useEffect } from 'react'

export const AreaChart: React.FC = () => {
  const { areaChartDataset, setAreaChartDataset } = useAreaChartDatasetStore()

  useEffect(() => {
    setAreaChartDataset(generateAreaChart(500))
  }, [])

  if (!areaChartDataset) {
    return <div>No data</div>
  }

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
      data: areaChartDataset.dateArray,
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
        name: areaChartDataset.datasetName,
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
        data: areaChartDataset.dataArray,
      },
    ],
  }

  return <EChartsWrapper option={chartOption} style={{ height: '400px' }} />
}
