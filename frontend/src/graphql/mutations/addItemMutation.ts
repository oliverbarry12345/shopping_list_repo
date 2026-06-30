import { graphql } from "react-relay"

// Relay mutation here implements the addItem function through GraphQL. 
export const addItemMutation = graphql`
  mutation AppAddItemMutation($itemName: String!, $categoryID: Int!) {
    addItem(itemName: $itemName, categoryID: $categoryID) {
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