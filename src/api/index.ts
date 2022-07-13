import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://3u4zqr9su4.execute-api.eu-west-1.amazonaws.com',
    headers: {
        'X-API-KEY': 'duQbZwH9312PTwsL3fmck5bdFjQRDIXj59i2ueTQ',
    }
});

export const requestTasks = async () => {
    return await axiosInstance.get(`prod/todos`);
};

export const addTask = async (body: any) => {
    return await axiosInstance.post(`prod/todos`, body);
};

export const updateTask = async (body: any) => {
    return await axiosInstance.patch(`prod/todos`, body);
};

export const deleteTask = async (id: string) => {
    return await axiosInstance.delete(`prod/todos?records[]=${id}`);
};