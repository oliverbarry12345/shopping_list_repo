import { graphql, useFragment } from "react-relay";
import type { shoppingList_item$key } from "./__generated__/shoppingList_item.graphql";

export default function shoppingListItem(props: { item: shoppingList_item$key; }) {
  const shoppingList = useFragment<shoppingList_item$key>(
    graphql`
      fragment shoppingList_item on item_name {
      itemID
      itemName
      bought
      category
    }
    `,
    props.item
  );

  return (
    <li>
      <b>{shoppingList.itemName}</b>: {shoppingList.bought ? "Bought" : "Not Bought"} - {shoppingList.category}
    </li>
  );
}