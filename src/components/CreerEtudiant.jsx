import React, { useEffect, useState } from 'react'
import './etudiant.css'
import http from '../store/http-axios/axiosAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addStudent, updateStudent } from '../store/services/etudiantService'
function CreerEtudiant() {
    const [departments, setDepartments] = useState([])
    const navigate = useNavigate()

    /*Recuperation de l'etudiant depuis le store*/
    const etudiantCourant = useSelector(state => state.student.student)

    /*Recuperation de l'id lors de la mise a jour*/
    const { id } = useParams()

    const [etudiant, setEtudiant] = useState(etudiantCourant || {
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
        date_de_naissance: '',
        departmentId: '',
        photo: ''
    })

    /* Regex pour la validation */
    const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const nomRegex = /^[a-zA-Z]{4,}$/
    /*Objet pour la validation */
    const [erreur, setErreur] = useState({
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
        date_de_naissance: '',
        departmentId: '',
    })

    // Valider chaque champ avec des conditions donnees
    function validateField(field, value) {
        switch (field) {
            case 'prenom':
            case 'nom':
                if (!nomRegex.test(value)) setErreur(prev => ({ ...prev, [field]: `Le ${field} n'est pas valide` }))
                else setErreur(prev => ({ ...prev, [field]: '' }))
                break
            case 'email':
                if (!emailRegex.test(value)) setErreur(prev => ({ ...prev, [field]: `L'email n'est pas valide` }))
                else setErreur(prev => ({ ...prev, [field]: '' }))
                break
            case 'departmentId':
                if (isNaN(parseInt(value)) || parseInt(value) < 1) setErreur(prev => ({ ...prev, [field]: `L'id doit etre un nombre entier` }))
                else setErreur(prev => ({ ...prev, [field]: '' }))
                break
            case 'mot_de_passe':
                if (!mdpRegex.test(value)) setErreur(prev => ({ ...prev, [field]: `Le mot de passe n'est pas valide` }))
                else setErreur(prev => ({ ...prev, [field]: '' }))
                break
            // case 'date_de_naissance':
            //     if ()  setErreur(prev => ({ ...prev, [field]: `La date est incorrecte }))
            //     else setErreur(prev => ({ ...prev, [field]: '' }))
            //     break
            default:
                break
        }
    }

    // Verifier si un champ a une erreur pour l'afficher
    function fieldHasError(field) {
        if (erreur[field] && erreur[field] !== '') return true
        return false
    }

    // Verifier si toute la forme est valide avant l``envoi au serveur
    function isFormValid() {
       
        for (let err in erreur) {
            if (erreur[err]) return false
        }
        return true
    }

    function recupererDepartement() {
        http.get('/departments')
            .then(res => {
                setDepartments(res.data.data)
                // console.log("res", res)
            })
            .catch(e => console.log('erreur', e))
    }

    useEffect(recupererDepartement, [])

    function envoyerEtudiant(e) {
        e.preventDefault()
        const etudiantData = new FormData()
        for (let clef in etudiant) {
            etudiantData.append(clef, etudiant[clef])
        }
        // console.log('etudiant Data', etudiantData)
        if (id) {
            // http.put(`/etudiants/${id}`, etudiantData)
            isFormValid() && updateStudent(id, etudiantData)
                .then(res => {
                    // console.log("renvoi a l'accueil", res)
                    navigate('/')
                })
                .catch(err => {
                     // Mettre a jour l'objet des erreurs avec les erreurs du backend (si cela existait)
                     const bakendErrors = err.response.data.errors
                     //Creer un objet pour mettre les erreurs du backend dans le meme format que la variable errors (declares plus haut)
                     const backendError = {}
 
                     for (let error of bakendErrors) {
                         backendError[error.path] = error.msg
                     }
                     setErreur(erreur=>({...erreur,...backendError}))
                })
        } else {
            // http.post('/etudiants', etudiantData)
            isFormValid() && addStudent(etudiantData)
                .then(res => {
                    // console.log("renvoi a l'accueil", res)
                    navigate('/login')
                })
                .catch(err => {
                    // Mettre a jour l'objet des erreurs avec les erreurs du backend (si cela existait)
                    const bakendErrors = err.response.data.errors
                    //Creer un objet pour mettre les erreurs du backend dans le meme format que la variable errors (declares plus haut)
                    const backendError = {}

                    for (let error of bakendErrors) {
                        backendError[error.path] = error.msg
                    }
                    setErreur(erreur=>({...erreur,...backendError}))
                    // console.log('Erreur ajout etudiant', err.response.data.errors)
                })
        }

    }

    function recuperer(e) {
        const { name, id, value } = e.target
        setEtudiant(etat => ({ ...etat, [name]: value }))
        validateField(name, value)
        // console.log('evement', name, id, value)
        // console.log('etudiant apres', etudiant)
    }

    function recupererPhoto(e) {
        const { name, files } = e.target
        setEtudiant(etat => ({ ...etat, [name]: files[0] }))

        // console.log('evement', e.target)
        // console.log('etudiant apres', etudiant)
    }


    return (
        <main>
            <h1>Formulaire en React {id ?
                <span>(mise a jour d'etudiant)</span>
                : <span>(ajout d'etudiant)</span>}
            </h1>
            <form onSubmit={envoyerEtudiant} encType='multipart/form-data'>
                <div className='mb-3'>
                    <label htmlFor="prenom" className='form-label'>Prenom</label>
                    <input onChange={recuperer} type="text" value={etudiant.prenom} className={`form-control ${fieldHasError('prenom') && "is-invalid"}`} id="prenom" name="prenom" />
                    <div className={fieldHasError('prenom') ? "invalid-feedback" : ""}>{erreur.prenom}</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="nom" className='form-label'>Nom</label>
                    <input onChange={recuperer} className={`form-control ${fieldHasError('nom') && "is-invalid"}`} value={etudiant.nom} type="text" id="nom" name="nom" />
                    <div className={fieldHasError('nom') ? "invalid-feedback" : ""}>{erreur.nom}</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input onChange={recuperer} className={`form-control ${fieldHasError('email') && "is-invalid"}`} value={etudiant.email} type="email" id="email" name="email" />
                    <div className={fieldHasError('email') ? "invalid-feedback" : ""}>{erreur.email}</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="mot_de_passe" className='form-label'>Mot de passe</label>
                    <input onChange={recuperer} className={`form-control ${fieldHasError('mot_de_passe') && "is-invalid"}`} value={etudiant.mot_de_passe} type="password" id="mot_de_passe" name="mot_de_passe" />
                    <div className={fieldHasError('mot_de_passe') ? "invalid-feedback" : ""}>{erreur.mot_de_passe}</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="date_de_naissance" className='form-label'>Date de naissance</label>
                    <input onChange={recuperer} type="date" value={etudiant.date_de_naissance} className={`form-control ${fieldHasError('date_de_naissance') && "is-invalid"}`} id="date_de_naissance" name="date_de_naissance" />
                    <div className={fieldHasError('date_de_naissance') ? "invalid-feedback" : ""}>{erreur.date_de_naissance}</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="photo" className='form-label'>Photo de profile</label>
                    <input onChange={recupererPhoto} className='form-control' type="file" id="photo" name="photo" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="departmentId" className='form-label'>Departement</label>
                    <select onChange={recuperer} value={etudiant.departmentId} className={`form-select ${fieldHasError('departmentId') && "is-invalid"}`}  name="departmentId" id="departmentId">
                        <option value="">Choisir un departement</option>
                        {departments.map(depart => <option key={depart.id} value={depart.id}>{depart.nom}</option>)}
                    </select>
                    <div className={fieldHasError('departmentId') ? "invalid-feedback" : ""}>{erreur.departmentId}</div>
                </div>
                <button type='submit' className='btn btn-primary'>Envoyer</button>

            </form>
        </main>
    )
}

export default CreerEtudiant