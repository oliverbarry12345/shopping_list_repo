import type { AppQuery } from "./graphql/queries/__generated__/AppQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
import { useState } from "react";

//importing styledComponents
import * as Styled from "./styles/styledComponents.ts";

//importing the components
import FilterSection from "./components/filterSection";
import AddSection from "./components/addSection";
import ImportSection from "./components/importSection";
import ShoppingList from "./components/shoppingList";

//imoorting the queries
import { appQuery } from "./graphql/queries/appQuery";

//importing the hooks
import { useDeleteItem } from "./hooks/useDeleteItem";
import { useToggleBought } from "./hooks/useToggleBought";
import { useClearBoughtItems } from "./hooks/useClearBoughtItems";
import { useAddItem } from "./hooks/useAddItem";
import { useUpdateItem } from "./hooks/useUpdateItem";
import { useUploadTextFile } from "./hooks/useUploadTextFile";
import { createEditItemHandlers } from "./hooks/editItem";

//App's main jobs are making calls to the backend and rendering the 
export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const data = useLazyLoadQuery<AppQuery>(
    appQuery,
    {},
    {
      fetchKey: refreshKey,
      fetchPolicy: "store-and-network",
    }
  );

  //function to fetch shopping list data again; to refresh. 
  const refreshQuery = () => {
    setRefreshKey((current) => current + 1);
  };

  const [newItemName, setNewItemName] = useState("");
  const [newCategoryID, setNewCategoryID] = useState("");

  const [editingItemID, setEditingItemID] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [editCategoryID, setEditCategoryID] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //Mutation hooks
  const { toggleBought } = useToggleBought({ refreshQuery });

  const { clearBoughtItems } = useClearBoughtItems({ refreshQuery });

  const { handleAddItem } = useAddItem({
    refreshQuery,
    newItemName,
    setNewItemName,
    newCategoryID,
    setNewCategoryID,
  });

  const { handleDeleteItem } = useDeleteItem({ refreshQuery });

  const { startEditing, cancelEditing } = createEditItemHandlers({
    setEditingItemID,
    setEditItemName,
    setEditCategoryID,
  });

  //item editing helpers
  const { saveEditedItem } = useUpdateItem({
    refreshQuery,
    editItemName,
    editCategoryID,
    cancelEditing,
  });

  const { uploadTextFile } = useUploadTextFile({
    refreshQuery,
    selectedFile,
    categories: data.categories,
  });

  return (
    <Styled.Container>
      <Styled.Header>
        <h1>Shopping List</h1>
      </Styled.Header>

      <Styled.MainSection>
        <Styled.ColumnHeader>
          <span>Item</span>
          <span>Bought</span>
          <span>Category</span>
          <span>Actions</span>
        </Styled.ColumnHeader>

        <FilterSection
          categories={data.categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchText={searchText}
          setSearchText={setSearchText}
          clearBoughtItems={clearBoughtItems}
        />

        <ShoppingList
          query={data}
          categories={data.categories}
          selectedCategory={selectedCategory}
          searchText={searchText}
          editingItemID={editingItemID}
          editItemName={editItemName}
          setEditItemName={setEditItemName}
          editCategoryID={editCategoryID}
          setEditCategoryID={setEditCategoryID}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          saveEditedItem={saveEditedItem}
          toggleBought={toggleBought}
          handleDeleteItem={handleDeleteItem}
        />
      </Styled.MainSection>

      <AddSection
        categories={data.categories}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        newCategoryID={newCategoryID}
        setNewCategoryID={setNewCategoryID}
        handleAddItem={handleAddItem}
      />

      <ImportSection
        setSelectedFile={setSelectedFile}
        uploadTextFile={uploadTextFile}
      />
    </Styled.Container>
  );
}