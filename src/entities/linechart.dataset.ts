export interface LineChartDataset {
  id: string
  datasetName: string
  dataItem: LineChartDatasetDataItem[]
  createdAt: string
  updatedAt: string
}

interface LineChartDatasetDataItem {
  label: string
  data: number
}
