import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import{Link} from 'react-router-dom'

import Api from '../Api/Api'


const Showsquad =()=>{
    let {id_squad}=useParams();
    const [squad,setSquad]=useState([])
    useEffect(()=>{
        getsquadbyid();
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

    return (
        <div>
            {
                id_squad
            }
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