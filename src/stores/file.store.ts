import { CSVFile } from '@/entities/CSVFile'
import create from 'zustand'

interface FileStore {
  files: CSVFile[]
  selectedFile: CSVFile | null
  activeTab: string
  setSelectedFile: (file: CSVFile) => void
  setFiles: (files: CSVFile[]) => void
  addFile: (file: CSVFile) => void
  deleteFile: (id: string) => void
}

export const useFileStore = create<FileStore>(set => ({
  files: [],
  selectedFile: null,
  activeTab: 'datatable',
  setSelectedFile: file => set({ selectedFile: file }),
  clearSelectedFile: () => set({ selectedFile: null }),
  setFiles: files => set({ files }),
  addFile: file => set(state => ({ files: [...state.files, file] })),
  deleteFile: id =>
    set(state => ({ files: state.files.filter(file => file.id !== id) })),
}))
