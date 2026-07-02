import axios from 'axios'
import { API_SPORTS_KEY } from '@env'

export const footballApi = axios.create({
  baseURL: 'https://api.football-data.org/v4',
  headers: {
    'X-Auth-Token': API_SPORTS_KEY
  },
})