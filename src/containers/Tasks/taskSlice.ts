import {createSlice} from "@reduxjs/toolkit";
import {createTask, fetchTask} from "./taskThunk.ts";
import {IApiTask} from "../../type";
import {RootState} from "../../app/store.ts";

interface TaskState {
    value: IApiTask[] | null;
    isLoading: boolean;
    isError: boolean;
    createLoading: boolean,
}

const initialState: TaskState = {
    value: null,
    isLoading: false,
    isError: false,
    createLoading: false,
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
        builder.addCase(fetchTask.rejected, state => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(createTask.pending, state => {
            state.createLoading = true;
        });
        builder.addCase(createTask.fulfilled, state => {
            state.createLoading = false;
        });
        builder.addCase(createTask.rejected, state => {
            state.createLoading = false;
        });
    }
});


export const selectTask = (state: RootState) => state.task.value;
export const selectCreateTask = (state: RootState) => state.task.createLoading;
export const taskReducer = taskSlice.reducer;


