//Item and Category types 
export type Category = {
  categoryID: number;
  categoryName: string;
};

export type Item = {
  itemID: number;
  itemName: string;
  bought: boolean;
  category: Category;
};