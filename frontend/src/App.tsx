import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { useEffect, useState } from "react";
import type { Item } from "./types/shoppingTypes.ts";

//importing the styled components
import * as Styled from "./styles/styledComponents.ts";

//importing components
import StatsBar from "./components/statsBar";
import FilterSection from "./components/filterSection";
import ShoppingItem from "./components/shoppingItem"; 
import AddSection from "./components/addSection";
import ImportSection from "./components/importSection";

//importing the query 
import { appQuery } from "./graphql/queries/appQuery";

//importing the list filters
import { shoppingFilters } from "./hooks/shoppingFilters";

//importing the handlers
import { createDeleteItemHandler } from "./hooks/deleteItem";
import { createToggleBoughtHandler } from "./hooks/toggleBought.ts";
import { createClearBoughtItemsHandler } from "./hooks/clearBoughtItems";
import { createAddItemHandler } from "./hooks/addItem";
import { createUpdateItemHandler } from "./hooks/updateItem";
import { createUploadTextFileHandler } from "./hooks/uploadTextFile";
import { createEditItemHandlers } from "./hooks/editItem";


/// useLazyLoadQuery used to fetch graphqlfrom the backend. 
export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    appQuery,
    {}
  );

  const environment = useRelayEnvironment();

  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState("");
  //states defined for use when editing data. 
  const [newCategoryID, setNewCategoryID] = useState("");
  const [editingItemID, setEditingItemID] = useState<number | null>(null);

  const [editItemName, setEditItemName] = useState("");
  const [editCategoryID, setEditCategoryID] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setItems([...data.items]);
  }, [data.items]);

  const {
    totalItems,
    boughtItems,
    remainingItems,
    sortedItems,
  } = shoppingFilters(items, selectedCategory, searchText);

  //togglebought function now using commitMutation. 
  const toggleBought = createToggleBoughtHandler({
      environment,
      setItems,
  });

  const clearBoughtItems = createClearBoughtItemsHandler({
      environment,
      setItems,
  });

  const handleAddItem = createAddItemHandler({
    environment,
    setItems,
    newItemName,
    setNewItemName,
    newCategoryID,
    setNewCategoryID,
  });

  const handleDeleteItem = createDeleteItemHandler({
    environment,
    setItems,
  });

  const { startEditing, cancelEditing } = createEditItemHandlers({
    setEditingItemID,
    setEditItemName,
    setEditCategoryID,
  });

  const saveEditedItem = createUpdateItemHandler({
    environment,
    setItems,
    editItemName,
    editCategoryID,
    cancelEditing,
  });

  const uploadTextFile = createUploadTextFileHandler({
    environment,
    setItems,
    selectedFile,
    categories: data.categories,
  });

  //here the main program is rendered. 
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

        <StatsBar
          totalItems={totalItems}
          boughtItems={boughtItems}
          remainingItems={remainingItems}
        />

        {sortedItems.map((item) => (
          <ShoppingItem
            key={item.itemID}
            item={item}
            categories={data.categories}
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
        ))}
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
  )
};