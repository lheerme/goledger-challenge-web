import axios from "axios"

interface createSongProps {
  name: string
  albumKey: string
}

export async function createSong({ name, albumKey }: createSongProps) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset',
    {
      "asset": [
        {
          "@assetType": "song",
          "name": name,
          "album": {
            "@assetType": "album",
            "@key": albumKey
          }
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