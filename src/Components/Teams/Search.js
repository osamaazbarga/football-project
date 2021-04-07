import{Link} from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import './Search.css'


import Api from '../Api/Api'


const Search =()=>{

    const [term , setTerm]=useState(null);

    const [results,setResults]=useState([]);
    const [resultsLeauge,setResultsLeauge]=useState([]);
    const [resultsTeam,setResultsTeam]=useState([]);




    useEffect(() => {
        const timerId=setTimeout(() => {
            Searchbar();
        }, 1000);
        return()=>{
            clearTimeout(timerId)
        };
        
    }, [term])

    const Searchbar=async()=>{
        try{
            let data =await Api.get(`/v2/players/search/${term}`);
            let dataleague =await Api.get(`/v2/leagues/search/${term}`);
            let datateam =await Api.get(`/v2/teams/search/${term}`);


            // setSquad(data.data.api)
            // console.log(data.data.api)
            // let arr=[];
            // if(data.data.api.results>10){
            //     for (let i = 0; i < 10; i++) {
            //         arr.push(data.data.api.players[i])  
            //     }
            //     console.log(arr);
            // }
            // else setResults(data.data.api)
            
            setResults(data.data.api)
            setResultsTeam(datateam.data.api);
            setResultsLeauge(dataleague.data.api)
            console.log(dataleague.data.api);
            console.log(datateam.data.api);

        }catch(err){
            console.log(err)
        }
    }

    const Renderleagueresults=()=>{
        if(resultsLeauge.results>0)
         {
                    return resultsLeauge.leagues.map((plyr,i)=>{
                        if(i<20){
                            return(

                                <div key={plyr.league_id} className="item">
                                    <div className="right floated content">
                                            <Link to={`/showteam/${plyr.league_id}`}><div key={plyr.league_id}>{plyr.name}</div></Link>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                
         
         else return(
            <div>No Data Results</div>
         )
    }


    const Renderteamresults=()=>{
        if(resultsTeam.results>0)
         {
             console.log(resultsTeam.results)
                    return resultsTeam.teams.map((plyr,i)=>{
                        console.log(plyr)
                        if(i<20){
                            return(

                                <div key={plyr.team_id} className="item">
                                    <div className="right floated content">
                                            <Link to={`/showsquad/${plyr.team_id}`}><div key={plyr.team_id}>{plyr.name}</div></Link>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                
         
         else return(
            <div>No Data Results</div>
         )
    }

    const Renderresults=()=>{
         
         if(results.results>0)
         {
                    return results.players.map((plyr,i)=>{
                        if(i<20){
                            return(

                                <div key={plyr.player_id} className="item">
                                    <div className="right floated content">
                                            <Link to={`/showplayer/${plyr.player_id}`}><div key={plyr.player_id}>{plyr.player_name}</div></Link>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                
         
         else return(
             <div>No Data Results</div>
         )
        
    }

    return (
        <div className="mainsearch">
            
            Search: <div className="Search">
                    <input 
                    className="Searchinput"
                    type="input"
                    value={term}
                    onChange={e=>setTerm(e.target.value)}/>

                </div>
                <h3>Players</h3>
                <Renderresults/>
                <h3>League</h3>
                <Renderleagueresults/>
                <h3>Teams</h3>

                <Renderteamresults/>
        </div>
    )

}

export default Search
