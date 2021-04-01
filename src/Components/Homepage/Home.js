import React,{useState,useEffect} from 'react'
import{BrowserRouter,Route} from 'react-router-dom'
import{Link} from 'react-router-dom'
import Teams from '../Teams/Teams'
import Showteams from '../Teams/Showteam'
import H2h from '../H2h/H2h'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Api from '../Api/Api'
import './Home.css'



// const homepage =()=>{
//     // const [apileage,setApileage]=useState([])
//     const getApi=async()=>{
//         try{
//             let data =await Api.get('/v2/leagues/country/england/2018');
//             setApileage(data)
//             console.log(data.data.api)
//         }catch(err){
//             console.log(err)
//         }
//     }
//     getApi();
//     return (
//         <div></div>
//     )
// }
//England 39 Premier League
//France 61 leage 1
// Italy 135 Serie A
//Germany 78 Bundesliga 1
//Spain 140 Primera Division



const popularCountry=[39,61,140,78,135]
const Home =()=>{
    
    const [apileage,setApileage]=useState([]);
    const [popCountry,setPopCountry]=useState([]);
    const [byteam,setByteam]=useState([]);


    useEffect(()=>{
        getApi();
        getpopCountry();
        getteambyleague();
    },[])
    const getApi=async()=>{
        try{
            let data =await Api.get('/v3/leagues');
            setApileage(data)
            console.log(data.data.response)
        }catch(err){
            console.log(err)
        }

    }
    const getteambyleague=async()=>{
        try{
            let data =await Api.get('/v3/teams',{
                params: {league: '39', season: '2020'}
            });
            //setApileage(data)
            console.log(data)
        }catch(err){
            console.log(err)
        }

    }
    
    const getpopCountry=()=>{
        let arr=[]
        console.log(apileage.data.response.length);
        for (let i = 0; i < popularCountry.length; i++) {
            for (let j = 0; j < apileage.data.response.length; j++) {
                if(popularCountry[i]==apileage.data.response[j].league.id){
                    arr.push(apileage.data.response[j]);
                    break

                }
                
            }
            
        }
        setPopCountry(arr);
        console.log(popCountry);
    }
    const homepage =()=>{
        return (
            <div className="mainhomepage">
                {

                popCountry.map(pop=>{
                    console.log(pop);
                    return (
                        
                    <div className="leaguepop">
                        
                        <Link to={`/showteam/${pop.league.id}`}><img src={pop.league.logo}/></Link>

                    </div>
                    )
                })
                
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
                <Route path="/teams" component={Teams}/>
                <Route path="/h2h" component={H2h}/>
                <Route path="/showteam/:id" component={Showteams}/>


                <Footer/>
            </div>
            </BrowserRouter>
        </div>
    )

}

export default Home
