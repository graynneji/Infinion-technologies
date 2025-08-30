import type { User } from "../api/apiUserSlice";
//I am using a web worker to handle the search functionality in a separate thread to keep the UI responsive.
//since there no pagination in the api from the backend, performing search on large data set in the main thread can cause UI to freeze.
//This worker listens for search messages, filters the user list based on the query, and sends the results back to the main thread.
export type SearchMessage = {
  type: "search";
  query: string;
  users: User[];
};
//recieving message to be worked on from main thread.
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
