import React, { useEffect, useState } from 'react'
import http from '../store/http-axios/axiosAPI'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SetAllStudents, setStudent } from '../store/reducers/etudiant'
import { deleteStudent, getStudentList } from '../store/services/etudiantService'
function Home() {
  const [listEtudiant, setListEtudiant] = useState([])

  function getListEtudiant() {
    // http.get('/etudiants')
    getStudentList()
    .then(res => {
      dispatch(SetAllStudents(res.data))
      setListEtudiant(res.data)
    })
      .catch(err => console.log('Erreur de lecture liste des etudiants', err))
  }

  function supprimer(id) {
    // http.delete(`/etudiants/${id}`)
    deleteStudent(id)
    .then(res => {
        getListEtudiant()
        console.log(res)
      })
      .catch(e => console.log('Erreur lors de la suppression', e))
  }

  useEffect(getListEtudiant, [])

  const navigate = useNavigate()
  /*Fonction utilisee pour mettre a jour le store (redux)*/
  const dispatch = useDispatch()

  const allerMiseAJour = (etudiant) => {
    dispatch(setStudent(etudiant))
    navigate(`/ajout-etudiant/${etudiant.id}`)
  }

  return (
    <main>
      <h1>Liste des etudiants</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listEtudiant.map(etudiant =>
            <tr key={etudiant.id}>
              <td>{etudiant.nom}</td>
              <td>{etudiant.prenom}</td>
              <td>{etudiant.email}</td>
              <td><img crossOrigin='anonymous' src={etudiant.photo} alt={`${etudiant.prenom} ${etudiant.nom}`} /></td>
              <td><button className='btn btn-success' onClick={() => allerMiseAJour(etudiant)}>Editer</button>
                <button className='btn btn-primary'>Details</button>
                <button className='btn btn-danger' onClick={() => supprimer(etudiant.id)}>Supprimer</button>
              </td>

            </tr>)}
        </tbody>
      </table>

    </main>
  )
}

export default Home