import axios from 'axios'
import { BASE_URL } from '../constants/url'

export const getAll = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/users`);
        return res.data;
    } catch (err) {
        console.log(err.message);
    }
}

export const create = async (body) => {
    try {
        return await axios.post(`${BASE_URL}/users`, body);
    } catch (err) {
        console.log(err.message);
    }
} 