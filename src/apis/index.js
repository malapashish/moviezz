import axios from 'axios';

export const movieDbAPI = axios.create({
    baseURL :  `https://api.themoviedb.org/3`
})

export const imgAPI = 'https://images.tmdb.org/t/p/w1280';