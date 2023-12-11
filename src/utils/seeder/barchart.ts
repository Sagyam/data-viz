import { BarchartDataItem, BarchartDataset } from '@/entities/barchar.dataset'
import { CSVFile } from '@/entities/CSVFile'
import { faker } from '@faker-js/faker'
import csv from 'csvtojson'

export function generateBarChartDataset(arraySize: number): BarchartDataset {
  const dataItem: [number, number, string][] = Array.from(
    { length: arraySize },
    (_, i) => [
      faker.number.int({ min: 0, max: 100 }),
      faker.number.int({ min: 0, max: 100 }),
      faker.music.songName(),
    ]
  )

  return {
    id: faker.string.uuid(),
    datasetName: `Dataset Name`,
    dataItems: dataItem,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}

export async function getBarChartDataset(
  file: CSVFile
): Promise<BarchartDataset> {
  return new Promise<BarchartDataset>((resolve, reject) => {
    let dataItems: BarchartDataItem[] = []
    let dataset: BarchartDataset = {
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
              dataItems.push([
                parseFloat(item.price),
                parseFloat(item.sales),
                item.product_name,
              ])
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
