"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'
import Header from './_components/Header'
import FileList from './_components/FileList'
import AdBanner from './../../_components/AdBanner'
import { useState } from 'react'

function Dashboard() {

const convex = useConvex();
const { user }: any = useKindeBrowserClient();

const [searchQuery, setSearchQuery] = useState('');

// ✅ DEV BYPASS USER (MOST IMPORTANT FIX)
const currentUser = process.env.NODE_ENV === "development"
? {
email: "[test@gmail.com](mailto:test@gmail.com)",
given_name: "Test User",
picture: ""
}
: user;

// ✅ SAFE QUERY (no crash now)
const getUser = useQuery(api.user.getUser, {
email: currentUser?.email || "[test@gmail.com](mailto:test@gmail.com)"
});

const createUser = useMutation(api.user.createUser);

useEffect(() => {
if (currentUser) {
checkUser();
}
}, [currentUser]);

const checkUser = async () => {
const result = await convex.query(api.user.getUser, {
email: currentUser?.email || "[test@gmail.com](mailto:test@gmail.com)"
});


if (!result?.length) {
  createUser({
    name: currentUser.given_name,
    email: currentUser.email,
    image: currentUser.picture
  }).then((resp) => {
    console.log(resp);
  });
}


}

return ( <div className='p-8'> 

   <Header 
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
   />


  <FileList searchQuery={searchQuery} />

  <AdBanner
    data-ad-slot="4796371341"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
</div>


)
}

export default Dashboard
