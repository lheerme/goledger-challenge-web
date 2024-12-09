import axios from "axios"

interface deleteAssetProps {
  key: string
}

export async function deleteAsset({ key }: deleteAssetProps) {
  const response = await axios.post(
    'http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/deleteAsset',
    {
      "key":
        {
          "@key": key,
        },
      "cascade": true
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