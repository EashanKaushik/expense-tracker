import {Form} from 'react-bootstrap';
import category from '../../categories';

interface Props {
    handleChange: (category: string) => void,
}

function SelectCategory({ handleChange}: Props) {
  return (
        <Form>
        <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Select Category</Form.Label>
            <Form.Select onChange={(event) => handleChange(event.target.value)} aria-label="Default select example">

                <option value="">Open this select menu</option>
                {category.map((value, index) => <option key={index} value={value}>{value}</option>)}
            </Form.Select>
        </Form.Group>

    </Form>
  )
}

export default SelectCategory