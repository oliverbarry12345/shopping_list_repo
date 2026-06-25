import { commitMutation } from "react-relay";
import type { Environment } from "relay-runtime";
import type { Item } from "../types/shoppingTypes";
import { addItemMutation } from "../graphql/mutations/addItemMutation";

type AddItemArgs = {
  environment: Environment;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  newItemName: string;
  setNewItemName: React.Dispatch<React.SetStateAction<string>>;
  newCategoryID: string;
  setNewCategoryID: React.Dispatch<React.SetStateAction<string>>;
};

export function createAddItemHandler({
  environment,
  setItems,
  newItemName,
  setNewItemName,
  newCategoryID,
  setNewCategoryID,
}: AddItemArgs) {
  return function handleAddItem() {
    const itemName = newItemName.trim();
    const categoryID = Number(newCategoryID);

    if (!itemName || !categoryID) {
      alert("Item name and category are required.");
      return;
    }

    commitMutation(environment, {
      mutation: addItemMutation,
      variables: {
        itemName,
        categoryID,
      },
      onCompleted: (response: any) => {
        const newItem: Item = response.addItem;

        setItems((currentItems) => [...currentItems, newItem]);

        setNewItemName("");
        setNewCategoryID("");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
}