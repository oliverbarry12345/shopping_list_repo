import { graphql } from "react-relay";

export const appQuery = graphql`
  query AppQuery {
    ...ShoppingList_query

    categories {
      categoryID
      categoryName
      ...Category_category
    }
  }
`;