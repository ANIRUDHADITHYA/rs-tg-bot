import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import "./DailyBonus.css"

export default function DailyBonus() {
    return (
        <div className='daily-bonus-section'>
            <Navbar />
            <div className='daily-bonus-container'>
                <div className='daily-bonus-title-container'>
                    <img src='/Asserts/daily.png'></img>
                    <h1>Daily Bonus</h1>
                    <p>Collect your Daily Bonus for logging into the game daily with any break</p>
                </div>
                <div className='daily-collect-button-container'>
                    <div className='daily-collect-button selected'>
                        <p>Day 1</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+1K</h3>
                    </div>
                    <div className='daily-collect-button selected'>
                        <p>Day 2</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+2K</h3>
                    </div>
                    <div className='daily-collect-button selected'>
                        <p>Day 3</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+4.5K</h3>
                    </div>
                    <div className='daily-collect-button current'>
                        <p>Day 4</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+10K</h3>
                    </div>
                    <div className='daily-collect-button'>
                        <p>Day 5</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+30K</h3>
                    </div>
                    <div className='daily-collect-button'>
                        <p>Day 6</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+75K</h3>
                    </div>
                    <div className='daily-collect-button'>
                        <p>Day 7</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+200K</h3>
                    </div>
                    <div className='daily-collect-button'>
                        <p>Day 8</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+500K</h3>
                    </div>
                    <div className='daily-collect-button'>
                        <p>Day 9</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+1M</h3>
                    </div>
                    <div className='daily-collect-button'>
                        <p>Day 10</p>
                        <img src='/Asserts/invite-coin.png'></img>
                        <h3>+5M</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
