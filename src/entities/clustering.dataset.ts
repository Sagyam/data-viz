export type twoDCord = [number, number]

export interface ClusteringDataset {
  id: string
  datasetName: string
  dataItems: twoDCord[]
  createdAt: Date
  updatedAt: Date
}
