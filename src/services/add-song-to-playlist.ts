import axios from "axios"

interface editArtistProps {
  key: string
  songs: {
    "@assetType": string,
    "@key": string
  }[]
}

export async function addSongToPlaylist({ key, songs }: editArtistProps) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/updateAsset',
    {
      "update":
        {
          "@assetType": "playlist",
          "@key": key,
          "songs": songs
        }
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
  
  return response.data
}