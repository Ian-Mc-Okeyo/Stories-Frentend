import React, {useState} from 'react';
import NavBar from './navBar';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../Slices/auth';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading'

const Login = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const baseurl = 'http://127.0.0.1:8000/api/';
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = () =>{
        setIsLoading(true)
        axios.post(baseurl+'login/', {
            username: values.email,
            password: values.password
        }).then((resp)=>{
            console.log(resp.data)
            dispatch(setUser(resp.data.user))
            dispatch(setToken(resp.data.token))
            setIsLoading(false)
            navigate('/category')
        }).catch((err)=>{
            console.error(err)
            setIsLoading(false)
        })
    }
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: '',
            password: ''
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
            <br/>
            <br/>
            <div className='container'>
                <div className='row justify-content-around'>
                    <div className='content-section content col-md-4'>
                        <form>
                            <label>Email</label>
                            <input
                                type='email'
                                name='email'
                                className='form-control'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <label>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <br/>
                            <button className="btn btn-outline-primary" type="submit" disabled={isLoading} style={{borderRadius: '0.5rem'}} onClick={handleSubmit}> {isLoading ? <ReactLoading type="spin" color="#012559" height={25} width={25} />: "Login"}</button>
                            <div className="pt-3">
                                <small className="text-muted">
                                    Have No Account?<Link className="ml-2" to='/register'>Register</Link>
                                </small>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Login;