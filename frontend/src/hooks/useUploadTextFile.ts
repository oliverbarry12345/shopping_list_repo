import { useMutation } from "react-relay";
import { addItemsFromFileMutation } from "../graphql/mutations/addItemsFromFileMutation";
import type { AppAddItemsFromFileMutation } from "../graphql/mutations/__generated__/AppAddItemsFromFileMutation.graphql";
import type { AppQuery } from "../graphql/queries/__generated__/AppQuery.graphql";

type UploadTextFileArgs = {
  refreshQuery: () => void;
  selectedFile: File | null;
  categories: AppQuery["response"]["categories"];
};

export function useUploadTextFile({
  refreshQuery,
  selectedFile,
  categories,
}: UploadTextFileArgs) {
  const [commitAddItemsFromFile, isUploadTextFileInFlight] =
    useMutation<AppAddItemsFromFileMutation>(addItemsFromFileMutation);

  const uploadTextFile = () => {
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        console.error("File could not be read as text")
        return;
      }

      const text = reader.result;

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

        onCompleted: () => {
          refreshQuery();
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