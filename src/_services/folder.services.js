import axios from 'axios';
import { authHeader } from '../_helpers';

export const folderService = {
    add,
    update,
    delete: _delete,
    getAll,
};

let url = process.env.VUE_APP_DJANGO_HOST;

function getAll(food_id) {
    return axios
        .get(`${url}/comments/${food_id}`)
        .then(handleResponse)
    }

function add(food_id, content) {
    return axios
        .post(`${url}/comments/${food_id}`, {
                content,
                food_id
            },{
            headers: authHeader()
        })
        .then(handleResponse)
    }

function _delete(id) {
    return axios
        .delete(`${url}/comments/${id}/`,{
            headers: authHeader()
        })
    }

function update(id, content, food_id) {
    return axios
        .patch(`${url}/comments/${id}/`,{
            food_id,
            content
        },{
            headers: authHeader()
        })
    }

function handleResponse(response) {
    return response.data;
}