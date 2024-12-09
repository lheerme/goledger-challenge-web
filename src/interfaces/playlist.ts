export interface Playlist {
  "@assetType": string
  "@key": string
  "@lastTouchBy": string
  "@lastTx": string
  "@lastUpdated": string
  name: string
  private: boolean
  songs: {
    "@assetType": string
    "@key": string
  }[]
}