import { useEffect, useRef, useState } from "react";
import type { User } from "../api/apiUserSlice";
import Worker from "../workers/searchWorker?worker"; // Vite syntax

export const useSearchWorker = (users: User[] = []) => {
  console.log(users, "best");
  const workerRef = useRef<Worker>(null);
  const [results, setResults] = useState<User[]>(users);

  useEffect(() => {
    workerRef.current = new Worker();
    workerRef.current.onmessage = (e: MessageEvent<User[]>) => {
      setResults(e.data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    if (users?.length) {
      setResults(users); // initialize results with all users
    }
  }, [users]);

  const search = (query: string) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: "search",
        query,
        users,
      });
    }
  };

  return { results, search };
};
