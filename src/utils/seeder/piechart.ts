import { PieChartDataItem, PieChartDataset } from '@/entities/piechart.dataset'
import { faker } from '@faker-js/faker'

export function generatePieChartDataset(
  numDatasets: number,
  arraySize: number
): PieChartDataset[] {
  const datasets: PieChartDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataItem: PieChartDataItem[] = Array.from(
      { length: arraySize },
      () => ({
        value: faker.number.int({ min: 0, max: 100 }),
        name: faker.word.noun(1),
      })
    )

    const dataset: PieChartDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      dataItem,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }

    datasets.push(dataset)
  }

  return datasets
}
