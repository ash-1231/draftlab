"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { FILE } from "../../dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>([]);
  const whiteboardRef = useRef<any>([]); // ✅ FIX (always latest)

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  // 🧠 Extract text from canvas
const extractCanvasText = () => {
  const elements = whiteboardRef.current || [];

  const texts = elements
    .filter((el: any) => el.type === "text" && el.text)
    .map((el: any) => el.text);

  return texts.join(", ");
};

// 🤖 Summarize canvas using AI
const summarizeCanvas = async () => {
  const canvasText = extractCanvasText();

  if (!canvasText) {
    alert("No text found on canvas");
    return;
  }

  const res = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({
      prompt: `Summarize this diagram:\n${canvasText}`,
    }),
  });

  const data = await res.json();

  alert("Canvas Summary:\n" + data.result);
};

  const defaultElements = [
  
  // TEACHERS BOX
  {
    id: "teachers-box",
    type: "rectangle",
    x: 115,
    y: 180,
    width: 160,
    height: 60,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    roughness: 1,
    opacity: 100,
    seed: 1,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
  },
 {
  id: "teachers-text",
  type: "text",
  x: 140,
  y: 200,
  text: "Teachers",
  fontSize: 20,
  fontFamily: 1,
  textAlign: "center",
  verticalAlign: "middle",
  strokeColor: "#000000",
  width: 120,
  height: 24,
  seed: 2,
  version: 1,
  versionNonce: 1,
  isDeleted: false,
},

  // STUDENTS BOX
  {
    id: "students-box",
    type: "rectangle",
    x: 525,
    y: 180,
    width: 160,
    height: 60,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    roughness: 1,
    opacity: 100,
    seed: 3,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
  },
 {
  id: "students-text",
  type: "text",
  x: 550,
  y: 200,
  text: "Students",
  fontSize: 20,
  fontFamily: 1,
  textAlign: "center",
  verticalAlign: "middle",
  strokeColor: "#000000",
  width: 120,
  height: 24,
  seed: 4,
  version: 1,
  versionNonce: 1,
  isDeleted: false,
},

  // RELATION DIAMOND (ROTATED RECTANGLE)
  {
    id: "relation-diamond",
    type: "rectangle",
    x: 340,
    y: 150,
    width: 120,
    height: 120,
    angle: Math.PI / 4, // 🔥 makes diamond
    strokeColor: "#000000",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    roughness: 1,
    opacity: 100,
    seed: 5,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
  },
{
  id: "relation-text",
  type: "text",
  x: 340,
  y: 200,
  text: "Teaches",
  fontSize: 18,
  fontFamily: 1,
  textAlign: "center",
  verticalAlign: "middle",
  strokeColor: "#000000",
  width: 120,
  height: 24,
  seed: 6,
  version: 1,
  versionNonce: 1,
  isDeleted: false,
},

  // LEFT LINE
  {
    id: "line-left",
    type: "line",
    x: 275,
    y: 210,
    width: 40,
    height: 0,
    strokeColor: "#000000",
    strokeWidth: 2,
    roughness: 1,
    opacity: 100,
    seed: 7,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    points: [[0, 0], [40, 0]],
  },

  // RIGHT LINE
  {
    id: "line-right",
    type: "line",
    x: 485,
    y: 210,
    width: 40,
    height: 0,
    strokeColor: "#000000",
    strokeWidth: 2,
    roughness: 1,
    opacity: 100,
    seed: 8,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    points: [[0, 0], [40, 0]],
  },

  // MULTIPLICITY *
{
  id: "star-left",
  type: "text",
  x: 240,
  y: 130,
  text: "*",
  fontSize: 20,
  fontFamily: 1,
  strokeColor: "#000000",
},
  {
    id: "star-right",
    type: "text",
    x: 400,
    y: 130,
    text: "*",
    fontSize: 18,
    fontFamily: 1,
    strokeColor: "#000000",
    seed: 10,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
  },
]


  // ✅ Save trigger
  useEffect(() => {
    if (!onSaveTrigger) return;

    console.log("🚀 Save triggered");

    if (!fileId) {
      console.log("❌ fileId missing");
      return;
    }

    console.log("Saving data:", whiteboardRef.current);

    updateWhiteboard({
      _id: fileId as any,
      whiteboard: JSON.stringify(whiteboardRef.current), // ✅ FIX
    }).then((resp) => console.log("✅ Saved:", resp));
  }, [onSaveTrigger]);

  return (
  <div className="h-full w-full relative">

    {/* 🧠 AI BUTTON */}
    <div className="absolute top-16 left-2 z-3">
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded-2xl cursor-pointer hover:bg-blue-700 transition"
        onClick={summarizeCanvas}
      >
        🧠 Summarize Canvas
      </button>
    </div>

    {fileData && (
      <Excalidraw
        theme="light"
        initialData={{
          elements:
            fileData?.whiteboard && fileData.whiteboard !== "[]"
              ? JSON.parse(fileData.whiteboard)
              : defaultElements,
          appState: {
            viewBackgroundColor: "#f8fafc",
          },
        }}
        onChange={(elements, appState, files) => {
          setWhiteBoardData(elements);
          whiteboardRef.current = elements;
        }}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
          },
        }}
      />
    )}
  </div>
);
}

export default Canvas;