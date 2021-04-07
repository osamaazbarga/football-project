import axios from "axios";


export default axios.create({
    baseURL:'https://api.allorigins.win/raw?url=https://api.footystats.org/league-list?key=test85g57&chosen_leagues_only=true',

  })