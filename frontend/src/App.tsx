import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { useLazyLoadQuery, commitMutation, useRelayEnvironment } from "react-relay";
import { useEffect, useState } from "react";
import type { Item } from "./types/shoppingTypes.ts";
import * as Styled from "./styles/styledComponents.ts";

//importing components
import StatsBar from "./components/statsBar";
import FilterSection from "./components/filterSection";
import ShoppingItem from "./components/shoppingItem";
import AddSection from "./components/addSection";
import ImportSection from "./components/importSection";

//importing mutations
import { toggleBoughtMutation } from "./graphql/mutations/toggleBoughtMutation";
import { addItemMutation } from "./graphql/mutations/addItemMutation";
import { deleteItemMutation } from "./graphql/mutations/deleteItemMutation";
import { updateItemMutation } from "./graphql/mutations/updateItemMutation";
import { clearBoughtItemsMutation } from "./graphql/mutations/clearBoughtItemsMutation";
import { addItemsFromFileMutation } from "./graphql/mutations/addItemsFromFileMutation";

//importing the query 
import { appQuery } from "./graphql/queries/appQuery";


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

  const totalItems = items.length;
  const boughtItems = items.filter(
    (item) => item.bought
  ).length;
  const remainingItems = totalItems - boughtItems;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setItems([...data.items]);
  }, [data.items]);

  //togglebought function now using commitMutation. 
  const toggleBought = (itemID: number, bought: boolean) => {
    commitMutation(environment, {
      mutation: toggleBoughtMutation,
      variables: {
        itemID,
        bought,
      },
      onCompleted: (response: any) => {
        const updatedItem: Item = response.toggleBought;

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.itemID === updatedItem.itemID ? updatedItem : item
          )
        );
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category.categoryName === selectedCategory;

    const matchesSearch =
      item.itemName
        .toLowerCase()
        .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  //after assigning bought/notbought, sortedItems allows sortingbased bought status. 
  const sortedItems = [...filteredItems].sort((a, b) => {
    return Number(a.bought) - Number(b.bought);
  });

  //handleAddItem now using commitMutation.
  const handleAddItem = () => {
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

  //handleDeleteItem, now using commitMutation.
  const handleDeleteItem = (itemID: number) => {
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

  //startEditing uses previously defined states to hold data in "limbo" while editing, so data is only overwritten when saved.
  const startEditing = (item: Item) => {
    setEditingItemID(item.itemID);
    setEditItemName(item.itemName);
    setEditCategoryID(String(item.category.categoryID));
  };

  const cancelEditing = () => {
    setEditingItemID(null);
    setEditItemName("");
    setEditCategoryID("");
  };

  //saveEditedItem commits changes made to the DB. 
  const saveEditedItem = (itemID: number) => {
    const itemName = editItemName.trim();
    const categoryID = Number(editCategoryID);

    if (!itemName || !categoryID) {
      alert("Item name and category are required.");
      return;
    }

    commitMutation(environment, {
      mutation: updateItemMutation,
      variables: {
        itemID,
        itemName,
        categoryID,
      },
      onCompleted: (response: any) => {
        const updatedItem: Item = response.updateItem;

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.itemID === updatedItem.itemID ? updatedItem : item
          )
        );

        cancelEditing();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const clearBoughtItems = () => {
    commitMutation(environment, {
      mutation: clearBoughtItemsMutation,
      variables: {},
      onCompleted: (response: any) => {
        if (response.clearBoughtItems) {
          setItems((currentItems) =>
            currentItems.filter((item) => !item.bought)
          );
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  //uploadTextFile reads the TXT file, formats the data and then sends it off using commitMutation. 
  const uploadTextFile = () => {
    if (!selectedFile) return;
      const reader = new FileReader();
      reader.onload = () => {
          const text = reader.result as string;
          const lines = text
              .split("\n")
              .filter(line => line.trim() !== "");
          const parsedItems = lines.map(line => {
              const [itemName, categoryName] =
                  line.split(",");
              const category =
                  data.categories.find(
                      c =>
                      c.categoryName.trim() ===
                      categoryName.trim()
                  );

              return {
                  itemName: itemName.trim(),
                  categoryID: category?.categoryID
              };
          }).filter(
              item => item.categoryID !== undefined
          );

          commitMutation(environment, {
              mutation: addItemsFromFileMutation,
              variables: {
                  items: parsedItems
              },
              onCompleted: (response: any) => {
                  setItems(currentItems => [
                      ...currentItems,
                      ...response.addItemsFromFile
                  ]);
              },
              onError: error => {
                  console.error(error);
              }
          });
      };
      reader.readAsText(selectedFile);
  };

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