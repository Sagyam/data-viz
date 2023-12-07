type DataItem = [string, number, number]
type Titles = [string, string, string]

export interface BarchartDataset {
  id: string
  datasetName: string
  dataItem: DataItem[]
  title: Titles
  createdAt: string
  updatedAt: string
}
