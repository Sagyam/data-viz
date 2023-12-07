'use client'

import * as echarts from 'echarts'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'

interface EChartsWrapperProps {
  option: echarts.EChartsOption
  style?: React.CSSProperties
  className?: string
}

const EChartsWrapper: React.FC<EChartsWrapperProps> = ({
  option,
  style,
  className,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { resolvedTheme: theme } = useTheme()

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current, theme ?? 'light')
      chart.setOption(option)

      // Cleanup the chart when the component is unmounted
      return () => {
        chart.dispose()
      }
    }
  }, [option, theme])

  return <div ref={chartRef} style={style} className={className} />
}

export default EChartsWrapper
