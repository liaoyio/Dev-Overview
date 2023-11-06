'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const GlobalSerach = () => {
  const [val, setVal] = useState('')
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient flex min-h-[45px] grow items-center gap-1 rounded-xl px-4">
        <Search size={20} className="cursor-pointer text-light-500" />
        <Input
          type="text"
          placeholder="Search Globally..."
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  )
}

export default GlobalSerach
