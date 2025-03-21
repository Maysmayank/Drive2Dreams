"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function GSheetButton() {
    const router=useRouter()
  return (
    <div>
    <button className='bg-green-500 font-semibold  px-4 md:rounded-full py-2 hover:bg-green-600' onClick={()=>router.push('https://docs.google.com/spreadsheets/d/15iKQUItOFyWpotw-Ujl93GsJ__mNuKTVK0-MgkOO6lw/edit?gid=0#gid=0')}>Check Google Sheets</button>
    </div>
  )
}

export default GSheetButton
