import { LineChartDataset } from '@/entities/linechart.dataset'
import { faker } from '@faker-js/faker'

export function generateLineChartDataset(
  numDatasets: number,
  arraySize: number
): LineChartDataset[] {
  const datasets: LineChartDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const labels = Array.from({ length: arraySize }, (_, i) => `label${i + 1}`)
    const dataItem: [string, number][] = Array.from(
      { length: arraySize },
      (_, i) => [labels[i], faker.number.int({ min: 0, max: 100 })]
    )

    const dataset: LineChartDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      dataItem: dataItem.map(item => ({ label: item[0], data: item[1] })),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
    datasets.push(dataset)
  }
  return datasets
}
