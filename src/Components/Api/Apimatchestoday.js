import axios from "axios";


export default axios.create({
    baseURL:'https://api.allorigins.win/raw?url=https://api.footystats.org/todays-matches?key=test85g57&timezone=Israel',
    // proxy:'https://api.allorigins.win/raw?url=',

  })