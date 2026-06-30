import { useMutation } from "react-relay";
import { deleteItemMutation } from "../graphql/mutations/deleteItemMutation";
import type { AppDeleteItemMutation } from "../graphql/mutations/__generated__/AppDeleteItemMutation.graphql";

type DeleteItemArgs = {
  refreshQuery: () => void;
};

export function useDeleteItem({ refreshQuery }: DeleteItemArgs) {
  const [commitDeleteItem, isDeleteItemInFlight] =
    useMutation<AppDeleteItemMutation>(deleteItemMutation);

  const handleDeleteItem = (itemID: number) => {
    commitDeleteItem({
      variables: {
        itemID,
      },

      onCompleted: (response: AppDeleteItemMutation["response"]) => {
        if (response.deleteItem) {
          refreshQuery();
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