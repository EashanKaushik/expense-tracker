import axios, { AxiosError, CanceledError } from "axios";

export {CanceledError, AxiosError};
export default axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

