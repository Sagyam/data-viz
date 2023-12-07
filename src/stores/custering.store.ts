import { ClusteringDataset } from '@/entities/clustering.dataset'
import create from 'zustand'

interface ClusteringDatasetStore {
  clusteringDataset: ClusteringDataset[]
  setClusteringDataset: (dataset: ClusteringDataset[]) => void
  clearClusteringDataset: () => void
}

export const useClusteringDatasetStore = create<ClusteringDatasetStore>(
  set => ({
    clusteringDataset: [],
    setClusteringDataset: dataset => set({ clusteringDataset: dataset }),
    clearClusteringDataset: () => set({ clusteringDataset: [] }),
  })
)
