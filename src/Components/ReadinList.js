import React, {useState, useEffect} from 'react';
import CategoryNav from './categoryNav';
import DefaultImg from './Assets/default.avif';
import NavBar from './navBar';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReadingList = () =>{
    const [lists, setLists] = useState([]);
    const baseurl = 'http://127.0.0.1:8000';
    const location = useLocation();
    //const {category, subCategory} = useParams();
    const user = useSelector((state)=>state.auth.user)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const windowSize = window.innerWidth;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(()=>{
        let url = baseurl+'/api/reading-list-get/'+user.id+'/';
        axios.get(url).then((resp)=>{
            setLists(resp.data)
            console.log(resp.data)
        }).catch((err)=>{
            console.error(err)
        })
    }, [])

    return(
        <>
            <NavBar/>
            <br/>
            <br/>
            <br/>
            <CategoryNav/>
            <br/>
            <br/>
            <br/>
            <div className='customContainer'>
                <h3 style={{marginLeft: '10px', color: '#012559'}}>My Reading List</h3>
                {
                    lists.map((list, key)=>{
                        if (windowSize >= 770){
                            return(
                                <div className='row postDisplay align-items-center justify-content-around'>
                                    <div className='col-2 col-md-2 imageContainer'>
                                        <img src={baseurl+list.story.editor.photo} className='displayImg'/>
                                    </div>
                                    <div className='col-7 col-md-7 blogPart'>
                                        <h3 style={{color: '#012559'}}>{list.story.title}</h3>
                                        <br/>
                                        <p>{list.story.editor.bio}
                                            <button class="btn btn-link btn-block text-left" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse'+key} aria-expanded="true" aria-controls="collapseOne" style={{textDecoration: 'none'}}>
                                                Read more
                                            </button>
                                        </p>
                                    </div>
                                    <div className='col-2 col-md-2 blogPart my-auto' style={{textAlign: 'center', color: '#012559'}}>
                                        <h4 style={{marginTop: '50px'}}>{list.story.editor.name}</h4>
                                        <h5>U-campas Media</h5>
                                    </div>
                                    <div className='col-md-1'>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            ...
                                        </IconButton>
    
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '20ch',
                                            },
                                            }}
                                        >
                                            
                                            <MenuItem onClick={handleClose}>
                                                <a>Share</a>
                                            </MenuItem>
                                            
                                        </Menu>
                                    </div>
                                    <div className='col-md-7 accordion' id="accordionExample"> 
                                        <div id={'collapse'+key} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <img src={baseurl+list.story.image} className='card-img-top'/>
                                                <p style={{textAlign: 'justify'}}>
                                                    <br/>
                                                    {list.story.content}
                                                </p>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }else{
                            return(
                             <article className="media content-section">
                                
                                <div className='row justify-content-left'>
                                    <div className='col-2' >
                                        <img  className="rounded-circle article-img" src={baseurl+list.story.editor.photo}/>
                                    </div>
                                    <div className="article-metadata col-9" style={{color: '#012559'}}>
                                        <b className="mr-2">{list.story.editor.name}</b><br/>
                                        <small className="text-muted">27-03-2022</small>
                                    </div>
                                </div>
                                <div className="media-body">
                                  <h3 style={{color: '#012559'}}>{list.story.title}</h3>
                                  <p style={{textAlign: 'justify'}}>{list.story.editor.bio}
                                            <button className="btn btn-link btn-block text-left" type="button" data-bs-toggle="collapse" data-bs-target={'#collapse'+key} aria-expanded="true" aria-controls="collapseOne" style={{textDecoration: 'none'}}>
                                                Read more
                                            </button>
                                    </p>
                                </div>

                                <div className='col-md-9 accordion' id="accordionExample"> 
                                        <div id={'collapse'+key} className="card collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <img src={baseurl+list.story.image} className='card-img-top'/>
                                            <div className="card-body">
                                               
                                                <p style={{textAlign: 'justify'}}>
                                                    {list.story.content}
                                                </p>    
                                            </div>
                                        </div>
                                    </div>
                            </article>
                            )
                        }
                        
                    })
                }
                <br/>
            </div>
        </>
    )
}

export default ReadingList;