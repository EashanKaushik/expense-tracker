import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form'
import {Button, Form, Alert} from 'react-bootstrap';
import category from "../../categories";

const productSchema = z.object({
    product: z.string().min(1, {message: "Product is required and min 5 in length"}),
    price: z.number({invalid_type_error: "Price is required"}).min(10).max(10_000),
    category: z.enum(category, {
        errorMap: () => ({message: "Catergoy Required!"})
    }),
})

type ProductForm = z.infer<typeof productSchema>;

interface Props {
    addProduct: (data: FieldValues) => void
  }
function ProductForm({addProduct}: Props) {
    const {register, handleSubmit, reset,formState: {errors}} = useForm<ProductForm>( {resolver: zodResolver(productSchema)});

    return (
        <Form onSubmit={handleSubmit(data => {addProduct(data); reset();})}>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product</Form.Label>
                <Form.Control type="text" placeholder="Enter Product" { ...register('product')}/>
                { errors.product && <Alert key="danger" variant="danger">{errors.product.message}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Price" { ...register('price', {valueAsNumber: true})}/>
                { errors.price && <Alert key="danger" variant="danger">{errors.price.message}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" { ...register('category')}>

                    <option value="">Open this select menu</option>
                    {category.map((value, index) => <option key={index} value={value}>{value}</option>)}
                </Form.Select>
                { errors.category && <Alert key="danger" variant="danger">{errors.category.message}</Alert>}
            </Form.Group>

            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    )
}

export default ProductForm