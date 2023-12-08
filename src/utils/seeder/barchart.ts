import { BarchartDataset } from '@/entities/barchar.dataset'
import { faker } from '@faker-js/faker'

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
    dataItem: dataItem,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }
}
