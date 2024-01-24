import ListCategory from './Components/ListCategory';
import ProductForm from './Components/ProductForm';
import SelectCategory from './Components/SelectCategory';
import FetchData from './Components/FetchData';
import { useEffect, useState } from 'react';
import {produce} from "immer";
import { FieldValues } from 'react-hook-form';

import {Amplify} from 'aws-amplify';
import awsExports from './services/login-client';
import {withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { Button } from 'react-bootstrap';
import '@aws-amplify/ui-react/styles.css'
import {fetchAuthSession}  from '@aws-amplify/auth';
import apiGatewayClient from './services/apiGateway-client';

Amplify.configure({
  Auth:{
    Cognito: {
      userPoolId: awsExports.USER_POOL_ID,
      userPoolClientId: awsExports.USER_POOL_CLIENT_ID
    }
  }
})

export type Products = {
  id: string,
  product: string,
  price: number,
  category: string,
}[];

console.log("ehllo")

function App({ signOut, user }: WithAuthenticatorProps) {
  const [jwtToken, setJwtToken] = useState('');
    
  useEffect(() => {
    async function currentSession() {
      try {
        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        if(accessToken?.toString())
          setJwtToken(idToken?.toString()!);
      } catch (err) {
        console.log(err);
      }
    }

    currentSession();
    
    }, []);
  
  console.log("jwtToken")
  console.log(jwtToken)
  const authorized = apiGatewayClient(jwtToken)
  const controller = new AbortController();
  console.log(authorized.get('', {signal: controller.signal}).then(res => console.log(res)));
  console.log(jwtToken);
    
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
    <Button onClick={signOut}>Sign Out: {user?.username}</Button>
    </>
  )
}

export default withAuthenticator(App, {
  hideSignUp: true
 });