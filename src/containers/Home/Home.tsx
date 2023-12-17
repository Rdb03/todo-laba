import './Home.css';
import React from "react";
import Task from "../../components/Task/Task.tsx";

const Home = () => {

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="container text-center">
            <form onSubmit={onFormSubmit}>
                <input className="input-home"/>
                <button type="submit" className="btn btn-success">Success</button>
            </form>
            <div className="task-list">
                <Task/>
            </div>
        </div>
    );
};

export default Home;