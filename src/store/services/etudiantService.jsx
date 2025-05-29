/*Ce fichier contient le CRUD pour la table etudiant*/

import http from "../http-axios/axiosAPI"

export const addStudent = async (student) => {
    const response = await http.post('/etudiants', student)
    return response.data
}

export const deleteStudent = async (id) => {
    const response = await http.delete(`/etudiants/${id}`)
    return response.data
}

export const getStudentById = async (id) => {
    const response = await http.get(`/etudiants/${id}`)
    return response.data
}

export const getStudentList = async () => {
    const response = await http.get(`/etudiants`)
    return response.data
}
export const updateStudent = async (id, student) => {
    const response = await http.put(`/etudiants/${id}`, student)
    return response.data
}

