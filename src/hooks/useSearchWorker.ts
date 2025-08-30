import { useEffect, useRef, useState } from "react";
import type { User } from "../api/apiUserSlice";
import Worker from "../workers/searchWorker?worker";

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

  //i initiated a render when users data changes
  useEffect(() => {
    if (users?.length) {
      setResults(users);
    }
  }, [users]);

  //send message to the worker (another thread)
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
