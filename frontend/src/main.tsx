import type { FetchFunction } from "relay-runtime";

import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, Network } from "relay-runtime";

const HTTP_ENDPOINT = "http://localhost/shopping_list/backend/graphql.php";
// fetchGraphQL is the link to backend, sending graphql queries and mutations, and receiving responses.
const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  });

  const text = await resp.text();
  console.log("Raw GraphQL response:", text);

  return JSON.parse(text);
};

const environment = new Environment({
  network: Network.create(fetchGraphQL),
});
// here the app is rendered. suspense provides the loading screen. 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="Loading..."> 
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  </StrictMode>
);
