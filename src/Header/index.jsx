import './index.css'
import {Link} from 'react-router'
import Home from '../Home'
import Popular from '../Popular'
import { FiSearch } from 'react-icons/fi'
import Search from '../Search'
import Wishlist from '../Wishlist'
const Header=()=>{
    return(
        <>
        <div className="header-container">
            <div className="header-card1">
                <Link to="/">
                <h1 className="header-h1">NETFLIX</h1>
                </Link>
                
                <Link to="/">
                <p style={{fontWeight:'500'}} className="header-p1">Home</p>
                </Link>
                <Link to="/popular">
                <p className="header-p1">Popular</p>
                </Link>
            </div>
            <div className="header-card1">
                <Link to="/search"><FiSearch className="header-search"color="white" /></Link>
                <Link to="/wishlist">
                <p className="header-p1" style={{paddingRight:'10px',paddingLeft:'3px'}}>Wishlist</p>
                </Link>
                <Link to="/account"><img className="header-logo" src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo'/></Link>
            </div>
        </div>
       
        </>
    )
}
export default Header;