import { useMutation } from "react-relay";
import type { Item, Category } from "../types/shoppingTypes";
import { addItemsFromFileMutation } from "../graphql/mutations/addItemsFromFileMutation";
import type { AppAddItemsFromFileMutation } from "../graphql/mutations/__generated__/AppAddItemsFromFileMutation.graphql";


type UploadTextFileArgs = {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedFile: File | null;
  categories: readonly Category[];
};

export function useUploadTextFile({
  setItems,
  selectedFile,
  categories,
}: UploadTextFileArgs) {
  const [commitAddItemsFromFile, isUploadTextFileInFlight] =
    useMutation<AppAddItemsFromFileMutation>(addItemsFromFileMutation);

  const uploadTextFile = () => {
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;

      const lines = text
        .split("\n")
        .filter((line) => line.trim() !== "");

      const parsedItems = lines
        .map((line) => {
          const [itemName, categoryName] = line.split(",");

          const category = categories.find(
            (category) =>
              category.categoryName.trim() === categoryName.trim()
          );

          if (!category) {
            return null;
          }

          return {
            itemName: itemName.trim(),
            categoryID: category?.categoryID,
          };
        })
        .filter(
          (item): item is { itemName: string; categoryID: number } =>
          item !== null
        );

      commitAddItemsFromFile({
        variables: {
          items: parsedItems,
        },

        onCompleted: (response: AppAddItemsFromFileMutation["response"]) => {
          setItems((currentItems) => [
            ...currentItems,
            ...response.addItemsFromFile,
          ]);
        },

        onError: (error) => {
          console.error(error);
        },
      });
    };

    reader.readAsText(selectedFile);
  };

  return {
    uploadTextFile,
    isUploadTextFileInFlight,
  };
}