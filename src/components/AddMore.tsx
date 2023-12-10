import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { CreateFileDto } from '@/entities/CSVFile'
import { createFile, getAllFiles } from '@/events/file.events'
import { useFileStore } from '@/stores/file.store'
import { Loader2, Plus } from 'lucide-react'
import React from 'react'

export function AddMoreDialog() {
  const [file, setFile] = React.useState<File | null>(null)
  const [name, setName] = React.useState<string>('')
  const [datasetType, setDatasetType] = React.useState<string>('')
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const { setFiles } = useFileStore()
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const setToast = (message: string) =>
    toast({
      variant: 'destructive',
      title: message,
    })

  const validateForm = () => {
    if (name === '') {
      setToast('Name is required')
      return false
    }
    if (datasetType === '') {
      setToast('Dataset Type is required')
      return false
    }
    if (file === null) {
      setToast('File is required')
      return false
    }
    if (file.type !== 'text/csv') {
      setToast('Please choose a CSV file.')
      return false
    }
    if (file.size > 1024 * 1024) {
      setToast('File size should be less than 1MB.')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    const dto: CreateFileDto = {
      name: name,
      type: datasetType,
      file: file as File,
    }
    setIsSubmitting(true)
    try {
      await createFile(dto)
      setOpen(false)
      getAllFiles().then(files => setFiles(files))
    } catch (error) {
      setToast('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Add new dataset</DialogTitle>
          <DialogDescription>
            Make sure it is a CSV file with the correct format.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              required
              className="col-span-3"
              onChange={event => setName(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dataset-type" className="text-right">
              Type
            </Label>
            <Select required onValueChange={value => setDatasetType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Visualization Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area-chart">Area Chart</SelectItem>
                <SelectItem value="bar-chart">Bar Chart</SelectItem>
                <SelectItem value="bar-chart-stacked">
                  Bar Chart Stacked
                </SelectItem>
                <SelectItem value="box-plot">Box Plot</SelectItem>
                <SelectItem value="clustering">Clustering</SelectItem>
                <SelectItem value="line-chart">Line Chart</SelectItem>
                <SelectItem value="pie-chart">Pie Chart</SelectItem>
                <SelectItem value="regression">Regression</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input
              id="file"
              type="file"
              required
              className="col-span-3"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          {isSubmitting && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
          {!isSubmitting && (
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
