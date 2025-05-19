// src/hooks/useTitle.js
import { useEffect } from "react";

const useTitle = (title: string): void => {
  useEffect(() => {
    if (title) {
      document.title = "Jolaman | " + title;
    }
  }, [title]);
};

export default useTitle;
