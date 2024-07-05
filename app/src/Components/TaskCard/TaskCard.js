import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onClose }) => {
    return (
        <div className={task ? 'task-card show' : 'task-card'}>
            <div className='task-card-content'>
                <button className='task-card-close' onClick={onClose}>✖</button>
                <img src={task?.logo} className='task-card-logo' alt={task?.title} />
                <h4>{task?.title}</h4>
                <p>{task?.description}</p>
                <p className='open-task'>Open Task</p>
                <div className='task-card-rewards'>
                    <img src='/Asserts/invite-coin.png' alt='Reward' />
                    <p>+{task?.reward}</p>
                </div>
                <p className='check-task'>Check</p>
            </div>
        </div>
    );
};

export default TaskCard;
