import { BarchartDataset } from '@/entities/barchar.dataset'
import { faker } from '@faker-js/faker'

export function generateBarChartDataset(
  numDatasets: number,
  arraySize: number
): BarchartDataset[] {
  const datasets: BarchartDataset[] = []

  for (let i = 0; i < numDatasets; i++) {
    const dataItem: [string, number, number][] = Array.from(
      { length: arraySize },
      (_, i) => [
        faker.music.songName(),
        faker.number.int({ min: 0, max: 100 }),
        faker.number.int({ min: 0, max: 100 }),
      ]
    )

    const dataset: BarchartDataset = {
      id: faker.string.uuid(),
      datasetName: `Dataset ${i + 1}`,
      title: ['title1', 'title2', 'title3'],
      dataItem: dataItem,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
    datasets.push(dataset)
  }
  return datasets
}
