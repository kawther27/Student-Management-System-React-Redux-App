import React, { useState } from 'react'
import http from '../store/http-axios/axiosAPI'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/reducers/login'
import { useNavigate, Navigate, Link } from 'react-router-dom'

function Login() {
    const token = useSelector(state => state.auth.token)

    const [info, setInfo] = useState({
        email: '',
        mot_de_passe: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function connecter(evt) {
        evt.preventDefault()
        http.post('/login', info)
            .then(res => {
                navigate('/')
                dispatch(login(res.data))
            })
            .catch(err => console.log('err', err))
    }
    function handleChange(evt) {
        const { name, value } = evt.target
        setInfo(prev => ({ ...prev, [name]: value }))
    }

    // if (token) return <Navigate to='/' />

    return (
        <main>
            <form onSubmit={connecter}>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input onChange={handleChange} className='form-control' value={info.email} type="email" id="email" name="email" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="mot_de_passe" className='form-label'>Mot de passe</label>
                    <input onChange={handleChange} className='form-control' value={info.mot_de_passe} type="password" id="mot_de_passe" name="mot_de_passe" />
                </div>

                <button type='submit' className='btn btn-primary mr-4'>Envoyer</button>
                <Link to='/ajout-etudiant'>Creer un compte</Link>

            </form>
        </main>
    )
}

export default Login