import userService, { Users } from "../../services/user-service";
import { produce } from "immer";
import { Alert, Spinner, Button, ListGroup } from "react-bootstrap";
import useUsers from "../../hooks/useUsers";

function FetchData() {

    const {users, setUsers, error, setError, loading} = useUsers()

    const deleteUser = (id: number) => {
        // Optimistic Delete
        
        const orginalUsers = [...users];
        setUsers(users.filter((value) => value.id !== id));

        userService.delete(id)
            .then(() => setError(''))
            .catch(err => {
                setError(err.message);
                setUsers(orginalUsers);
            });
    }

    const user: Users = {
        id: 0,
        name: "Eashan Kaushik"
    }

    const createUser = (user: Users) => {
        // Optimistic Create

        const orginalUsers = [...users];

        setUsers(produce((draft) => {
            draft.push({
                id: user.id,
                name: user.name
            })
        }, []));

        userService.create(user)
            .then(({data: savedUser}) => {
                setUsers(produce((draft) => {
                    const updatedUser = draft.find((newUser) => newUser.id === user.id) as Users;
                    updatedUser.id = savedUser.id;
                    }, []));
                    setError('');
                }
            )
            .catch(err => {
                setError(err.message);
                setUsers(orginalUsers)
            });
    }

    const updateUser = (id: number) => {
        // Optimistic Update

        const orginalUsers = [...users];
        
        setUsers(produce((draft) => {
            const updatedUser = draft.find((user) => user.id === id) as Users;
            updatedUser.name = updatedUser.name + "!";
        }, []));
        
        userService.update(id, {name: users.find((user) => user.id === id)?.name + "!"})
        .then(() => setError(''))
        .catch(err => {
            setError(err.message);
            setUsers(orginalUsers);
        });

    }

    
  return (
    <>
    <Button variant="outline-primary" className="mb-3" onClick={() => createUser(user)}> Create </Button>
    <ListGroup>
    {users.map((value) => {
        return <ListGroup.Item className="d-flex justify-content-between" key={value.id}>
                    {value.name} {" "} 
                    <div>
                        <Button variant="outline-secondary" className="mx-1" onClick={() => updateUser(value.id)}>Update</Button>
                        <Button variant="outline-danger" className="mx-1" onClick={() => deleteUser(value.id)}>Delete</Button>
                    </div>
                    </ListGroup.Item>
    })}
    </ListGroup>

    
    {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
    { error && <Alert variant="danger"> {error} </Alert>}
    </>
  )
}

export default FetchData