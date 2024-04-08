import React from 'react';
import NavBar from './navBar';

const Home = () =>{
    return(
        <>
            <NavBar/>
            <section id="home" className="templatemo-home">
                <div className="container">
                    <div className='overlay'></div>
                    <div className="row">
                        
                        <div className="col-md-2 col-sm-1"></div>
                        <div className="col-md-8 col-sm-10">
                            <h1 style={{textAlign: 'center', color:'#012559'}}>Experience Life <b className='header-box'>On Campus</b></h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;