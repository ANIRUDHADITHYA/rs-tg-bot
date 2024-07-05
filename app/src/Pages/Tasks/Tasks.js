import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import TaskCard from '../../Components/TaskCard/TaskCard';
import "./Tasks.css";

const tasks = [
    {
        id: 1,
        logo: '/Asserts/telegram.webp',
        title: 'Join our TG channel',
        description: 'Join our Telegram channel to stay updated with the latest news and earn rewards!',
        reward: 5000
    },
    {
        id: 2,
        logo: '/Asserts/x.webp',
        title: 'Follow our X account',
        description: 'Follow our X account to get the latest updates and earn rewards!',
        reward: 5000
    },
    {
        id: 3,
        logo: '/Asserts/x.webp',
        title: 'Retweet our X post',
        description: 'Retweet our post on X to spread the word and earn rewards!',
        reward: 5000
    },
    {
        id: 4,
        logo: '/Asserts/yt.webp',
        title: 'Subscribe to our YT channel',
        description: 'Subscribe to our YouTube channel to watch our latest videos and earn rewards!',
        reward: 5000
    }
];

export default function Tasks() {
    const [selectedTask, setSelectedTask] = useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleCloseTaskCard = () => {
        setSelectedTask(null);
    };

    return (
        <div>
            <Navbar />
            <div className='friend-title-container'>
                <h1>Earn More!</h1>
                <p>Complete our tasks and get additional rewards</p>
            </div>
            <h3 className='task-title'>Task List</h3>
            <div className='task-container-wrapper'>
                {tasks.map(task => (
                    <div key={task.id} className='task-container' onClick={() => handleTaskClick(task)}>
                        <img src={task.logo} className='task-logo' alt={task.title}></img>
                        <div className='task-rewards-details'>
                            <h4>{task.title}</h4>
                            <div className='task-rewards'>
                                <img src='/Asserts/invite-coin.png' alt='Reward'></img>
                                <p>+{task.reward}</p>
                            </div>
                        </div>
                        <div className='task-status'>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                ))}
            </div>
            <TaskCard task={selectedTask} onClose={handleCloseTaskCard} />
        </div>
    );
}
