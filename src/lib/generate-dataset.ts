import {
  DatasetWithCord,
  DatasetWithLabel1D,
  DatasetWithLabel2D,
} from '@/entities/dataset.entities'
import { faker } from '@faker-js/faker'

export function generateDatasetWithLabel1D(
  numDatasets: number,
  arraySize: number
): DatasetWithLabel1D[] {
  const datasets: DatasetWithLabel1D[] = []

  for (let i = 0; i < numDatasets; i++) {
    const labels = Array.from({ length: arraySize }, (_, i) => `label${i + 1}`)
    const dataItem: [string, number][] = Array.from(
      { length: arraySize },
      (_, i) => [labels[i], faker.number.int({ min: 0, max: 100 })]
    )

    const dataset: DatasetWithLabel1D = {
      id: faker.string.uuid(),
      datasetName: `dataset${i + 1}`,
      labels: labels,
      data: dataItem.map(item => item[1]),
      type: 'label1D',
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
    datasets.push(dataset)
  }
  return datasets
}

export function generateDatasetWithLabel2D(
  numDatasets: number,
  arraySize: number
): DatasetWithLabel2D[] {
  const datasets: DatasetWithLabel2D[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataItem: [string, number, number][] = Array.from(
      { length: arraySize },
      () => [
        faker.word.noun(1),
        faker.number.int({ min: 0, max: 100 }),
        faker.number.int({ min: 0, max: 100 }),
      ]
    )

    const dataset: DatasetWithLabel2D = {
      id: faker.string.uuid(),
      datasetName: faker.lorem.word(3),
      dataItem,
      dataXName: faker.word.noun(1),
      dataYName: faker.word.noun(1),
      type: 'label2D',
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }

    datasets.push(dataset)
  }

  return datasets
}

export function generateDatasetCord(
  numDatasets: number,
  arraySize: number
): DatasetWithCord[] {
  const datasets: DatasetWithCord[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataItem: [number, number][] = Array.from(
      { length: arraySize },
      () => [
        faker.number.int({ min: 0, max: 100 }),
        faker.number.int({ min: 0, max: 100 }),
      ]
    )

    const dataset: DatasetWithCord = {
      id: faker.string.uuid(),
      datasetName: faker.word.noun(3),
      dataItem,
      type: 'cord',
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }

    datasets.push(dataset)
  }

  return datasets
}
