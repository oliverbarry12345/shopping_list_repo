import { useMutation } from "react-relay";
import { updateItemMutation } from "../graphql/mutations/updateItemMutation";
import type { AppUpdateItemMutation } from "../graphql/mutations/__generated__/AppUpdateItemMutation.graphql";

type UpdateItemArgs = {
  refreshQuery: () => void;
  editItemName: string;
  editCategoryID: string;
  cancelEditing: () => void;
};

export function useUpdateItem({
  refreshQuery,
  editItemName,
  editCategoryID,
  cancelEditing,
}: UpdateItemArgs) {

  const [commitUpdateItem, isUpdateItemInFlight] =
    useMutation<AppUpdateItemMutation>(updateItemMutation);

  const saveEditedItem = (itemID: number) => {
    const itemName = editItemName.trim();
    const categoryID = Number(editCategoryID);

    if (!itemName || !categoryID) {
      alert("Item name and category are required.");
      return;
    }

    commitUpdateItem({
      variables: {
        itemID,
        itemName,
        categoryID,
      },

      onCompleted: () => {
        cancelEditing();
        refreshQuery();
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };

  return {
    saveEditedItem,
    isUpdateItemInFlight,
  };
}