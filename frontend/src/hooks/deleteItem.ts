import { commitMutation } from "react-relay";
import type { Environment } from "relay-runtime";
import type { Item } from "../types/shoppingTypes";
import { deleteItemMutation } from "../graphql/mutations/deleteItemMutation";

type DeleteItemArgs = {
  environment: Environment;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function createDeleteItemHandler({
  environment,
  setItems,
}: DeleteItemArgs) {
  return function handleDeleteItem(itemID: number) {
    commitMutation(environment, {
      mutation: deleteItemMutation,
      variables: {
        itemID,
      },
      onCompleted: (response: any) => {
        if (response.deleteItem) {
          setItems((currentItems) =>
            currentItems.filter((item) => item.itemID !== itemID)
          );
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
}