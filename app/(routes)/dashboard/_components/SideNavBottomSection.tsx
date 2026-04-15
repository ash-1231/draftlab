import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Constant from '@/app/_constant/Constant'
import PricingDialog from './PricingDialog'
function SideNavBottomSection({onFileCreate,totalFiles}:any) {
  const menuList=[
    
    {
      id:2,
      name:'Github',
      icon:Github,
      path:''
    },
    {
      id:3,
      name:'Archive',
      icon:Archive,
      path:''
    }
  ]
  const [fileInput,setFileInput]=useState('');
  return (
    <div>
      {menuList.map((menu,index)=>(
        <h2 key={index} className='flex gap-2 p-1 px-2 text-[14px] 
        hover:bg-gray-100 rounded-md cursor-pointer'>
          <menu.icon className='h-5 w-5'/>
          {menu.name}</h2>
      ))}

      {/* Add New File Button  */}
      <Dialog>
  <DialogTrigger className='w-full' id="newFileBtn" asChild>
  <Button className='w-full bg-teal-500 
      hover:bg-teal-600 justify-start mt-3 cursor-pointer'>New File</Button>
  </DialogTrigger>
 {(totalFiles ?? 0) < Constant.MAX_FREE_FILE ? 
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New File</DialogTitle>
      <DialogDescription>
        <Input 
          placeholder='Enter File Name' 
          className='mt-3'
          onChange={(e)=>setFileInput(e.target.value)}
        />
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button 
          type="button" 
          className='bg-teal-600 hover:bg-teal-700 cursor-pointer'
          disabled={!(fileInput && fileInput.length > 3)}
          onClick={() => onFileCreate(fileInput)}
        >
          Create
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
  :
  <PricingDialog/>
}
</Dialog>

     
      
      {/* Progress Bar  */}
      <div className='h-4 w-full bg-gray-200 rounded-full mt-5'>
          <div className={`h-4  bg-teal-600 rounded-full`}
          style={{ width: `${((totalFiles ?? 0)/5)*100}%` }}
         >
          </div>
      </div>

      <h2 className='text-[12px] mt-3'>
        <strong>{totalFiles}</strong> out of <strong>{Constant.MAX_FREE_FILE}</strong> files used</h2>
      <h2 className='text-[12px] mt-1'>Upgrade your plan for unlimited access.</h2>  

     </div>
  )
}

export default SideNavBottomSection