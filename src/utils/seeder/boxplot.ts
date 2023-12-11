import { BoxplotDataset } from '@/entities/boxplot.dataset'
import { CSVFile } from '@/entities/CSVFile'
import { faker } from '@faker-js/faker'
import csv from 'csvtojson'

export function generateDatasetForBoxPlot(
  numDatasets: number,
  arraySize: number
): BoxplotDataset[] {
  const datasets: BoxplotDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const table: number[][] = []

    for (let j = 0; j < arraySize; j++) {
      const row: number[] = []
      for (let k = 0; k < arraySize; k++) {
        row.push(faker.number.int({ min: 0, max: 100 }))
      }
      table.push(row)
    }

    const dataset: BoxplotDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      table: table,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }
    datasets.push(dataset)
  }
  return datasets
}

export async function getBoxplotDataset(
  file: CSVFile
): Promise<BoxplotDataset> {
  return new Promise<BoxplotDataset>((resolve, reject) => {
    let table: number[][] = []
    let dataset: BoxplotDataset = {
      id: file.id,
      datasetName: file.name,
      table: table,
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
          .then(function (results) {
            results.forEach((row: any) => {
              const newRow: number[] = []
              Object.values(row).forEach((value: any) => {
                newRow.push(parseInt(value))
              })
              table.push(newRow)
            })
          })
          .then(() => {
            dataset.table = table
            console.log(dataset)
            resolve(dataset)
          })
      })
      .catch((error: Error) => {
        reject(new Error(`Error fetching CSV file: ${error.message}`))
      })
  })
}
