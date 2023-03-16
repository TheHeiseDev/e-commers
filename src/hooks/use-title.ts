import { useEffect } from "react";
export const useTitle = (title: string | undefined) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};
