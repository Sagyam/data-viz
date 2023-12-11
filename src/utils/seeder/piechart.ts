import { CSVFile } from '@/entities/CSVFile'
import { PieChartDataItem, PieChartDataset } from '@/entities/piechart.dataset'
import { faker } from '@faker-js/faker'

import csv from 'csvtojson'

export function generatePieChartDataset(
  numDatasets: number,
  arraySize: number
): PieChartDataset[] {
  const datasets: PieChartDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataItems: PieChartDataItem[] = Array.from(
      { length: arraySize },
      () => ({
        value: faker.number.int({ min: 0, max: 100 }),
        name: faker.word.noun(1),
      })
    )

    const dataset: PieChartDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      dataItems,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }
    datasets.push(dataset)
  }
  return datasets
}

export async function getPieChartDataset(
  file: CSVFile
): Promise<PieChartDataset> {
  return new Promise<PieChartDataset>((resolve, reject) => {
    let dataItems: PieChartDataItem[] = []
    let dataset: PieChartDataset = {
      id: file.id,
      datasetName: file.name,
      dataItems,
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
              dataItems.push({
                name: item.name,
                value: item.value,
              })
            })
          })
          .then(() => {
            dataset.dataItems = dataItems
            resolve(dataset)
          })
          .catch((error: Error) => {
            reject(new Error(`Error parsing CSV: ${error.message}`))
          })
      })
      .catch((error: Error) => {
        reject(new Error(`Error fetching CSV file: ${error.message}`))
      })
  })
}
