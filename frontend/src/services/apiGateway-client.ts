
import axios, { AxiosError, CanceledError } from "axios";

export {CanceledError, AxiosError};
export default (idToken: string) => {
    return axios.create({
        baseURL: "https://ymlfmoplee.execute-api.us-east-1.amazonaws.com/prod",
        headers: {
            "Authorization": idToken
        }
    });
}




