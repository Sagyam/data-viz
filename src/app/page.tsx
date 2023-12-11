import { DatasetSelector } from '@/components/DatasetSelector'
import { ModeSwitcher } from '@/components/ModeSwitcher'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <main className="flex flex-col">
      <div className="flex flex-row justify-between">
        <DatasetSelector />
        <ThemeSwitch />
      </div>
      <ModeSwitcher />
    </main>
  )
}

export default HomePage
