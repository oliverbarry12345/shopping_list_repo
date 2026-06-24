import { graphql } from "react-relay"

//Relay mutation to send file input to GraphQl
export const addItemsFromFileMutation = graphql`
  mutation AppAddItemsFromFileMutation($items: [FileItemInput!]!) {
    addItemsFromFile(items: $items) {
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