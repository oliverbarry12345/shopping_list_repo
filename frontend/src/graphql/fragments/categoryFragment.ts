import { graphql } from "react-relay";

export const categoryFragment = graphql`
  fragment Category_category on Category @relay(plural: true) {
    categoryID
    categoryName
  }
`;