import './index.css'
import {useNavigate} from 'react-router'
const NotFound=()=>{
    const navigate=useNavigate();
    const onClickNotFoundBtn=()=>{
        navigate('/');
    }
    return(
        <>
        <div className="notfound-card">
            <h1 style={{color:'white', fontWeight:500,fontSize:'50px'}}>Lost Your Way ?</h1>
            <p style={{color:'white',marginTop:'20px',marginBottom:'20px', width:'450px',textAlign:'center',fontWeight:'normal',fontSize:'20px'}}>we are sorry the page you requested could not be found Please go back to the homepage.</p>
            <button onClick={onClickNotFoundBtn} style={{paddingLeft:'20px',paddingRight:'20px',paddingTop:'10px',paddingBottom:'10px',fontWeight:'500',color:'#171F46',fontSize:'12px',backgroundColor:'white',borderRadius:'3px',}}>Go to Home</button>
        </div>
        </>

    )
    
}
export default NotFound;