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
import { useToast } from '@/components/ui/use-toast'
import { deleteFile } from '@/events/file.events'
import { useFileStore } from '@/stores/file.store'
import { Loader2, Trash } from 'lucide-react'
import * as React from 'react'

interface AreYouSureProps {
  rowId: string
}

export function DeleteModal({ rowId }: AreYouSureProps) {
  const { files, setFiles } = useFileStore()
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsDeleting(true)
    if (await deleteFile(rowId)) {
      setFiles(files.filter(file => file.id !== rowId))
      toast({
        title: 'Deleted file',
      })
      setOpen(false)
    } else {
      toast({
        title: 'Failed to delete file',
        variant: 'destructive',
      })
    }
    setIsDeleting(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isDeleting ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleDelete}>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
