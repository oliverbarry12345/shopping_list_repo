import { commitMutation } from "react-relay";
import type { Environment } from "relay-runtime";
import type { Item, Category } from "../types/shoppingTypes";
import { addItemsFromFileMutation } from "../graphql/mutations/addItemsFromFileMutation";

type UploadTextFileArgs = {
  environment: Environment;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedFile: File | null;
  categories: readonly Category[];
};

export function createUploadTextFileHandler({
  environment,
  setItems,
  selectedFile,
  categories,
}: UploadTextFileArgs) {
  return function uploadTextFile() {
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

          return {
            itemName: itemName.trim(),
            categoryID: category?.categoryID,
          };
        })
        .filter((item) => item.categoryID !== undefined);

      commitMutation(environment, {
        mutation: addItemsFromFileMutation,
        variables: {
          items: parsedItems,
        },
        onCompleted: (response: any) => {
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
}