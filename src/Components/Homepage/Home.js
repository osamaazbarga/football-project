import React,{useState,useEffect} from 'react'
import{BrowserRouter,Route} from 'react-router-dom'
import{Link} from 'react-router-dom'

import Showteams from '../Teams/Showteam'
import H2h from '../H2h/H2h'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Api from '../Api/Api'



import './Home.css'
import News from '../News/News'
import MatchesPerToday from '../MatchesToday/MatchesPerToday'
import ApiSeasson from '../Api/ApiSeasson'
import Showsquad from '../ShowSquad/ShowSquad'
import Showplayer from '../Showplayer/Showplayer'
import Search from '../Teams/Search'




const popularCountry=[39,61,140,78,135]
const Home =()=>{
    
    const [apileage,setApileage]=useState([]);
    const [popCountry,setPopCountry]=useState([]);
    // const [byteam,setByteam]=useState([]);


    useEffect(()=>{
        getApi();
        getpopCountry();
        //leaguelist();
        getsesson();
        

    },[])


    
    const getApi=async()=>{
        try{
            let data =await Api.get('/v3/leagues');
            setApileage(data)
        }catch(err){
            console.log(err)
        }

    }

    const getsesson=async()=>{
            try{
                let data  =await ApiSeasson.get('');
                console.log(data)
            }catch(err){
                console.log(err)
            }
            
    }


    
    
    const getpopCountry=()=>{
        let arr=[]
        console.log(apileage);
        if(apileage.data!=null){
            for (let i = 0; i < popularCountry.length; i++) {
                for (let j = 0; j < apileage.data.response.length; j++) {
                    if(popularCountry[i]===apileage.data.response[j].league.id){
                        arr.push(apileage.data.response[j]);
                        break
    
                    }
                    
                }
                
            }

        }
        setPopCountry(arr);
    }
    const homepage =()=>{
        return (
            <div className="mainhomepage">
                {
                    <News/>
                }
                {


                popCountry.map(pop=>{
                    return (

                            

                            <div key={pop.league.id} className="leaguepop">
                        
                                <Link to={`/showteam/${pop.league.id}`}><img src={pop.league.logo} alt="popleage"/></Link>

                        </div>
                        
                    
                    )
                })
                
                }

                {
                    <MatchesPerToday/>
                }
                </div>
        )
    }
    return (
        <div>
            <BrowserRouter>
            <div>
                <Header/>
                <Route path="/" exact component={homepage}/>
                <Route path="/search" component={Search}/>
                <Route path="/h2h" component={H2h}/>
                <Route path="/showteam/:id" component={Showteams}/>
                <Route path="/showsquad/:id_squad" component={Showsquad}/>
                <Route path="/showplayer/:id_player" component={Showplayer}/>





                <Footer/>
            </div>
            </BrowserRouter>
        </div>
    )

}

export default Home
