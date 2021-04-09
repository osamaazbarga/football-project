
import './Header.css'
import logo from '../Img/logo.png'
import{Link} from 'react-router-dom'




const Header =()=>{
   

    return (
        <header>
            <div className="logo"><img src={logo} alt="logo"/></div>
            <div className="navbar">
                <div className="links">
                <Link to="/" className="item">Home</Link>
                <Link to="/search" className="item">Search</Link>
                <Link to="/h2h" className="item">Head To Head</Link>
                
                </div>
               
                

            </div>
        </header>
    )

}

export default Header
