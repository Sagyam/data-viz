import {
  CreateFileDto,
  CreateFileResponseDto,
  CSVFile,
  FilesResponseDto,
} from '@/entities/CSVFile'

export async function getAllFiles(): Promise<CSVFile[]> {
  const response = await fetch(`http://localhost:8000/files`)
  const dto: FilesResponseDto = await response.json()
  return dto.dataItems
}

export async function createFile(
  dto: CreateFileDto
): Promise<CreateFileResponseDto> {
  const { name, type, file } = dto
  const formData = new FormData()
  formData.append('name', name)
  formData.append('type', type)
  formData.append('file', file)
  const response = await fetch(`http://localhost:8000/files`, {
    method: 'POST',
    body: formData,
  })
  return await response.json()
}

export async function deleteFile(id: string): Promise<Boolean> {
  const response = await fetch(`http://localhost:8000/files/${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return !!data
}
