import { graphql } from "react-relay";

export const shoppingListFragment = graphql`
  fragment ShoppingList_query on Query {
    items {
      itemID
      itemName
      bought
      category {
        categoryID
        categoryName
      }
      ...ShoppingItem_item
    }
  }
`;