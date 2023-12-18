import {createSlice} from "@reduxjs/toolkit";
import {createTask, deleteTask, fetchTask} from "./taskThunk.ts";
import {IApiTask} from "../../type";
import {RootState} from "../../app/store.ts";

interface TaskState {
    value: IApiTask[] | null;
    isLoading: boolean;
    isError: boolean;
    createLoading: boolean,
    deleteLoading: string | boolean,
}

const initialState: TaskState = {
    value: null,
    isLoading: false,
    isError: false,
    createLoading: false,
    deleteLoading: false,
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchTask.pending, (state)=> {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.value = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchTask.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(createTask.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createTask.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createTask.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(deleteTask.pending, (state, {meta}) =>  {
            state.deleteLoading = meta.arg;
        });
        builder.addCase(deleteTask.rejected, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTask.fulfilled, (state) => {
            state.deleteLoading = false;
        });
    }
});


export const selectTask = (state: RootState) => state.task.value;
export const selectDeleteTask = (state: RootState) => state.task.deleteLoading;
export const selectCreateLoading = (state: RootState) => state.task.createLoading;
export const taskReducer = taskSlice.reducer;


