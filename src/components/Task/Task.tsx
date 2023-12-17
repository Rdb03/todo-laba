import './Task.css';

const Task = () => {
    return (
        <div className="task-div">
            <div className="task">
                <p className="task-txt">Сходить по магазинам</p>
            </div>
            <div>
                <input type="checkbox" className="task-checkbox"/>
            </div>
        </div>
    );
};

export default Task;