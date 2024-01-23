import { Button, Table } from 'react-bootstrap';
import { Products } from '../../App';

interface Props {
  removeProduct: (id: string) => void,
  products: Products,
}

function ListCategory({removeProduct, products}: Props) {

  if (products.length === 0) return null;

  return (
    <>        
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          {products.map((value, index) => 
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{value.product}</td>
            <td>{value.price}</td>
            <td>{value.category}</td>
            <td><Button variant="btn btn-outline-danger" onClick={() => removeProduct(value.id)}>Delete</Button></td>
          </tr>)}
          {/* {selectedCategory.length === 0 ?  :   products.filter(checkCategory).map((value, index) => <tr key={index}><td>{index + 1}</td><td>{value.product}</td><td>{value.price}</td><td>{value.category}</td></tr>)} */}
          <tr>
            <td></td>
            <td><b>Total</b></td>
            <td><b>{products.reduce((partialSum, product) => product.price + partialSum, 0)}</b></td>
            <td></td>
          </tr>
      </tbody>
    </Table>
    </>

  )
}

export default ListCategory