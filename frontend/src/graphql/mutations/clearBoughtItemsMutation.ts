import { graphql } from "react-relay"

//relay mutation for clearing bought items
export const clearBoughtItemsMutation = graphql`
  mutation AppClearBoughtItemsMutation {
    clearBoughtItems
  }
`;