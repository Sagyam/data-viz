import create from 'zustand';

import { Dataset } from '@/entities/dataset.entities';

interface DatasetStore {
    datasets: Dataset[];
    addDataset: (dataset: Dataset) => void;
    updateDataset: (id: string, updatedDataset: Partial<Dataset>) => void;
    removeDataset: (id: string) => void;
}

export const useDatasetStore = create<DatasetStore>((set) => ({
    datasets: [],

    addDataset: (newDataset) => set((state) => ({ datasets: [...state.datasets, newDataset] })),

    updateDataset: (id, updatedDataset) =>
        set((state) => ({
            datasets: state.datasets.map((dataset) =>
                dataset.id === id ? { ...dataset, ...updatedDataset } : dataset
            ),
        })),

    removeDataset: (id) => set((state) => ({ datasets: state.datasets.filter((dataset) => dataset.id !== id) })),
}));
