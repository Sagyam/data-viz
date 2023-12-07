import { ClusteringDataset } from '@/entities/clustering.dataset'
import { faker } from '@faker-js/faker'

export function generateClusteringDataset(
  numDatasets: number,
  arraySize: number
): ClusteringDataset[] {
  const datasets: ClusteringDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataItem: [number, number][] = Array.from(
      { length: arraySize },
      () => [
        faker.number.int({ min: 0, max: 100 }),
        faker.number.int({ min: 0, max: 100 }),
      ]
    )

    const dataset: ClusteringDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      dataItem: dataItem,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
    datasets.push(dataset)
  }
  return datasets
}
