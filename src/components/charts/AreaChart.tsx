import EChartsWrapper from '@/components/EChartWrapper'
import * as echarts from 'echarts'
import React from 'react'

export const AreaChart: React.FC = () => {
  let base = +new Date(1968, 9, 3)
  let oneDay = 24 * 3600 * 1000
  let date = []

  let data = [Math.random() * 300]

  for (let i = 1; i < 100; i++) {
    const now = new Date((base += oneDay))
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
  }

  const chartOption: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      },
    },
    title: {
      left: 'center',
      text: 'Large Area Chart',
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
      data: date,
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
        name: 'Fake Data',
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
        data: data,
      },
    ],
  }

  return <EChartsWrapper option={chartOption} style={{ height: '400px' }} />
}
