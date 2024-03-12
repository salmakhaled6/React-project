import { Link } from 'react-router-dom';


function Welcome (){
    return(
        <div className="page">
            <h1 className="wel-h">Welcome!</h1>
            <p className="wel-p">We are delighted to have you here. Explore our offerings and <br /> discover a world of possibilities. Whether you're seeking information, entertainment,<br /> or inspiration, we aim to provide an enriching experience for all our visitors.</p>
            <button className="btn1" style={{ backgroundColor: 'purple', color: 'white', padding: '10px 20px', fontSize: '1.2rem', margin: '10px' }}>
  
             <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Have an Account?</Link>
             </button>

             <button className="btn2" style={{ backgroundColor: 'transparent' , color: 'purple', borderColor: 'purple', padding: '10px 20px', fontSize: '1.2rem', margin: '10px' }}><Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Get Started</Link></button>

           
        </div>
    )
}
export default Welcome