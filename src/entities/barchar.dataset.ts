export type BarchartDataItem = [number, number, string]

export interface BarchartDataset {
  id: string
  datasetName: string
  dataItems: BarchartDataItem[]
  createdAt: Date
  updatedAt: Date
}
