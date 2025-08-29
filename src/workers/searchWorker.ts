import type { User } from "../api/apiUserSlice";

export type SearchMessage = {
  type: "search";
  query: string;
  users: User[];
};

self.onmessage = (event: MessageEvent<SearchMessage>) => {
  const { query, users } = event.data;
  console.log(JSON.stringify(event), "worker");
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
  // Send the filtered results back to main thread.
  self.postMessage(filtered || users);
};

export {};
