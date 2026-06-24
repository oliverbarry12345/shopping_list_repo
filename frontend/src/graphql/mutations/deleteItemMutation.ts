import { graphql } from "react-relay"

//Relay mutation for deleteItem. 
export const deleteItemMutation = graphql`
  mutation AppDeleteItemMutation($itemID: Int!) {
    deleteItem(itemID: $itemID)
  }
`;