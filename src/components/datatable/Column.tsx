import { DeleteModal } from '@/components/DeleteModal'
import { TooltipWrapper } from '@/components/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { CSVFile } from '@/entities/CSVFile'
import { getTimeFromNow } from '@/utils/date'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Download } from 'lucide-react'
import React from 'react'

export const columns: ColumnDef<CSVFile>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="max-w-xs capitalize text-ellipsis overflow-hidden ...">
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Dataset Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('type')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <TooltipWrapper
          hoverText={getTimeFromNow(row.getValue('createdAt'))}
          tooltipText={row.getValue('createdAt')}
        />
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <>
          <DeleteModal rowId={row.original.id} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              window.open(row.original.url, '_blank')
            }}
          >
            <Download className="w-5 h-5" />
          </Button>
        </>
      )
    },
  },
]
