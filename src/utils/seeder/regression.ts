import { RegressionDataset, twoDCord } from '@/entities/regression.dataset'
import { faker } from '@faker-js/faker'

export function generateRegressionDataset(
  numDatasets: number,
  arraySize: number
): RegressionDataset[] {
  const datasets: RegressionDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataset: RegressionDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      dataItem: generateCoordinates(arraySize),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
    datasets.push(dataset)
  }

  return datasets
}

export function generateCoordinates(arraySize: number): twoDCord[] {
  const slope = Math.random() * 2 - 1
  const coordinates: twoDCord[] = []
  for (let i = 0; i < arraySize; i++) {
    const noise = Math.random() - 0.5
    const y = slope * i + noise
    coordinates.push([i, y])
  }
  return coordinates
}
