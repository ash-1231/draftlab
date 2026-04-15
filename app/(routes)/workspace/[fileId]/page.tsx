"use client";

import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";
import { useParams } from "next/navigation";

function Workspace() {
  const params = useParams();

  // ✅ FIX: handle string | string[]
  const fileId = Array.isArray(params?.fileId)
    ? params.fileId[0]
    : params?.fileId;

  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | null>(null);

  // ✅ DEBUG (must print actual value)
  useEffect(() => {
    console.log("✅ FINAL FILE ID:", fileId);
  }, [fileId]);

  // ✅ FETCH DATA ONLY WHEN fileId EXISTS
  useEffect(() => {
    const fetchData = async () => {
      if (!fileId) return;

      try {
        const result = await convex.query(api.files.getFileById, {
          _id: fileId as any,
        });

        setFileData(result);
      } catch (err) {
        console.log("❌ Error fetching file:", err);
      }
    };

    fetchData();
  }, [fileId]);

  // ✅ IMPORTANT: wait until fileId exists
  if (!fileId) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <WorkspaceHeader onSave={() => setTriggerSave((prev) => !prev)} />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Editor */}
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={fileId}
            fileData={fileData}
          />
        </div>

        {/* Canvas */}
        <div className="h-screen border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;