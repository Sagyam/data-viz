import { AreaChartDataset } from '@/entities/areachart.dataset'
import { CSVFile } from '@/entities/CSVFile'
import { faker } from '@faker-js/faker'
import csv from 'csvtojson'

export interface AreaChartOptions {
  amplitude: number
  frequency: number
}

export function generateAreaChart(
  arraySize: number,
  options: AreaChartOptions = { amplitude: 100, frequency: 25 }
): AreaChartDataset {
  const startDate = faker.date.past()
  const date = Array.from({ length: arraySize }, (_, i) => {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    return currentDate.toLocaleDateString()
  })

  const data = Array.from({ length: arraySize }, (_, i) => {
    const cycleFactor =
      Math.sin(i * (Math.PI / options.frequency)) * options.amplitude
    return Math.round(cycleFactor + 500)
  })

  return {
    id: faker.string.uuid(),
    datasetName: `Dataset Name`,
    dateArray: date,
    dataArray: data,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}

export async function getAreaChartDataset(
  file: CSVFile
): Promise<AreaChartDataset> {
  return new Promise<AreaChartDataset>((resolve, reject) => {
    let dateArray: string[] = []
    let dataArray: number[] = []
    let dataset: AreaChartDataset = {
      id: file.id,
      datasetName: file.name,
      dateArray,
      dataArray,
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
              dateArray.push(item.date)
              dataArray.push(parseInt(item.data))
            })
          })
          .then(() => {
            dataset.dateArray = dateArray
            dataset.dataArray = dataArray
            resolve(dataset)
          })
      })
      .catch((error: Error) => {
        reject(new Error(`Error fetching CSV file: ${error.message}`))
      })
  })
}
