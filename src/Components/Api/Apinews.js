import axios from "axios";


export default axios.create({
    baseURL:'https://newsapi.org/v2/top-headlines?country=il&category=sports&apiKey=324395ee3bc14e18a1f8caed4d344383',

  })