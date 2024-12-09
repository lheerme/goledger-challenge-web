import axios from "axios"
import { Artist } from "../interfaces/artist"

export async function getArtists(query: string = '') {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search',
    {
      'query': {
        'selector': {
          '@assetType': 'artist',
          'name': {
            '$regex': `(?i)${query}`
          }
        },
      },
    },
    {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      auth: {
        username: import.meta.env.VITE_GOLEDGER_USERNAME,
        password: import.meta.env.VITE_GOLEDGER_PASSWORD
      }
    }
  )

  const result: Artist[] = await response.data.result

  return result
}