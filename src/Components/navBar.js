import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useFormik } from 'formik';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

const NavBar = ()=>{
    const [subCategories, setSubCategories] = useState([]);
    const baseurl = 'http://127.0.0.1:8000/api/';
    const [photo, setPhoto] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state)=>state.auth.user);


    useEffect(()=>{
      axios.get(baseurl+'subcategories/').then((resp)=>{
        console.log(resp.data)
        setSubCategories(resp.data)
      }).catch((err)=>{
        console.error(err)
      })
    }, [])

    const onSubmit = () =>{
      setIsLoading(true)
      let formData = new FormData()
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('subcategory', values.subCategory);
      formData.append('content', values.content);
      formData.append('excerpt', values.excerpt);
      if(photo){
        formData.append('image', photo)
      }
      axios.post(baseurl+'create-story/'+user.username+'/', formData).then((resp)=>{
        console.log(resp.data)
        setIsLoading(false)
      }).catch((err)=>{
        console.error(err)
        setIsLoading(false)
      })

    }

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
      initialValues: {
          title: '',
          category: '',
          subCategory: '',
          content: '',
          excerpt: '',
      },
      onSubmit
    })
    return(
      <>
        <header className="site-header">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{background: '#012559', padding: '15px'}}>
                  <div className="container">
                    <Link to = '/'className="navbar-brand mr-4"><b style={{color: '#03c62e', fontWeight: '400'}}>BI Stories</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggle">
                      
                      <div className="navbar-nav ms-auto" style={{textAlign: 'right'}}>                        
                              <li className="nav-item">
                                <Link className="nav-link" to={'/personal/all'} style={{color: '#fff'}} state={'personal'}>Personal Life</Link>
                              </li>
                              <li className="nav-item">
                                <Link className="nav-link" to={'/social/all'} style={{color: '#fff'}} state={'social'}>Social Life</Link>
                              </li>
                            <li className="nav-item">
                              <Link className="nav-link" to={'/professional/all'} style={{color: '#fff'}} state={'professional'}>Professional Life</Link>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{color: '#fff'}}>Create Post</a>
                            </li>
                            {
                              user?<li className="nav-item">
                                    <Link className="nav-link" to='/login' style={{color: '#fff'}}>Login</Link>
                                  </li>:<li className="nav-item">
                                    <Link className="nav-link" to='/login' style={{color: '#fff'}}>Logout</Link>
                                  </li>
                            }
                      </div>
                    </div>
                  </div>
                </nav>
        </header>

        <div class="modal fade" id="exampleModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body row justify-content-around">
                <form className='col-md-11'>
                  <fieldset>
                    <div>
                      <TextField 
                        required
                        label="Title" 
                        variant="standard" 
                        sx = {{width: '50%'}}
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <br/>
                    <div className='row'>
                      <div className='col-md-6'>
                        <FormControl variant="standard" sx={{width: '100%' }}>
                          <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="category-select-standard"
                            name='category'
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Category"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value='personal'>Personal Life</MenuItem>
                            <MenuItem value='social'>Social Life</MenuItem>
                            <MenuItem value='professional'>Professional Life</MenuItem>
                          </Select>
                      </FormControl>
                      </div>
                      <div className='col-md-6'>
                        <FormControl variant="standard" sx={{width: '100%' }}>
                          <InputLabel id="demo-simple-select-standard-label">Sub Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="sub-category-select-standard"
                            name='subCategory'
                            value={values.subCategory}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Sub Category"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {
                              subCategories.map((subcategory, key)=>{
                                return(
                                  <MenuItem value={subcategory.id} key={key}>{subcategory.name}</MenuItem>
                                )
                              })
                            }
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <br/>
                    <br/>
                    <label>Image</label>
                    <input
                      type = 'file'
                      className='form-control'
                      style={{width: '50%'}}
                      name='photo'
                      onChange={(e)=>setPhoto(e.target.files[0])}
                    />
                    <br/>
                    <div>
                      <TextField
                        id="outlined-multiline-static-excerpt"
                        required
                        fullWidth
                        label="Excerpt"
                        multiline
                        rows={2}
                        name='excerpt'
                        value={values.excerpt}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <br/>
                    <div>
                      <TextField
                        id="outlined-multiline-static-content"
                        required
                        fullWidth
                        label="Content"
                        multiline
                        rows={5}
                        name='content'
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  
                  </fieldset>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-outline-primary" type="submit" disabled={isLoading} style={{borderRadius: '0.5rem'}} onClick={handleSubmit}> {isLoading ? <ReactLoading type="spin" color="#012559" height={25} width={25} />: "Submit"}</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default NavBar;