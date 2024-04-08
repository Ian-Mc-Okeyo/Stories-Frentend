import React, {useState, useEffect} from 'react';
import NavBar from './navBar';
import { useFormik } from 'formik';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditorProfile = () =>{
    const [isLoading, setIsLoading] = useState(false)
    const [photo, setPhoto] = useState('')
    const user = useSelector((state)=>state.auth.user)
    const navigate = useNavigate()
    const baseurl = 'http://127.0.0.1:8000/api/';
    console.log(user)

    const onSubmit = () =>{
        setIsLoading(true)
        let formData = new FormData()
        formData.append('photo', photo)
        formData.append('name', values.first_name + ' ' + values.last_name)
        formData.append('bio', values.bio)
        formData.append('user', user.id)

        axios.post(baseurl+'user-editor/'+ user.username +'/', formData).then((resp)=>{
            console.log(resp.data)
            setIsLoading(false)
            navigate('/category')
        }).catch((err)=>{
            console.error(err)
            setIsLoading(false)
        })
    } 
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            bio: ''
        },
        onSubmit
    })
    return(
        <>
            <NavBar/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className='container'>
                <div className='row justify-content-around'>
                    <div className='content-section content col-md-5'>
                        <form>
                                <label>First Name</label>
                                <input
                                    type='text'
                                    name='first_name'
                                    className='form-control'
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label>Last Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='last_name'
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            <label>Profile Photo</label>
                            <input
                                type='file'
                                name='photo'
                                className='form-control'
                                onChange={(e)=>setPhoto(e.target.files[0])}
                            />
                            <label>Short Bio</label>
                            <textarea 
                                className='form-control'
                                name='bio'
                                value={values.bio}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></textarea>
                            <br/>
                            <button className="btn btn-outline-primary" type="submit" disabled={isLoading} style={{borderRadius: '0.5rem'}} onClick={handleSubmit}> {isLoading ? <ReactLoading type="spin" color="#012559" height={25} width={25} />: "Submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditorProfile;