import {axiosInstance} from "../config/config";

export const fetchData = async (url, errorMessage, Model = null) => {
    try {
        const response = await axiosInstance.get(url);
        return Model ? response.data.map(item => Model.fromJson(item)) : response.data;
    } catch (error) {
        console.error(errorMessage, error);
        return Model ? [] : null;
    }
}

export const fetchDataSingle = async (url, errorMessage, Model = null) => {
    try {
        const response = await axiosInstance.get(url);
        return Model ? Model.fromJson(response.data) : response.data;
    } catch (error) {
        console.error(errorMessage, error);
        return Model ? null : false;
    }
}

export const sendData = async (url, data, errorMessage, method) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            headers: {"Content-Type": "application/json"}
        });
        return response.data;
    } catch (error) {
        console.error(errorMessage, error.response?.data || error.message);
        throw error;
    }
}