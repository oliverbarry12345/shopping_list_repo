import { useMutation } from "react-relay";
import type { Item } from "../types/shoppingTypes";
import { deleteItemMutation } from "../graphql/mutations/deleteItemMutation";
import type { AppDeleteItemMutation } from "../graphql/mutations/__generated__/AppDeleteItemMutation.graphql";


type DeleteItemArgs = {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export function useDeleteItem({ setItems }: DeleteItemArgs) {
  const [commitDeleteItem, isDeleteItemInFlight] =
    useMutation<AppDeleteItemMutation>(deleteItemMutation)

  const handleDeleteItem = (itemID: number) => {
    commitDeleteItem({
      variables: {
        itemID,
      },

      onCompleted: (response: AppDeleteItemMutation["response"]) => {
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

  return {
    handleDeleteItem,
    isDeleteItemInFlight,
  };
}