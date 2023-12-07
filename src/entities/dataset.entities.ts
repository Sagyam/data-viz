export interface DatasetWithLabel1D {
  id: string
  datasetName: string
  labels: string[]
  data: number[]
  type: string
  createdAt: string
  updatedAt: string
}

export interface DatasetWithLabel2D {
  id: string
  datasetName: string
  dataItem: [string, number, number][]
  dataXName: string
  dataYName: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface DatasetWithCord {
  id: string
  datasetName: string
  dataItem: [number, number][]
  type: string
  createdAt: string
  updatedAt: string
}
