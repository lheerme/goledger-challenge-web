import axios from "axios"

interface createArtistProps {
  name: string
  country: string
}

export async function createArtist({ name, country }: createArtistProps) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset',
    {
      "asset": [
        {
          "@assetType": "artist",
          "name": name,
          "country": country
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