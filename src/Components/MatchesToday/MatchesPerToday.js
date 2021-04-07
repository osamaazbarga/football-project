import React, { useEffect, useState } from 'react'
import Matchestoday from '../Api/Apimatchestoday'
import './MatchPerToday.css'


const MatchesPerToday=()=>{

    const [matchesPerDay,setMatchesPerDay]=useState([]);
    useEffect(()=>{
        matchestoday();
    },[])
    const matchestoday=async()=>{
        try{
            let data =await Matchestoday.get('');
            setMatchesPerDay(data.data.data)
            //console.log(data);
            
        }catch(err){
            console.log(err)
        }
    }
    const renderMatchperday=()=>{
        //console.log(matchesPerDay)
        // return matchesPerDay.map(match=>{
        //     return <div className="mathchtoday"><div className="hometeam">{match.home_name}</div><div className="score">{match.homeGoalCount}</div>-<div className="score">{match.awayGoalCount}</div><div className="awayteam">{match.away_name}</div></div>
        // })
    }
    return(<div>
        <div className="matchline">
            {
                renderMatchperday()
            }
        </div>
    </div>)
}

export default MatchesPerToday