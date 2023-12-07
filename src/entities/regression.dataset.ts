export type twoDCord = [number, number]

export interface RegressionDataset {
  id: string
  datasetName: string
  dataItem: twoDCord[]
  createdAt: string
  updatedAt: string
}
