import { BoxplotDataset } from '@/entities/boxplot.dataset'
import { faker } from '@faker-js/faker'

export function generateDatasetForBoxPlot(
  numDatasets: number,
  arraySize: number
): BoxplotDataset[] {
  const datasets: BoxplotDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataItem: number[] = Array.from({ length: arraySize }, () =>
      faker.number.int({ min: 0, max: 100 })
    )

    const dataset: BoxplotDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      data: dataItem,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
    datasets.push(dataset)
  }
  return datasets
}
