import { LineChartDataset } from '@/entities/linechart.dataset'
import { create } from 'zustand'

interface LineChartDatasetStore {
  lineChartDataset: LineChartDataset[]
  setLineChartDataset: (dataset: LineChartDataset[]) => void
  clearLineChartDataset: () => void
}

export const useLineChartDatasetStore = create<LineChartDatasetStore>(set => ({
  lineChartDataset: [],
  setLineChartDataset: dataset => set({ lineChartDataset: dataset }),
  clearLineChartDataset: () => set({ lineChartDataset: [] }),
}))
