export interface CSVFile {
  id: string
  name: string
  url: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export interface FilesResponseDto {
  dataItems: CSVFile[]
  page: number
  pageSize: number
  total: number
}

export interface CreateFileDto {
  name: string
  type: string
  file: File
}

export interface CreateFileResponseDto {
  name: string
  type: string
  url: string
}
