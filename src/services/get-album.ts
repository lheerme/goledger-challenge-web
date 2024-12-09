import axios from "axios"
import { Album } from "../interfaces/album"

export async function getAlbum(albumKey: string) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search',
    {
      'query': {
        'selector': {
          '@assetType': 'album',
          '@key': albumKey
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

  const result: Album[] = await response.data.result

  return result[0]
}