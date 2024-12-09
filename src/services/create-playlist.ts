import axios from "axios"

interface createPlaylistProps {
  name: string
  isPrivate: boolean
}

export async function createPlaylist({ name, isPrivate }: createPlaylistProps) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset',
    {
      "asset": [
        {
          "@assetType": "playlist",
          "name": name,
          "songs": [],
          "private": isPrivate
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