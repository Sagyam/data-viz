import { ClusteringDataset } from '@/entities/clustering.dataset'
import { faker } from '@faker-js/faker'

export function generateClusteringDataset(
  arraySize: number
): ClusteringDataset {
  const dataItem: [number, number][] = Array.from({ length: arraySize }, () => [
    faker.number.int({ min: 0, max: 100 }),
    faker.number.int({ min: 0, max: 100 }),
  ])

  return {
    id: faker.string.uuid(),
    datasetName: `Dataset`,
    dataItem: dataItem,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }
}
