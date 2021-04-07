import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Api from '../Api/Api'
import{Link} from 'react-router-dom'



const Showteams =()=>{
    let {id}=useParams();
    const [league,setLeague]=useState([])
    useEffect(()=>{
        getteambyleague();
    },[])
    const getteambyleague=async()=>{
        try{
            let data =await Api.get('/v3/teams',{
                params: {league: id, season: '2020'}
            });
            setLeague(data.data.response)
            console.log(data.data.response[0].team.id)
        }catch(err){
            console.log(err)
        }

    }

    return (
        <div>
            {
                id
            }
            {
                league.map(leag=>{
                    console.log(leag.team.id)
                    return (<Link to={`/showsquad/${leag.team.id}`}><div key={leag.team.id}>{leag.team.name}</div></Link>)
                    
                })
            }
        </div>
    )

}

export default Showteams
