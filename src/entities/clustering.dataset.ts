type twoDCord = [number, number]

export interface ClusteringDataset {
  id: string
  datasetName: string
  dataItem: twoDCord[]
  createdAt: string
  updatedAt: string
}
