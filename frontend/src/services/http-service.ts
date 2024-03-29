import apiClient from "./api-client";

class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    getAll<T>(){
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {signal: controller.signal});

        return {request, cancel: () => controller.abort()};
    }

    delete (id: number){
        return apiClient.delete( this.endpoint + "/" + id);
    }

    create<T> (entity:T) {
        return apiClient.post(this.endpoint + "/", entity);
    }

    update (id: number, update: {name: string}){
        return apiClient.patch(this.endpoint + "/" + id, update);
    }

}

const create = ( endpoint: string) => {
    return new HttpService(endpoint);
};

export default create;
