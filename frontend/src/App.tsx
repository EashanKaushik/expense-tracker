import ListCategory from './Components/ListCategory';
import ProductForm from './Components/ProductForm';
import SelectCategory from './Components/SelectCategory';
import FetchData from './Components/FetchData';
import { useState } from 'react';
import {produce} from "immer";
import { FieldValues } from 'react-hook-form';

export type Products = {
  id: string,
  product: string,
  price: number,
  category: string,
}[];

function App() {
  const [products, setProducts] = useState<Products>([
    {id: "1", product: "water", category: "food", price: 100},
    {id: "2", product: "beef", category: "food", price: 200},
    {id: "3", product: "soap", category: "house", price: 100},

  ]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const addProduct = (data: FieldValues) => {

    setProducts(produce((draft) => {
      draft.push({
        id: (products.length + 1).toString(),
        product: data.product,
        price: data.price,
        category: data.category
        
      })
    }, []))
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  }

  const handleChage = (category: string) => {
    setSelectedCategory(category);
  }

  const visibleProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory): products;

  return (
    <>
    {/* <div className="container"><ProductForm addProduct={addProduct}>{category}</ProductForm></div> */}
    <div className="container">
      <ProductForm addProduct={addProduct}/>
    </div>
    <div className="container">
      <SelectCategory handleChange={handleChage}/>
    </div>
    <div className="container">
      <ListCategory products={visibleProducts} removeProduct={removeProduct}></ListCategory>
    </div>
    <div className="container"><FetchData/></div>
    </>
  )
}

export default App