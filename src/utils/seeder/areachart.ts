import { AreaChartDataset } from '@/entities/areachart.dataset'
import { faker } from '@faker-js/faker'

export interface AreaChartOptions {
  amplitude: number
  frequency: number
}

export function generateAreaChart(
  arraySize: number,
  options: AreaChartOptions = { amplitude: 100, frequency: 25 }
): AreaChartDataset {
  const startDate = faker.date.past()
  const date = Array.from({ length: arraySize }, (_, i) => {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    return currentDate.toLocaleDateString()
  })

  const data = Array.from({ length: arraySize }, (_, i) => {
    const cycleFactor =
      Math.sin(i * (Math.PI / options.frequency)) * options.amplitude
    return Math.round(cycleFactor + 500)
  })

  return {
    id: faker.string.uuid(),
    datasetName: `Dataset Name`,
    dateArray: date,
    dataArray: data,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }
}
