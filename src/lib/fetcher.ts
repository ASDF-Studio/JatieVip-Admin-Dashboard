import axios from 'axios'

export const fetcher = (url: string) => axios.post(url).then((res) => res.data)
