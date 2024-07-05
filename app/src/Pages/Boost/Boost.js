import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import "./Boost.css";

export default function Boost() {
    return (
        <div>
            <Navbar />
            <div className='boost-container'>
                <div className='home-avl-bal'>
                    <p>Total Balance</p>
                    <img src='/Asserts/avb.png' alt='Total Balance' />
                    <p>{10000.00}</p>
                </div>
                <div className='boots-items'>
                    <div className='boost-item'>
                        <img src='/Asserts/storage.png'></img>
                        <div className='boost-content'>
                            <h3>Storage Level 1</h3>
                            <p>Increase the time between Claims</p>
                        </div>
                        <button>Boost Lv2</button>
                    </div>
                    <div className='boost-item'>
                        <img src='/Asserts/coin.png'></img>
                        <div className='boost-content'>
                            <h3>Feed Level 1</h3>
                            <p>Increase the Mining Speed</p>
                        </div>
                        <button>Boost Lv2</button>
                    </div>
                    <div className='boost-item'>
                        <img src='/Asserts/logo.png'></img>
                        <div className='boost-content'>
                            <h3>Rooster Level 1</h3>
                            <p>Coming Soon</p>
                        </div>
                        <button>Boost Lv2</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
