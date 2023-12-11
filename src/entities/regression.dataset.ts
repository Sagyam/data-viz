export type twoDCord = [number, number]

export interface RegressionDataset {
  id: string
  datasetName: string
  dataItems: twoDCord[]
  createdAt: Date
  updatedAt: Date
}
