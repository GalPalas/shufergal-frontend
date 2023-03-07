import { Category } from "types";

export const categories: Category[] = [
  { _id: "5b21ca3eeb7f6fbccd471816", name: "Bread" },
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Organic Fruits" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Organic Vegetables" },
];

export const getCategories = (): Category[] => {
  return categories.filter((c: Category) => c);
};
