"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, { useState } from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function createTeam() {
  const[teamName,setTeamname]=useState('')
  const createTeam=useMutation(api.teams.createTeam);
  const {user}:any = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam=()=>{
    createTeam({
      teamName:teamName,
      createdBy:user?.email
    }).then(resp=>{
      console.log(resp);
      if(resp){
        router.push('/dashboard')
        toast('Team created successfully!!')
      }
    })
  }
  return (
    <div className='px-10 md:px-16 my-16'>
      <img src="/logo.svg" alt="logo" width={300} height={300}/>
      <div className='flex flex-col items-center mt-8'>
        <h2 className='font-bold text-[40px] py-3'>What should we call your team?</h2>
        <h2 className='text-gra'>You can always change this later froms setting</h2>
        <div className='mt-7 w-[40%]'>
          <label className='text-gray-500'>Team name</label>
          <Input placeholder='Team name' className='mt-3' onChange={(e)=>setTeamname(e.target.value)} />
        </div>
        <Button className='bg-blue-500 mt-9 w-[30%] hover:bg-blue-700 cursor' disabled={!(teamName&&teamName?.length>0)} 
          onClick={()=>createNewTeam()}>Create team</Button>
      </div>
    </div>
  )
}

export default createTeam
