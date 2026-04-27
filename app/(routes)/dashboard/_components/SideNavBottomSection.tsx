"use client"

import { Button } from '@/components/ui/button'
import { Archive, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Constant from '@/app/_constant/Constant'
import PricingDialog from './PricingDialog'

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {

  const [fileInput, setFileInput] = useState('')
  const [openCreate, setOpenCreate] = useState(false)
  const [openPricing, setOpenPricing] = useState(false)

  const isLimitReached = (totalFiles ?? 0) >= Constant.MAX_FREE_FILE
  const progress = ((totalFiles ?? 0) / Constant.MAX_FREE_FILE) * 100

  const handleNewFileClick = () => {
    if (isLimitReached) {
      setOpenPricing(true)
    } else {
      setOpenCreate(true)
    }
  }

  return (
    <div>

      {/* Menu */}
      <div className='space-y-1'>
        <div className='flex gap-2 p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer'>
          <Github className='h-5 w-5' /> Github
        </div>
        <div className='flex gap-2 p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer'>
          <Archive className='h-5 w-5' /> Archive
        </div>
      </div>

      {/* New File Button */}
      <Button
        onClick={handleNewFileClick}
        className={`w-full mt-3 justify-start cursor-pointer ${
          isLimitReached
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-500 hover:bg-teal-600'
        }`}
      >
        New File
      </Button>

      {/* Create File Dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
          </DialogHeader>

          <Input
            placeholder='Enter File Name'
            className='mt-3'
            onChange={(e) => setFileInput(e.target.value)}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                className='bg-teal-600 hover:bg-teal-700'
                disabled={fileInput.length <= 3}
                onClick={() => {
                  onFileCreate(fileInput)
                  setFileInput('')
                }}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pricing Dialog */}
      <PricingDialog open={openPricing} setOpen={setOpenPricing} />

      {/* Progress Bar */}
      <div className='h-3 w-full bg-gray-200 rounded-full mt-5 overflow-hidden'>
        <div
          className='h-full bg-teal-600 transition-all duration-300'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Usage Info */}
      <p className='text-xs mt-3'>
        <strong>{totalFiles}</strong> out of{' '}
        <strong>{Constant.MAX_FREE_FILE}</strong> files used
      </p>

      {isLimitReached && (
        <p className='text-xs mt-1 text-red-500 font-medium'>
          Limit reached. Upgrade to continue.
        </p>
      )}

    </div>
  )
}

export default SideNavBottomSection
