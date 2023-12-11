import { PieChartDataset } from '@/entities/piechart.dataset'
import { create } from 'zustand'

interface PieChartDatasetStore {
  pieChartDataset: PieChartDataset | null
  setPieChartDataset: (dataset: PieChartDataset) => void
  clearPieChartDataset: () => void
}

export const usePieChartDatasetStore = create<PieChartDatasetStore>(set => ({
  pieChartDataset: null,
  setPieChartDataset: (dataset: PieChartDataset) =>
    set({ pieChartDataset: dataset }),
  clearPieChartDataset: () => set({ pieChartDataset: null }),
}))
