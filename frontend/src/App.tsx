import type { AppQuery } from "./__generated__/AppQuery.graphql";

import { graphql, useLazyLoadQuery } from "react-relay";
import shoppingList from "./shoppingList.tsx";

export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        items {
          itemID
          itemName
          bought
          category
        }
      }
    `,
    {}
  );

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <ul>
        {data.items.map((item) => (
          <li key={item.itemID}>
            {item.itemName} - {item.bought ? "Bought" : "Not Bought"} - {item.category}
          </li>
        ))}
      </ul>
    </div>
  )
};