import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideNavBottomSection from './SideNavBottomSection'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { FileListContext } from '@/app/_context/FilesListContext'

function SideNav() {

  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();

  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  const [totalFiles, setTotalFiles] = useState<number>(0);

  const { fileList_, setFileList_ } = useContext(FileListContext);

  // 🔄 Fetch files when team changes
  useEffect(() => {
    if (activeTeam) {
      getFiles();
    }
  }, [activeTeam]);

  // 🚀 Create File (FIXED)
  const onFileCreate = async (fileName: string) => {
    try {
      // ✅ Safe fallbacks (important for Selenium / no-auth)
      const safeTeamId = activeTeam?._id || "test-team";
      const safeUser = user?.email || "test@selenium.com";

      console.log("Creating file with:", {
        fileName,
        safeTeamId,
        safeUser
      });

      const resp = await createFile({
        fileName: fileName,
        teamId: safeTeamId,
        createdBy: safeUser,
        archive: false,
        document: '',
        whiteboard: ''
      });

      if (resp) {
        await getFiles();
        toast('File created successfully!');

        // 🔥 Redirect to workspace
        window.location.href = `/workspace/${resp}`;
      }

    } catch (e) {
      console.error(e);
      toast('Error while creating file');
    }
  };

  // 📂 Get Files (FIXED)
  const getFiles = async () => {
    try {
      const safeTeamId = activeTeam?._id || "test-team";

      const result = await convex.query(api.files.getFiles, {
        teamId: safeTeamId
      });

      console.log("Fetched Files:", result);

      setFileList_(result || []);
      setTotalFiles(result?.length || 0);

    } catch (e) {
      console.error(e);
      setFileList_([]);
      setTotalFiles(0);
    }
  };

  return (
    <div
      className='h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col'
    >
      <div className='flex-1'>
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  )
}

export default SideNav