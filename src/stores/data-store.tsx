import {
  DatasetWithCord,
  DatasetWithLabel1D,
  DatasetWithLabel2D,
} from '@/entities/dataset.entities'

import create from 'zustand'

export type AnyDatasetType =
  | DatasetWithLabel1D
  | DatasetWithLabel2D
  | DatasetWithCord

interface DatasetStore {
  datasets: AnyDatasetType[]
  setDatasets: (datasets: AnyDatasetType[]) => void
  clearDatasets: () => void
  addDataset: (dataset: AnyDatasetType) => void
  removeDataset: (dataset: AnyDatasetType) => void
  getAllDatasetsWithLabel1D: () => DatasetWithLabel1D[]
  getAllDatasetsWithLabel2D: () => DatasetWithLabel2D[]
  getAllDatasetsWithCord: () => DatasetWithCord[]
}

const datasetStore = create<DatasetStore>(set => ({
  datasets: [],
  setDatasets: datasets => set({ datasets }),
  clearDatasets: () => set({ datasets: [] }),
  addDataset: dataset =>
    set(state => ({ datasets: [...state.datasets, dataset] })),
  removeDataset: dataset =>
    set(state => ({ datasets: state.datasets.filter(d => d !== dataset) })),
  getAllDatasetsWithLabel1D: () =>
    datasetStore.getState().datasets.filter(d => d.type === 'label1D'),
  getAllDatasetsWithLabel2D: () =>
    datasetStore.getState().datasets.filter(d => d.type === 'label2D'),
  getAllDatasetsWithCord: () =>
    datasetStore.getState().datasets.filter(d => d.type === 'cord'),
}))

export const useDatasetStore = datasetStore
