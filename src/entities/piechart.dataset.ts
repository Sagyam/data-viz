export interface PieChartDataItem {
  value: number
  name: string
}

export interface PieChartDataset {
  id: string
  datasetName: string
  dataItems: PieChartDataItem[]
  createdAt: Date
  updatedAt: Date
}
