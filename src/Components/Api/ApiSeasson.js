import axios from "axios";


export default axios.create({
    baseURL:'https://api.allorigins.win/raw?url=https://api.footystats.org/league-tables?key=test85g57&season_id=2012',

  })