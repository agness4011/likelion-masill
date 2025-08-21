// src/context/AiPostsContext.js
import { createContext, useContext, useState } from "react";

// Context 생성
const AiPostsContext = createContext(null);

// Provider 컴포넌트
export function AiPostsProvider({ children }) {
  const [aiPosts, setAiPosts] = useState([]);

  return (
    <AiPostsContext.Provider value={{ aiPosts, setAiPosts }}>
      {children}
    </AiPostsContext.Provider>
  );
}

// Custom hook
export function useAiPosts() {
  const context = useContext(AiPostsContext);
  if (!context) {
    throw new Error("useAiPosts must be used within an AiPostsProvider");
  }
  return context;
}
