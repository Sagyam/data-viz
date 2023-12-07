import { ClusteringDataset } from '@/entities/clustering.dataset'
import create from 'zustand'

interface ClusteringDatasetStore {
  clusteringDataset: ClusteringDataset | null
  setClusteringDataset: (dataset: ClusteringDataset) => void
  clearClusteringDataset: () => void
}

export const useClusteringDatasetStore = create<ClusteringDatasetStore>(
  set => ({
    clusteringDataset: null,
    setClusteringDataset: dataset => set({ clusteringDataset: dataset }),
    clearClusteringDataset: () => set({ clusteringDataset: null }),
  })
)
