import { createContext } from "react";

export const FileListContext=createContext<any>(undefined);

// export const FileListContext = createContext({
//   fileList_: [],
//   setFileList_: () => {},
//   onFileCreate: () => {}, // ✅ ADD THIS
// });