import { ClusteringDataset, twoDCord } from '@/entities/clustering.dataset'
import { CSVFile } from '@/entities/CSVFile'
import { faker } from '@faker-js/faker'
import csv from 'csvtojson'

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
    dataItems: dataItem,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}

export async function getClusteringChartDataset(
  file: CSVFile
): Promise<ClusteringDataset> {
  return new Promise<ClusteringDataset>((resolve, reject) => {
    let dataItems: twoDCord[] = []
    let dataset: ClusteringDataset = {
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
