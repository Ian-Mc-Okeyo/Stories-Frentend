import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryNav = ()=>{
    const [subCategories, setSubCategories] = useState([]);
    const baseurl = 'http://127.0.0.1:8000/api/';
    const {category} = useParams()
    console.log(category)

    useEffect(()=>{
      axios.get(baseurl+'subcategories/').then((resp)=>{
        console.log(resp.data)
        setSubCategories(resp.data)
      }).catch((err)=>{
        console.error(err)
      })
    }, [])

    return(
        <header className="site-header">
                <nav className="navbar navbar-expand-md navbar-dark categoryNav" style={{background: 'white', padding: '15px'}}>
                  <div className="container">
                    <Link to = '/'className="navbar-brand mr-4"><b style={{color: '#012559', fontWeight: '400'}}>Editor's Notes</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggle">
                      
                      <div className="navbar-nav ms-auto" style={{textAlign: 'right'}}>                        
                            <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color: '#012559'}}>
                                Categories
                              </a>
                              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {
                                  subCategories.map((subCategory, key)=>{
                                    return(
                                      <li key={key}><Link className="dropdown-item" to={'/'+category+'/'+subCategory.name+'/'}>{subCategory.name}</Link></li>
                                    )
                                  })
                                }
                              </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/reading-list' style={{color: '#012559'}}>Reading List</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" role="button" to='/tenant-login' style={{color: '#012559'}}>Reflection</Link>
                            </li>
                      </div>
                    </div>
                  </div>
                </nav>
        </header>
    );
};

export default CategoryNav;