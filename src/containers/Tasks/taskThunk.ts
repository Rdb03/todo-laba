import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {IApiTask, IApiTaskList, ITask} from "../../type";

export const fetchTask = createAsyncThunk<IApiTask[]>(
    'tasks/fetch',
    async () => {
    const response = await axiosApi.get<IApiTaskList | null>('/tasks.json');
    const tasksResponse = response.data;
    let tasks: IApiTask[] = [];

    if (tasksResponse) {
        tasks = Object.keys(tasksResponse).map((id) =>({
            ...tasksResponse[id],
            id
        }));
    }

    return tasks;
});

export const createTask = createAsyncThunk<void, ITask>(
    'task/create',
    async (task) =>{
        await axiosApi.post('/tasks.json', task);
    },
)

export const updateTask = createAsyncThunk<void, IApiTask>(
    'task/update',
    async (task) => {
        await axiosApi.put(`/tasks/${task.id}.json`, task);
});


export const deleteTask = createAsyncThunk(
    'task/delete',
    async (id:string) => {
        await axiosApi.delete(`/tasks/${id}.json`);
    },
);
