import { graphql } from "react-relay";

export const appQuery = graphql`
  query AppQuery {
    items {
      itemID
      itemName
      bought
      category {
        categoryID
        categoryName
      }
    }

    categories {
      categoryID
      categoryName
    }
  }
`;