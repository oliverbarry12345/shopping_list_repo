import { graphql } from "react-relay"

// Relay mutation here updates the bought status through GraphQL. 
export const toggleBoughtMutation = graphql`
  mutation AppToggleBoughtMutation($itemID: Int!, $bought: Boolean!) {
    toggleBought(itemID: $itemID, bought: $bought) {
      itemID
      itemName
      bought
      category {
        categoryID
        categoryName
      }
    }
  }
`;