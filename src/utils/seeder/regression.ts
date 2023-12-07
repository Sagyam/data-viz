import { RegressionDataset, twoDCord } from '@/entities/regression.dataset'
import { faker } from '@faker-js/faker'

export function generateRegressionDataset(
  arraySize: number
): RegressionDataset {
  return {
    id: faker.string.uuid(),
    datasetName: `Dataset`,
    dataItem: generateCoordinates(arraySize),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }
}

function generateCoordinates(arraySize: number): twoDCord[] {
  const slope = Math.random() * 2 - 1
  const coordinates: twoDCord[] = []
  for (let i = 0; i < arraySize; i++) {
    const noise = Math.random() * 10 - 5
    const y = slope * i + noise
    coordinates.push([i, y])
  }
  return coordinates
}
