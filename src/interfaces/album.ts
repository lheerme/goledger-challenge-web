export interface Album {
  "@assetType": string
  "@key": string
  "@lastTouchBy": string
  "@lastTx": string
  "@lastUpdated": string
  artist: {
    "@assetType": string
    "@key": string
  }
  name: string
  year: number
}
