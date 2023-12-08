import { AreaChartDataset } from '@/entities/areachart.dataset'
import { create } from 'zustand'

interface AreaChartDatasetState {
  areaChartDataset: AreaChartDataset | null
  setAreaChartDataset: (dataset: AreaChartDataset) => void
  clearAreaChartDataset: () => void
}

export const useAreaChartDatasetStore = create<AreaChartDatasetState>(set => ({
  areaChartDataset: null,
  setAreaChartDataset: (dataset: AreaChartDataset) =>
    set({ areaChartDataset: dataset }),
  clearAreaChartDataset: () => set({ areaChartDataset: null }),
}))
