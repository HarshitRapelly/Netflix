import './index.css'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import { useWishlist } from '../WishlistContext'

const Login=()=>{
    const navigate= useNavigate();
    const { clearWishlist } = useWishlist();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [isErrorMsg, setIsErrorMsg] = useState(false);

    

    const onChangeUsername=(event)=>{
        setUsername(event.target.value);
    }
    const onChangePassword=(event)=>{
        setPassword(event.target.value);
    }
    const onSubmitForm= async (event)=>{
        event.preventDefault();
        const userDetails = { username, password };
        const loginUrl = 'https://apis.ccbp.in/login';
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        };
        const response = await fetch(loginUrl, options);
        if (response.ok) {
            
            const data = await response.json();
            Cookies.set('jwt_token', data.jwt_token);
            navigate('/');
            
        } else {
            const errorData = await response.json();
            if (errorData.error_msg) {
                setIsErrorMsg(true)
               setErrormsg(errorData.error_msg)
            }
        }
    }

    return(
        <>
        <div className="login-main-container">
            <h1 className="login-h1">NETFLIX</h1>
            <form className="login-card-container" onSubmit={onSubmitForm}>
                <h1 className="login-h2">Login</h1>
                <label htmlFor="username" className="login-label">USERNAME</label>
                <input type="text" className="login-input" placeholder="Enter Username" value={username} onChange={onChangeUsername} />
                <label htmlFor="password" className="login-label">PASSWORD</label>
                <input type="password" className="login-input" placeholder="Enter Password" value={password} onChange={onChangePassword} />
                {isErrorMsg && <p className="login-error-msg">*{errormsg}</p>}
                <button className="login-section-btn" type="submit">Login</button>
            </form>
        </div>
        </>
    )
}
export default Login;