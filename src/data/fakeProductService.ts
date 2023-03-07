import { Product } from "types";

export const products: Product[] = [
  {
    _id: "1",
    name: "Marketside Organic Bananas,Bunch, 2 lb",
    price: 1.7,
    image:
      "https://i5.walmartimages.com/asr/4b15d1c6-03e7-489b-96cb-7d4b1edeb927.042464e5bc52fa0421f255d04ec525a4.jpeg",
    category: { _id: "63ecb57558a07ebd5d227aff", name: "Organic Fruit" },
    description: "Marketside Organic Bananas, Bunch, 2 lb",
    numberInStock: 15,
    liked: true,
  },
  {
    _id: "2",
    name: "Local Organic Asparagus, bunch, 1 lb",
    price: 5.96,
    image:
      "https://i5.walmartimages.com/asr/fa41578e-f8be-4e38-9eed-65e119ad74f4_1.a275a50d8f6cf85fb6c0b130260f6ca6.jpeg",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Organic Vegetable" },
    description: "Local Organic Asparagus, bunch, 1 lb",
    numberInStock: 100,
  },
  {
    _id: "3",
    name: "Marketside Organic Gold Potatoes, 3 lb Bag",
    price: 4.88,
    image:
      "https://i5.walmartimages.com/asr/cf9ea3c9-308b-492a-a90c-99a63b4a94a1.dc1df887b49cf8e49eaad121fdaf584d.jpeg",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Organic Vegetable" },
    description: "Marketside Organic Gold Potatoes, 3 lb Bag",
    numberInStock: 100,
  },
  {
    _id: "4",
    name: "Fresh USDA Organic Strawberries, 1 lb.",
    price: 3.86,
    image:
      "https://i5.walmartimages.com/asr/fb148fa5-193e-479c-8e89-dca9d61e2ff7_1.0d26c201e069d9940a4d0cb0c85d776d.jpeg",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Organic Fruit" },
    description: "Fresh USDA Organic Strawberries, 1 lb.",
    numberInStock: 100,
  },
  {
    _id: "5",
    name: "Fresh & Organic Italian Parsley, Bunch 1 Pack",
    price: 0.98,
    image:
      "https://i5.walmartimages.com/asr/dfd45cbc-0f22-4b7b-8b1e-d54ec50fc97c_1.add07ac355762219273ff743ec2b2efc.jpeg",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Organic Vegetable" },
    description: "Fresh & Organic Italian Parsley, Bunch 1 Pack",
    numberInStock: 100,
  },
  {
    _id: "6",
    name: "Organic Romaine Lettuce Hearts, 3 Pack",
    price: 3.46,
    image:
      "https://i5.walmartimages.com/asr/03492e51-3793-4a1c-b920-96c461cc8a6c.6a64ac56efebaafc00503fd379cfa49b.jpeg",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Organic Vegetable" },
    description: "Organic Romaine Lettuce Hearts, 3 Pack",
    numberInStock: 100,
  },
  {
    _id: "7",
    name: "Fresh & Organic Whole Carrots, 2 lb Bag",
    price: 1.96,
    image:
      "https://i5.walmartimages.com/asr/4ccb4d13-7f9d-43c4-9044-ee855cb00418.a19543f9c2a7152d279db832d6c7f2f9.jpeg",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Organic Vegetable" },
    description: "Fresh & Organic Whole Carrots, 2 lb Bag",
    numberInStock: 100,
  },
  {
    _id: "8",
    name: "Marketside Organic Baby Spinach, 16 Oz",
    price: 5.13,
    image:
      "https://i5.walmartimages.com/asr/03b1e82b-ae79-43b8-a361-325ae87396f1.692883c91785230e2a0595e99fe0172b.jpeg",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Organic Vegetable" },
    description: "Marketside Organic Baby Spinach, 16 Oz",
    numberInStock: 100,
  },
];

export const getProducts = (): any => {
  return products;
};
