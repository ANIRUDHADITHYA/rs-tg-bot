import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <div className='nav-wrapper'>
                <Link to="/" className='tap'><img src='/Asserts/mine.png'></img><p>MINE</p></Link>
                <Link to="/friends"><img src='/Asserts/friend.png'></img><p>FRIENDS</p></Link>
                <Link to="/tasks"><img src='/Asserts/task.png'></img><p>TASKS</p></Link>

                <Link to="/wallet"><img src='/Asserts/wallet.png'></img><p>WALLET</p></Link>
            </div>
        </nav>
    )
}
