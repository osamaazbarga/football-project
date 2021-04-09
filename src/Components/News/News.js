import React, { useEffect,useState } from 'react'
import Apinews from '../Api/Apinews'
import './News.css'


const News =()=>{

    const [getnews,setGetnews]=useState([])
    const [getnewss,setGetnewss]=useState([])

    useEffect(()=>{
        const timerId=setTimeout(() => {
            getnewapi();
            setGetnewss(getnews)
        }, 2000);
        return()=>{
            clearTimeout(timerId)
        };
    },[getnews])
    const getnewapi=async()=>{
        try{
            let data =await Apinews.get('');
            setGetnews(data.data.articles)
            console.log(data.data.articles)
        }catch(err){
            console.log(err)
        }
    }
    const Rendernews=()=>{
        return getnewss.map((ne,i)=>{
            let rr=i<2?(<div key={i} className="mainnews">
            <a href={ne.url}><img src={ne.urlToImage} alt='main'/>
            <div className="contentmain">
                <h3>{ne.title}</h3>
                <p>{ne.description}</p>
            </div></a>
        </div>):<div key={i} className="secondnews">
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
