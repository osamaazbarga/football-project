import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import{Link} from 'react-router-dom'

import Api from '../Api/Api'

import './H2h.css'
import 'semantic-ui-css/semantic.min.css'

import { Dropdown } from 'semantic-ui-react'
import { Container, Header, List } from 'semantic-ui-react'

const H2h =()=>{
    const [country,setCountry]=useState([])
    const [chooseCountry,setChooseCountry]=useState(null)

    const [league,setleague]=useState([])
    const [chooseleague,setChooseleague]=useState(null)

    const [team,setTeam]=useState([])
    const [chooseteam,setChooseteam]=useState(null)


    useEffect(() => {
        countries();
    }, [])
    useEffect(() => {
        leagues();
    }, [chooseCountry])

    useEffect(() => {
        teams();
    }, [chooseleague])


    const countries=async()=>{
        try{
            let data =await Api.get(`/v3/countries`);
            //setCountry(data.data.response)

            let arr=[];
            let newarr;
            let countryarr=data.data.response;
            console.log(countryarr);
            for (let i = 0; i < countryarr.length; i++) {

                    newarr={key:countryarr[i].name,value:countryarr[i].name,flag:countryarr[i].code,text:countryarr[i].name}
                    arr.push(newarr);

            }
            setCountry(arr)
        }catch(err){
            console.log(err)
        }

    }

    const leagues=async()=>{
        try{
            let data =await Api.get(`v3/leagues?country=${chooseCountry}`);
            console.log(data.data.response)
            //setCountry(data.data.response)

            let arr=[];
            let newarr;
            let leaguearr=data.data.response;
            // console.log(leaguearr);
            for (let i = 0; i < leaguearr.length; i++) {
                
                    newarr={key:
                        leaguearr[i].league.id,
                        value:leaguearr[i].league.id,
                        image:{avatar:true,src:leaguearr[i].league.logo},
                        text:leaguearr[i].league.name}
                    arr.push(newarr);
                
            }
            setleague(arr)
            console.log(arr);

        }catch(err){
            console.log(err)
        }
    }

    const teams=async()=>{
        try{
            let data =await Api.get(`/v3/standings?season=2020&league=${chooseleague}`);
            //setCountry(data.data.response)
            console.log(chooseleague)

            let arr=[];
            let newarr;
            let teamarr=data.data.response[0].league.standings[0];
            console.log(teamarr);
            for (let i = 0; i < teamarr.length; i++) {

                newarr={key:
                    teamarr[i].team.id,
                    value:teamarr[i].team.id,
                    image:{avatar:true,src:teamarr[i].team.logo},
                    text:teamarr[i].team.name}
                arr.push(newarr);

            }
            setTeam(arr)
            console.log(arr);
        }catch(err){
            console.log(err)
        }

    }

    // handleChange = (e, { value }) => console.log(value);
    const handleChangeCountry=(e,{value})=>{
        console.log(value)
        setChooseCountry(value)

    }

    const handleChangeLeague=(e,{value})=>{
        console.log(value)
        setChooseleague(value)
    }

    const handleChangeTeam=(e,{value})=>{
        console.log(value)
        setChooseteam(value)
    }


    const Showcountries=()=>{
        return <div className="dropdowncountry"><Dropdown

            placeholder='Select Country'
            fluid
            search
            selection
            value={chooseCountry}
            options={country}
            onChange={handleChangeCountry}
        />

        <Dropdown

            placeholder='Select League'
            fluid
            search
            selection
            value={chooseleague}
            options={league}
            onChange={handleChangeLeague}
        />

        <Dropdown

            placeholder='Select Team'
            fluid
            search
            selection
            value={chooseteam}
            options={team}
            onChange={handleChangeTeam}
        />
        </div>
        // return (
        //     <div>
        //         <select id = "myList" onchange = {choosecpuntry()} >
        //         <option value="0"> ---Choose country--- </option>
        //             {
        //                 country.map((co,i)=>{
        //                     return (<option value={co.code} className="countryname">
        //                         {co.name}
        //                     </option>)
        //                 })
        //             }
        //         </select>
        //     </div>
            
        // )
        
        // return country.map((co,i)=>{
        //     if(co.code!='XK'){
        //         return <div key={i} className="bigcontainer">
        //         <div className="countrycontainer">
        //             <div className="country">
        //                 <img src={co.flag}/>
        //                 <span>{co.name}</span>
        //             </div>

        //         </div>
        //     </div>
        //     }
            
        // })
    }

    return (
        <div>
            <Showcountries/>
            <div>{chooseCountry}</div>
        </div>
    )

}

export default H2h
