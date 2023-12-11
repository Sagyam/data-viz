'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { useFileStore } from '@/stores/file.store'
import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

export function DatasetSelector() {
  const [open, setOpen] = React.useState(false)
  const { files, selectedFile, setSelectedFile } = useFileStore()

  const handleSelectionChange = (currentValue: string) => {
    const selectedFile = files.find(file => file.id === currentValue)
    if (selectedFile) {
      setSelectedFile(selectedFile)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedFile
            ? files.find(file => file.name === selectedFile.name)?.name
            : 'Select Dataset to  Visualize'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command>
          <CommandInput placeholder="Search dataset..." />
          <CommandEmpty>No dataset found.</CommandEmpty>
          <CommandGroup>
            {files.length > 0 &&
              files.map(file => (
                <CommandItem
                  key={file.id}
                  value={file.id}
                  onSelect={currentValue => handleSelectionChange(currentValue)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedFile?.name === file.name
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {file.name} - {file.type}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
