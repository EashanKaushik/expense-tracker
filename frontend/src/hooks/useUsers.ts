import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import userService, { Users } from "../services/user-service";

const useUsers = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        const {request, cancel} = userService.getAll<Users>();

        request.then((response) => {
            setUsers(response.data);
            setLoading(false);
            setError('');
        })
        .catch ((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
        })

        return () => cancel();
    }, []);

    return {users, setUsers, error, setError, loading, setLoading}
}

export default useUsers;
