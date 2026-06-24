import styled from "styled-components";

//Styled components are defined here:
export const Container = styled.div`
  width: 850px;
  margin: 40px auto;
  border: 1px solid #d0d0d0;
  border-top: 6px solid #00a6c8;
  background: #ffffff;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
`;

export const Header = styled.header`
  padding: 24px 32px;
  border-bottom: 1px solid #d0d0d0;
  background: #f7f7f7;

  h1 {
    margin: 0;
    font-size: 32px;
    color: #333;
  }
`;

export const MainSection = styled.main`
  padding: 20px 24px;
  text-align: left;
`;

export const ColumnHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  gap: 16px;
  padding: 10px 14px;
  font-weight: bold;
  color: #555;
  background: #e9e4d8;
  border-radius: 6px;
  margin-bottom: 10px;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;

  select,
  input {
    padding: 8px 10px;
    border: 1px solid #bbb;
    border-radius: 6px;
    font-size: 14px;
    background: #fff;
  }

  input {
    width: 230px;
  }

  select:focus,
  input:focus {
    outline: none;
    border-color: #00a6c8;
    box-shadow: 0 0 0 2px rgba(0, 166, 200, 0.2);
  }
`;

export const StatsBar = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 18px;
  padding: 10px 14px;

  background: #f7f7f7;
  border: 1px solid #d0d0d0;
  border-left: 5px solid #00a6c8;
  border-radius: 6px;

  font-size: 15px;
  font-weight: 500;
  color: #444;

  span {
    font-weight: bold;
    color: #333;
  }
`;

export const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  gap: 16px;
  align-items: center;
  padding: 12px 14px;
  margin-bottom: 8px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-left: 5px solid #49c48a;
  border-radius: 6px;
  color: #333;
`;

export const ActionButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #bbb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;

  &:hover {
    background: #e9f7fb;
    border-color: #00a6c8;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
`;

export const AddSection = styled.section`
  padding: 20px 32px;
  background: #f7f7f7;
  border-top: 1px solid #d0d0d0;

  h2 {
    margin-top: 0;
    color: #333;
  }

  input,
  select {
    margin-right: 8px;
    padding: 6px 8px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #00a6c8;
    box-shadow: 0 0 0 2px rgba(0, 166, 200, 0.2);
  }
`;

export const ImportSection = styled.section`
  margin-top: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-top: 1px solid #ddd;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;