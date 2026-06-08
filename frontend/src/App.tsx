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
      category
    }
  }
`;

// Relay mutation here implements the addItem function through GraphQL. 
const addItemMutation = graphql`
  mutation AppAddItemMutation($itemName: String!, $category: String!) {
    addItem(itemName: $itemName, category: $category) {
      itemID
      itemName
      bought
      category
    }
  }
`;
//Relay mutation for deleteItem. 
const deleteItemMutation = graphql`
  mutation AppDeleteItemMutation($itemID: Int!) {
    deleteItem(itemID: $itemID)
  }
`;

//Added Item field as a minor fix / improvement and then moved outside app().
type Item = {
  itemID: number;
  itemName: string;
  bought: boolean;
  category: string;
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
          category
        }
      }
    `,
    {}
  );

  const environment = useRelayEnvironment();

  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newCategory, setNewCategory] = useState("");

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

  //after assigning bought/notbought, sortedItems allows sortingbased bought status. 
  const sortedItems = [...items].sort((a, b) => {
    return Number(a.bought) - Number(b.bought);
  });

  //handleAddItem now using commitMutation.
  const handleAddItem = () => {
    const itemName = newItemName.trim();
    const category = newCategory.trim();

    if (!itemName || !category) {
      alert("Item name and category are required.");
      return;
    }

    commitMutation(environment, {
      mutation: addItemMutation,
      variables: {
        itemName,
        category,
      },
      onCompleted: (response: any) => {
        const newItem: Item = response.addItem;

        setItems((currentItems) => [...currentItems, newItem]);

        setNewItemName("");
        setNewCategory("");
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

  //here the list, togglebought button, new item form and delete buttons are rendered. 
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
        
        {sortedItems.map((item) => ( //now items are rendered in sorted order based on bought/notbought
          <ItemRow key={item.itemID}>
            <span>{item.itemName}</span>

            <span>
              {item.bought ? "Yes" : "No"}
            </span>

            <span>{item.category}</span>

            <ButtonGroup>
              <button
                onClick={() =>
                  toggleBought(item.itemID, !item.bought)
                }
              >
                {item.bought ? "Mark Not Bought" : "Mark Bought"}
              </button>

              <button
                onClick={() =>
                  handleDeleteItem(item.itemID)
                }
              >
                Delete
              </button>
            </ButtonGroup>
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

        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category"
        />

        <button onClick={handleAddItem}>Add Item</button>
      </AddSection>
    </Container>
  )
};