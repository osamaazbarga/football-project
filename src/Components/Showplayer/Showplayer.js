import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import{Link} from 'react-router-dom'

import Api from '../Api/Api'

import './Showplayer.css'


const Showplayer =()=>{
    let {id_player}=useParams();
    const [player,setPlayer]=useState([]);
    const [trophies,setTrophies]=useState([]);





    useEffect(()=>{
        getplayerbyid();
        // Renderplayerinfo();
    },[])
    const getplayerbyid=async()=>{
        let arr=[]
        let newarr=[]
        let flag=0
        let count=0
        try{
            let data =await Api.get(`/v2/players/player/${id_player}`);
            let trophdata =await Api.get(`/v2/trophies/player/${id_player}`);

            arr=data.data.api.players;
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < newarr.length; j++) {
                    if(arr[i].season===newarr[j].season){
                        flag=1
                        break
                    }
                    
                }
                if(flag===0&&arr[i].season.length>4){
                    newarr[count++]=arr[i]
                }
                flag=0;
                
            }

            setPlayer(newarr);
            setTrophies(trophdata.data.api.trophies)
            console.log(trophdata.data.api.trophies);
        }catch(err){
            console.log(err)
        }

    }


    const Rendertrophies=()=>{
        // let trophiescounter=[];
        // for (let i = 0; i < trophies.length; i++) {
        //     for (let j = 0; j < trophiescounter.length; j++) {
        //         if(trophies[i].league===trophiescounter[j].league)
                
        //     }
            
        // }

        return (
            <table>
                <tr>
                    <th>cup</th>
                    <th>country</th>
                    <th>season</th>
                    <th>place</th>

                </tr>
                {/* <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr> */}

                {
                    trophies.map(troph=>{
                        return(
                            <tr>
                                <td>{troph.league}</td>
                                <td>{troph.country}</td>
                                <td>{troph.season}</td>
                                <td>{troph.place}</td>

                            </tr>
                        )
                    })
                }
                </table>
        )
    }
   
    const Renderplayerinfo=()=>{
        let playerarr=null
        if(player.length>0){
            playerarr=player[0]
        }

        if(playerarr!=null){
            return(
                <div className="playerinfo">
                    <h1>{player[0].player_name}</h1>
                    <div className="names">
                        <div className="lineinfo"><span>first name:</span> {player[0].firstname}</div>
                        <div className="lineinfo"><span>last name:</span> {player[0].lastname}</div>
    
                    </div>
                    <div className="birth">
                        <div className="lineinfo"><span>birthday: </span>{player[0].birth_date}</div>
                        <div className="lineinfo"><span>birth place: </span>{player[0].birth_place} , {player[0].birth_country}</div>
    
                    </div>
                    <div className="lineinfo"><span>Team: </span><Link to={`/showsquad/${player[0].team_id}`}><div className="teamname">{player[0].team_name}</div></Link></div>
                    
    
                </div>
            )
        }
        else{
            return <div>loading</div>
        }
        
    }
    const Renderplayerdata=()=>{
        if(player){
            return player.map(plyr=>{
                return (
                    
                    <div className="container">
                        <div className="byseason">
                            <Link to={`/showsquad/${plyr.team_id}`}><div className="teamname">{plyr.team_name}</div></Link>
                            <div className="rating"><i class="fas fa-star"></i>{parseFloat(plyr.rating).toFixed(2)}</div>
                            <div className="sessondate">{plyr.season}</div>
                            
                            
                        </div>
                        <div className="info">
                            <div className="games">
                                <div className="title">Games</div>
                                <div className="gamesinfo">
                                    <div><i class="fas fa-globe"></i> {plyr.games.appearences}</div>
                                    <div><i class="far fa-clock"></i> {plyr.games.minutes_played}</div>
                                    <div><i class="fas fa-futbol"></i> {plyr.games.lineups}</div>

                                </div>
                            </div>


                            <div className="goals">
                                <div className="title">Goals</div>
                                <div className="goalsinfo">
                                    <div>total: {plyr.goals.total}</div>
                                    <div>conceded: {plyr.goals.conceded}</div>
                                    <div>assists: {plyr.goals.assists}</div>
                                    <div>saves: {plyr.goals.saves}</div>


                                </div>
                            </div>

                            <div className="penalty">
                                <div className="title">Penalty</div>
                                <div className="penaltyinfo">
                                    <div>won: {plyr.penalty.won}</div>
                                    <div>commited: {plyr.penalty.commited}</div>
                                    <div>success: {plyr.penalty.success}</div>
                                    <div>missed: {plyr.penalty.missed}</div>
                                    <div>saves: {plyr.penalty.saves}</div>


                                </div>
                            </div>

                            <div className="passes">
                                <div className="title">Passes</div>
                                <div className="passesinfo">
                                    <div>total: {plyr.passes.total}</div>
                                    <div>key: {plyr.passes.key}</div>
                                    <div>accuracy: {plyr.passes.accuracy}</div>
                                </div>
                            </div>

                            <div className="cards">
                                <div className="yellow"><i class="fas fa-square"></i>{plyr.cards.yellow}</div>
                                <div className="yellowred"><i class="fas fa-square y"></i><i class="fas fa-square r"></i>{plyr.cards.yellowred}</div>
                                <div className="red"><i class="fas fa-square"></i>{plyr.cards.red}</div>
                            </div>


                            <div className="statistics">
                                <div className="dribbles">
                                    <div className="secondtitle">dribbles</div>
                                    <div>attempts: {plyr.dribbles.attempts}</div>
                                    <div>success: {plyr.dribbles.success}</div>
                                </div>
                                <div className="duels">
                                    <div className="secondtitle">duels</div>
                                    <div>total: {plyr.duels.total}</div>
                                    <div>won: {plyr.duels.won}</div>
                                </div>
                                <div className="fouls">
                                    <div className="secondtitle">fouls</div>
                                    <div>drawn: {plyr.fouls.drawn}</div>
                                    <div>committed: {plyr.fouls.committed}</div>
                                </div>
                            </div>

                            <div className="statistics">
                                <div className="shots">
                                    <div className="secondtitle">Shots</div>
                                    <div>total: {plyr.shots.total}</div>
                                    <div>on: {plyr.shots.on}</div>
                                </div>
                                <div className="substitutes">
                                    <div className="secondtitle">substitutes</div>
                                    <div>in: {plyr.substitutes.in}</div>
                                    <div>out: {plyr.substitutes.out}</div>
                                    <div>bench: {plyr.substitutes.bench}</div>

                                </div>
                                <div className="tackles">
                                    <div className="secondtitle">tackles</div>
                                    <div>total: {plyr.tackles.total}</div>
                                    <div>blocks: {plyr.tackles.blocks}</div>
                                    <div>interceptions: {plyr.tackles.interceptions}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return <div>loading</div>
        

    }
    return (
        <div>
            {
                id_player
            }
            
                
                    
                        <div>
                            
                            <Renderplayerinfo/>
                            <Rendertrophies/>
                            <Renderplayerdata/>
                        </div>

                        {/* // <Link to={`/showplayer/${player.player_id}`}><Renderplayerdata/></Link>
                        //<div key={player.player_id}>{player.player_name}</div> */}
                        
                    
                
            
        </div>
    )

}

export default Showplayer