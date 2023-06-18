import { DefaultModel } from '../shared/model/default-model';
import { AxiosResponse } from 'axios';
import axios from 'axios';

export class AbstractService<T extends DefaultModel> {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    save(t: T): Promise<AxiosResponse<T>> {
        return axios.post(this.url, t);
    }

    findAll(): Promise<AxiosResponse<T[]>> {
        return axios.get(this.url);
    }

    findById(id: number): Promise<AxiosResponse<T>> {
        return axios.get(this.url + '/' + id);
    }
}
