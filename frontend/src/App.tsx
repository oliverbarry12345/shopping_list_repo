import type { AppQuery } from "./__generated__/AppQuery.graphql";
import { graphql, useLazyLoadQuery, commitMutation, useRelayEnvironment } from "react-relay";
import { useEffect, useState } from "react";
import styled from "styled-components";

//Styled components are defined here:
const Container = styled.div`
  width: 700px;
  margin: 40px auto;
  border: 2px solid black;
`;

const Header = styled.header`
  padding: 20px;
  border-bottom: 2px solid black;

  h1 {
    margin: 0;
    font-size: 30px;
  }
`;

const MainSection = styled.main`
  border-bottom: 2px solid black;
  text-align: left;
`;

const ColumnHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  gap: 16px;
  padding: 12px;
  font-weight: bold;
  border-bottom: 2px solid black;
  text-align: left;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  gap: 16px;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
`;

const AddSection = styled.section`
  padding: 16px 32px;

  input {
    margin-right: 8px;
  }
`;
// Relay mutation here updates the bought status through GraphQL. 
const toggleBoughtMutation = graphql`
  mutation AppToggleBoughtMutation($itemID: Int!, $bought: Boolean!) {
    toggleBought(itemID: $itemID, bought: $bought) {
      itemID
      itemName
      bought
      category {
        categoryID
        categoryName
      }
    }
  }
`;

// Relay mutation here implements the addItem function through GraphQL. 
const addItemMutation = graphql`
  mutation AppAddItemMutation($itemName: String!, $categoryID: Int!) {
    addItem(itemName: $itemName, categoryID: $categoryID) {
      itemID
      itemName
      bought
      category {
        categoryID
        categoryName
      }
    }
  }
`;
//Relay mutation for deleteItem. 
const deleteItemMutation = graphql`
  mutation AppDeleteItemMutation($itemID: Int!) {
    deleteItem(itemID: $itemID)
  }
`;

//Relay mutation for editing/updating items. 
const updateItemMutation = graphql`
  mutation AppUpdateItemMutation(
    $itemID: Int!
    $itemName: String!
    $categoryID: Int!
  ) {
    updateItem(itemID: $itemID, itemName: $itemName, categoryID: $categoryID) {
      itemID
      itemName
      bought
      category {
        categoryID
        categoryName
      }
    }
  }
`;

//Item and Category fields, reflecting change in DB schema. 
type Category = {
  categoryID: number;
  categoryName: string;
};

type Item = {
  itemID: number;
  itemName: string;
  bought: boolean;
  category: Category;
};

/// useLazyLoadQuery used to fetch graphqlfrom the backend. 
export default function App() {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
        items {
          itemID
          itemName
          bought
          category {
            categoryID
            categoryName
          }
        }

        categories {
          categoryID
          categoryName
        }
      }
    `,
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

  const filteredItems =
  selectedCategory === "All"
    ? items
    : items.filter(
        (item) =>
          item.category.categoryName === selectedCategory
      );

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


  //here the main program is rendered. 
  return (
    <Container>
      <Header>
        <h1>Shopping List</h1>
      </Header>

      <MainSection>
        <ColumnHeader>
          <span>Item</span>
          <span>Bought</span>
          <span>Category</span>
          <span>Actions</span>
        </ColumnHeader>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>

          {data.categories.map((category) => (
            <option
              key={category.categoryID}
              value={category.categoryName}
            >
              {category.categoryName}
            </option>
          ))}
        </select>

        {sortedItems.map((item) => ( //now items are rendered in sorted order based on bought/notbought
          <ItemRow key={item.itemID}>
            {editingItemID === item.itemID ? (
              <>
                <input
                  value={editItemName}
                  onChange={(e) => setEditItemName(e.target.value)}
                />

                <span>{item.bought ? "Yes" : "No"}</span>

                <select
                  value={editCategoryID}
                  onChange={(e) => setEditCategoryID(e.target.value)}
                >
                  <option value="">Select category</option>
                  {data.categories.map((category) => (
                    <option key={category.categoryID} value={category.categoryID}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>

                <ButtonGroup>
                  <button onClick={() => saveEditedItem(item.itemID)}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </ButtonGroup>
              </>
            ) : ( // if/or statement for rendering if the item is currently being edited or not. 
              <>
                <span>{item.itemName}</span>

                <span>{item.bought ? "Yes" : "No"}</span>

                <span>{item.category.categoryName}</span>

                <ButtonGroup>
                  <button onClick={() => toggleBought(item.itemID, !item.bought)}>  
                    {item.bought ? "Mark Not Bought" : "Mark Bought"} 
                  </button>

                  <button onClick={() => startEditing(item)}>Edit</button>

                  <button onClick={() => handleDeleteItem(item.itemID)}>
                    Delete
                  </button>
                </ButtonGroup>
              </>
            )}
          </ItemRow>
        ))}
      </MainSection>

      <AddSection>
        <h2>Add new item:</h2>

        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Name"
        />
        
        <select
          value={newCategoryID}
          onChange={(e) => setNewCategoryID(e.target.value)}
        >
          <option value="">Select category</option>
          {data.categories.map((category) => (
            <option key={category.categoryID} value={category.categoryID}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <button onClick={handleAddItem}>Add Item</button>
      </AddSection>
    </Container>
  )
};