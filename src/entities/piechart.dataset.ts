export interface PieChartDataItem {
  value: number
  name: string
}

export interface PieChartDataset {
  id: string
  datasetName: string
  dataItem: PieChartDataItem[]
  createdAt: string
  updatedAt: string
}
