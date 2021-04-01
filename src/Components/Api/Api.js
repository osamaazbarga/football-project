import axios from "axios";


export default axios.create({
    baseURL:'https://api-football-v1.p.rapidapi.com',
    headers:{
        'x-rapidapi-key': '81771d39bdmsh7d0670267a84583p193209jsncc2cf17b359b',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  })