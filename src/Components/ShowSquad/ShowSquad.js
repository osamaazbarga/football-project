import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import{Link} from 'react-router-dom'

import Api from '../Api/Api'

import './ShowSquad.css'


const Showsquad =()=>{
    let {id_squad}=useParams();
    const [squad,setSquad]=useState([])
    const [infoSquad,setInfoSquad]=useState([])

    useEffect(()=>{
        
        const timerId=setTimeout(() => {
            getsquadbyid();
        }, 1000);
        return()=>{
            clearTimeout(timerId)
        };

    },[])
    const getsquadbyid=async()=>{
        try{
            let data =await Api.get(`/v2/players/squad/${id_squad}/2020-2021`);
            setSquad(data.data.api.players)
            console.log(data.data.api.players)
        }catch(err){
            console.log(err)
        }

    }

    // const getsquadinfo=async()=>{
    //     try{
    //         let data =await Api.get(`/v3/teams?id=${id_squad}`);
    //         //setSquad(data.data.api.players)
    //         console.log(data.data.response[0].venue)
    //         setInfoSquad(data.data.response[0])
    //     }catch(err){
    //         console.log(err)
    //     }

    // }

    return (
        <div>
            

            

            <div className="squadtitle">Squad</div>
            {
                
                squad.map(sqd=>{
                    return (
                        <Link to={`/showplayer/${sqd.player_id}`}><div key={sqd.player_id}>{sqd.player_name}</div></Link>
                        )
                    
                })
            }
        </div>
    )

}

export default Showsquad