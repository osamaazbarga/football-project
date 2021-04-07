import React, { useEffect,useState } from 'react'
import Apinews from '../Api/Apinews'
import './News.css'


const News =()=>{

    const [getnews,setGetnews]=useState([])
    useEffect(()=>{
        getnewapi();

    },[])
    const getnewapi=async()=>{
        try{
            let data =await Apinews.get('');
            setGetnews(data.data.articles)
            // console.log(data.data.articles)
        }catch(err){
            console.log(err)
        }
    }
    const Rendernews=()=>{
        // return(
        //     <div className="news">

        //     </div>
        // )

        return getnews.map((ne,i)=>{
            let rr=i<2?(<div key={i} className="mainnews">
            <a href={ne.url}><img src={ne.urlToImage} alt='main'/>
            <div className="contentmain">
                <h3>{ne.title}</h3>
                <p>{ne.description}</p>
            </div></a>
        </div>):<div className="secondnews">
        {/* <a href={ne.url}>
            <div className="contentsecond">
                <h3>{ne.title}</h3>
                <p>{ne.description}</p>
            </div><img src={ne.urlToImage} alt='second'/></a> */}
        </div>
            
            return rr
        })
    }
    return (
        <div className="news">
            {<Rendernews/>}
        </div>
    )

}

export default News
