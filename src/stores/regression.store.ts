import { RegressionDataset } from '@/entities/regression.dataset'
import { create } from 'zustand'

interface RegressionDatasetStore {
  regressionDataset: RegressionDataset | null
  setRegressionDataset: (dataset: RegressionDataset) => void
  clearRegressionDataset: () => void
}

export const useRegressionDatasetStore = create<RegressionDatasetStore>(
  set => ({
    regressionDataset: null,
    setRegressionDataset: dataset => set({ regressionDataset: dataset }),
    clearRegressionDataset: () => set({ regressionDataset: null }),
  })
)
