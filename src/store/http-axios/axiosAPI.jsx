import axios from "axios";
import store from "..";
// Ajouter l'url de base par defaut a axios
const http = axios.create({
    baseURL: import.meta.env.VITE_APP_HOST
})

//Recuperer automatiquement le token apres authentification

http.interceptors.request.use(config => {
    //Recuperer le token depuis le store
    const { token } = store.getState().auth

    //Ajouter le token a la requete
    config.headers = {
        'Authorization': token ? `Bearer ${token}` : '',
    }

    return config
})

export default http