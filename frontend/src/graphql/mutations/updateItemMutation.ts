import { graphql } from "react-relay"

//Relay mutation for editing/updating items. 
export const updateItemMutation = graphql`
  mutation AppUpdateItemMutation(
    $itemID: Int!
    $itemName: String!
    $categoryID: Int!
  ) {
    updateItem(itemID: $itemID, itemName: $itemName, categoryID: $categoryID) {
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