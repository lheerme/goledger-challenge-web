import axios from "axios"

interface editAlbumProps {
  key: string
  year: number
}

export async function editAlbum({ key, year }: editAlbumProps) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/updateAsset',
    {
      "update":
        {
          "@assetType": "album",
          "@key": key,
          "year": year
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