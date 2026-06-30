import { graphql } from "react-relay";

export const shoppingItemFragment = graphql`
  fragment ShoppingItem_item on item_name {
    itemID
    itemName
    bought
    category {
      categoryID
      categoryName
    }
  }
`;