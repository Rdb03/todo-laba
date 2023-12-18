export interface ITask {
    title: string,
    isDone: boolean,
}

export interface IApiTask extends ITask {
    id: string;
}

export interface IApiTaskList {
    [id: string]: IApiTask;
}