'use client'

import EChartsWrapper from '@/components/EChartWrapper'
import * as echarts from 'echarts'
import React from 'react'

export const BarChartStacked: React.FC = () => {
  const xAxisData = []
  const data1 = []
  const data2 = []
  for (let i = 0; i < 100; i++) {
    xAxisData.push('A' + i)
    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  }

  const chartOption: echarts.EChartsOption = {
    title: {
      text: 'Bar Chart',
      left: 'center',
    },
    legend: {
      data: ['bar', 'bar2'],
      top: 'bottom',
    },
    toolbox: {
      //y: 'bottom',
      feature: {
        magicType: {
          type: ['stack'],
        },
        dataView: {},
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      splitLine: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        name: 'bar',
        type: 'bar',
        data: data1,
        emphasis: {
          focus: 'series',
        },
        animationDelay: function (idx) {
          return idx * 10
        },
      },
      {
        name: 'bar2',
        type: 'bar',
        data: data2,
        emphasis: {
          focus: 'series',
        },
        animationDelay: function (idx) {
          return idx * 10 + 100
        },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5
    },
  }

  return <EChartsWrapper option={chartOption} />
}
