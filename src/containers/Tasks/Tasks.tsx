import {createTask, fetchTask, updateTask} from "./taskThunk.ts";
import React, {useEffect, useState} from "react";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectTask} from "./taskSlice.ts";
import {IApiTask} from "../../type";
import './Tasks.css';

const Tasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectTask)
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
        await dispatch(fetchTask());
    };

    return (
        <div className="container text-center">
            <form onSubmit={onSubmit}>
                <input
                    className="input-home"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit" className="btn btn-success">Success</button>
            </form>
            <div className="task-list">
                {tasks ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-div">
                            <div className="task">
                                <p className="task-txt">{task.title}</p>
                            </div>
                            <div>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       className="task-checkbox"
                                       onChange={() => onChange(task)}
                                />
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