import {createTask, deleteTask, fetchTask, updateTask} from "./taskThunk.ts";
import React, {useEffect, useState} from "react";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectCreateLoading, selectDeleteTask, selectTask} from "./taskSlice.ts";
import {IApiTask} from "../../type";
import './Tasks.css';
import ButtonSpinner from "../../components/Spinner/ButtonSpinner.tsx";

const Tasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectTask)
    const deleteLoading = useAppSelector(selectDeleteTask);
    const createLoading = useAppSelector(selectCreateLoading);
    const [task, setTask] = useState<string>('');

    useEffect(() => {
        dispatch(fetchTask());
    }, [dispatch]);

    const onChange = async  (task: IApiTask) => {
       await dispatch(updateTask(
            {
                ...task,
                isDone: !task.isDone,
            }));
        await dispatch(fetchTask());
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createTask({
            title: task,
            isDone: false,
        }));
        setTask('');
        await dispatch(fetchTask());
    };

    const onDelete = async (task: IApiTask) => {
        if (window.confirm("Do you really want to delete this task?")) {
            await dispatch(deleteTask(task.id));
            await dispatch(fetchTask());
        }
    }

    return (
        <div className="container text-center">
            <form onSubmit={onSubmit}>
                <input
                    className="input-home"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                    disabled={createLoading}
                />
                <button type="submit" className="send-btn">{createLoading ? <ButtonSpinner/> : 'Send'}</button>
            </form>
            <div className="task-list">
                {tasks ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-div">
                            <div className="task">
                                <p className="task-txt">{task.title}</p>
                            </div>
                            <div className="d-flex">
                                <input type="checkbox"
                                       checked={task.isDone}
                                       className="task-checkbox"
                                       onChange={() => onChange(task)}
                                />
                                <button onClick={() => onDelete(task)}
                                        className="delete-btn"
                                        disabled={deleteLoading === task.id}
                                >
                                    {deleteLoading === task.id ? <ButtonSpinner/> : 'delete'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <Spinner/>
                )}
            </div>
        </div>
    );
};

export default Tasks;