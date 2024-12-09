import axios from "axios"

interface createAlbumProps {
  name: string
  artistKey: string
  releaseDate: number
}

export async function createAlbum({ name, artistKey, releaseDate }: createAlbumProps) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset',
    {
      "asset": [
        {
          "@assetType": "album",
          "name": name,
          "artist": {
            "@assetType": "artist",
            "@key": artistKey
          },
          "year": releaseDate
        }
      ]
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

  return response.data[0]
}