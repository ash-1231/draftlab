"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";

function Editor({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const editorRef = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);

  const callAI = async (prompt: string) => {
  const res = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.result;
};

  // ✅ INIT EDITOR (SAFE WAY)
  useEffect(() => {
    if (!fileData) return;

    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }

    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      data: fileData?.document
  ? JSON.parse(fileData.document)
  : {
      blocks: [
        {
          type: "header",
          data: {
            text: "Start writing your document...",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "You can add headings, lists, checklists and more 🚀",
          },
        },
      ],
    },
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
        paragraph: Paragraph,
        warning: Warning,
      },
    });

    editorRef.current = editor;

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, [fileData]);

  // ✅ SAVE HANDLER
  useEffect(() => {
    if (!onSaveTrigger || !editorRef.current) return;

    editorRef.current
      .save()
      .then((outputData) => {

        console.log("Saving document with fileId:", fileId);
        updateDocument({
          _id: fileId as any,
          document: JSON.stringify(outputData),
        }).then(
          () => toast("Document Updated!"),
          () => toast("Server Error!")
        );
      })
      .catch((error) => console.log(error));
  }, [onSaveTrigger]);

  return (
    <div className="p-5">

  {/* 🔥 AI BUTTON */}
  <div className="flex gap-2 mb-3">
    <button
      className="bg-purple-600 text-white px-3 py-1 rounded-2xl cursor-pointer hover::bg-purple-700 transition"
      onClick={async () => {
        if (!editorRef.current) return;

        const content = await editorRef.current.save();

        const prompt = `Summarize this content:\n${JSON.stringify(content)}`;

        const result = await callAI(prompt);

        console.log("AI Result:", result);

        // 👉 Insert AI result back into editor
        editorRef.current.render({
          blocks: [
            {
              type: "paragraph",
              data: { text: result },
            },
          ],
        });
      }}
    >
      ✨ Summarize
    </button>
  </div>

  <div id="editorjs" className="min-h-[800px] bg-white rounded-lg shadow-sm p-4"></div>
</div>
  );
}

export default Editor;