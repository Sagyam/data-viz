import { DatasetTable } from '@/components/DataTable'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-y-8 py-16 px-32">
      <ThemeSwitch />
      {/* <ModeSwitcher /> */}
      <DatasetTable />
    </main>
  )
}

export default HomePage
