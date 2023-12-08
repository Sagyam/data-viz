type DataItem = [number, number, string]

export interface BarchartDataset {
  id: string
  datasetName: string
  dataItem: DataItem[]
  createdAt: string
  updatedAt: string
}
