import {
  CreateFileDto,
  CreateFileResponseDto,
  CSVFile,
  FilesResponseDto,
} from '@/entities/CSVFile'

export async function getAllFiles(): Promise<CSVFile[]> {
  const response = await fetch(`https://pear-grasshopper-belt.cyclic.app/files`)
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
  const response = await fetch(
    `https://pear-grasshopper-belt.cyclic.app/files`,
    {
      method: 'POST',
      body: formData,
    }
  )
  const res = await response.json()
  if (response.status !== 201) {
    throw new Error('Failed to upload file')
  } else {
    return res
  }
}

export async function deleteFile(id: string): Promise<boolean> {
  const response = await fetch(
    `https://pear-grasshopper-belt.cyclic.app/files/${id}`,
    {
      method: 'DELETE',
    }
  )
  const data = await response.json()
  return !!data
}
