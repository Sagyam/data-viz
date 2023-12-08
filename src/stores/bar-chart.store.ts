import { BarchartDataset } from '@/entities/barchar.dataset'
import { create } from 'zustand'

interface BarchartDatasetState {
  barchartDataset: BarchartDataset | null
  setBarchartDataset: (dataset: BarchartDataset) => void
  clearBarchartDataset: () => void
}

export const useBarchartDatasetStore = create<BarchartDatasetState>(set => ({
  barchartDataset: null,
  setBarchartDataset: (dataset: BarchartDataset) =>
    set({ barchartDataset: dataset }),
  clearBarchartDataset: () => set({ barchartDataset: null }),
}))
