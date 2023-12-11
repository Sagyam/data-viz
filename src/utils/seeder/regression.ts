import { CSVFile } from '@/entities/CSVFile'
import { RegressionDataset, twoDCord } from '@/entities/regression.dataset'
import { faker } from '@faker-js/faker'
import csv from 'csvtojson'

export function generateRegressionDataset(
  arraySize: number
): RegressionDataset {
  return {
    id: faker.string.uuid(),
    datasetName: `Dataset`,
    dataItems: generateCoordinates(arraySize),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
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

export async function getRegressionChartDataset(
  file: CSVFile
): Promise<RegressionDataset> {
  return new Promise<RegressionDataset>((resolve, reject) => {
    let dataItems: twoDCord[] = []
    let dataset: RegressionDataset = {
      id: file.id,
      datasetName: file.name,
      dataItems: dataItems,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
    }

    fetch(file.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Error fetching CSV file: ${response.status} ${response.statusText}`
          )
        }
        return response.text()
      })
      .then(text => {
        csv()
          .fromString(text)
          .then(function (result) {
            result.forEach((item: any) => {
              dataItems.push([parseFloat(item.x), parseFloat(item.y)])
            })
          })
          .then(() => {
            dataset.dataItems = dataItems
            resolve(dataset)
          })
      })
      .catch((error: Error) => {
        reject(new Error(`Error fetching CSV file: ${error.message}`))
      })
  })
}
