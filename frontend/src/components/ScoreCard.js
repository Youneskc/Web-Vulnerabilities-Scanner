import React from "react";
import './ScoreCard.css';

function ScoreCard({score}){

    const getColor = () => {
        if(score >= 80) return 'green';
        if(score >= 50) return 'orange';
        return 'red';
    }

    const getScoreLabel = () => {
        if(score >= 80) return 'Good Security';
        if(score >= 50) return 'Moderate Security';
        return 'Poor Security';
    }
    const percentage = score;

    return (
        <div className="score-card">
            <h2>Security Score</h2>
            <div className="score-display">
                <div className="score-number" style={{color:getColor()}}> 
                   {score}/100
                </div>
                <div className="score-label">
                    {getScoreLabel()}
                </div>
                <div className="score-bar">
                    <div className="score-fill" style={{width: `${percentage}%`, backgroundColor: getColor()}}></div>
                </div>
            </div>
        </div>
    )
}
export default ScoreCard;
