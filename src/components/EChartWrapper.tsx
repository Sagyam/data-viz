'use client'

import * as echarts from 'echarts'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef, useState } from 'react'

interface EChartsWrapperProps {
  option: echarts.EChartsOption
  style?: React.CSSProperties
  className?: string
  isLoading?: boolean
}
const EChartsWrapper: React.FC<EChartsWrapperProps> = ({
  option,
  className,
  isLoading = false,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [chart, setChart] = useState<echarts.ECharts | null>(null)
  const { resolvedTheme: theme } = useTheme()

  useEffect(() => {
    if (chartRef.current) {
      const newChart = echarts.init(chartRef.current, theme ?? 'light')
      newChart.setOption(option)

      if (isLoading) {
        newChart.showLoading()
      } else {
        newChart.hideLoading()
      }

      setChart(newChart)

      return () => {
        newChart.dispose()
      }
    }
  }, [option, theme, isLoading])

  useEffect(() => {
    const handleResize = () => {
      if (chart) {
        chart.resize()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [chart])

  return (
    <div
      ref={chartRef}
      className={className}
      style={{
        height: '80vh',
        width: '80vw',
      }}
    />
  )
}

export default EChartsWrapper
