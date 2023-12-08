import { BoxplotDataset } from '@/entities/boxplot.dataset'
import { create } from 'zustand'

interface BoxplotDatasetStore {
  boxplotDataset: BoxplotDataset[]
  setBoxplotDataset: (dataset: BoxplotDataset[]) => void
  clearBoxplotDataset: () => void
}

export const useBoxplotDatasetStore = create<BoxplotDatasetStore>(set => ({
  boxplotDataset: [],
  setBoxplotDataset: dataset => set({ boxplotDataset: dataset }),
  clearBoxplotDataset: () => set({ boxplotDataset: [] }),
}))
