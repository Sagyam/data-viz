'use client'

import { AreaChart } from '@/components/charts/AreaChart'
import { BarChart } from '@/components/charts/BarChart'
import { BarChartStacked } from '@/components/charts/BarChartStacked'
import { BoxPlot } from '@/components/charts/BoxPlot'
import { Clustering } from '@/components/charts/Clustering'
import { LineChart } from '@/components/charts/LineChart'
import { PieChart } from '@/components/charts/PieChart'
import { PolyRegression } from '@/components/charts/PolyRegression'
import { DatasetSelector } from '@/components/DatasetSelector'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { generateDatasetWithLabel1D } from '@/lib/generate-dataset'
import { useDatasetStore } from '@/stores/data-store'
import React, { useEffect } from 'react'

const HomePage: React.FC = () => {
  const { setDatasets } = useDatasetStore()

  useEffect(() => {
    const datasetWithLabel1D = generateDatasetWithLabel1D(3, 12)
    // const datasetWithLabel2D = generateDatasetWithLabel2D(3, 10)
    // const datasetWithCord = generateDatasetCord(3, 10)
    setDatasets([
      ...datasetWithLabel1D,
      // ...datasetWithLabel2D,
      // ...datasetWithCord,
    ])
  }, [])

  return (
    <main className="flex flex-col items-center justify-center gap-y-8 py-16 px-32">
      <div className="flex justify-between items-stretch">
        <DatasetSelector />
        <ThemeSwitch />
      </div>
      <Tabs defaultValue="line-chart" className="w-full">
        <TabsList className="flex justify-center my-4">
          <TabsTrigger value="line-chart">Line Chart</TabsTrigger>
          <TabsTrigger value="area-chart">Area Chart</TabsTrigger>
          <TabsTrigger value="bar-chart">Bar Chart</TabsTrigger>
          <TabsTrigger value={'bar-chart-stacked'}>
            Bar Chart Stacked
          </TabsTrigger>
          <TabsTrigger value="pie-chart">Pie Chart</TabsTrigger>
          <TabsTrigger value="box-plot">Box Plot</TabsTrigger>
          <TabsTrigger value="clustering">Clustering</TabsTrigger>
          <TabsTrigger value="regression">Regression</TabsTrigger>
        </TabsList>

        <TabsContent value="line-chart">
          <LineChart />
        </TabsContent>
        <TabsContent value="area-chart">
          <AreaChart />
        </TabsContent>
        <TabsContent value="bar-chart">
          <BarChart />
        </TabsContent>
        <TabsContent value="bar-chart-stacked">
          <BarChartStacked />
        </TabsContent>
        <TabsContent value="pie-chart">
          <PieChart />
        </TabsContent>
        <TabsContent value="box-plot">
          <BoxPlot />
        </TabsContent>
        <TabsContent value="clustering">
          <Clustering />
        </TabsContent>
        <TabsContent value="regression">
          <PolyRegression />
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default HomePage
