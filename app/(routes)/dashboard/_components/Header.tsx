'use client'
import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Plus } from 'lucide-react'
import Image from 'next/image'
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

function Header({ searchQuery, setSearchQuery ,totalFiles,onFileCreate}: any) {
    const { user }: any = useKindeBrowserClient();
    const [fileInput, setFileInput] = useState('');

    return (
        <div className='flex justify-between items-center w-full px-6 py-4 bg-white border-b'>

            {/* LEFT */}
            <div>
                <h1 className='text-xl font-semibold'>All Files</h1>
                <p className='text-sm text-gray-500'>Manage your documents</p>
            </div>

            {/* CENTER SEARCH */}
            <div className='hidden md:flex items-center gap-2 border rounded-4xl px-3 py-1.5 bg-gray-50 w-80'>
                <Search className='h-4 w-4 text-gray-500' />
                <input
                    type='text'
                    placeholder='Search files...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='bg-transparent outline-none text-sm w-full'
                />
            </div>

            {/* RIGHT */}
            <div className='flex items-center gap-3'>

                {/* NEW FILE BUTTON WITH DIALOG */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='flex items-center gap-x-0.5 bg-teal-500 hover:bg-teal-600 cursor-pointer rounded-2xl'>
                            <Plus className='h-4 w-4 gap-0' />
                            New File
                        </Button>
                    </DialogTrigger>

                    {(totalFiles ?? 0) < Constant.MAX_FREE_FILE ? (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New File</DialogTitle>
                                <DialogDescription>
                                    <Input
                                        placeholder='Enter File Name'
                                        className='mt-3'
                                        onChange={(e) => setFileInput(e.target.value)}
                                    />
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        className='bg-teal-600 hover:bg-teal-700 cursor-pointer'
                                        disabled={!(fileInput && fileInput.length > 3)}
                                        onClick={() => onFileCreate(fileInput)}
                                    >
                                        Create
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    ) : (
                        <PricingDialog />
                    )}
                </Dialog>

                {/* USER IMAGE */}
                <Image
                    src={user?.picture || '/fallback.png'}
                    alt='user'
                    width={35}
                    height={35}
                    className='rounded-full'
                />
            </div>

        </div>
    )
}

export default Header