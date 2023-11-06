interface Artists {
  "name": string,
  "id": number,
  "picId": number,
  "img1v1Id": number,
  "briefDesc": string,
  "picUrl": string,
  "img1v1Url": string,
  "albumSize": number,
  "alias": Array<string>,
  "trans": string,
  "musicSize": number,
  "topicPerson": number,
  "picId_str": string,
  "img1v1Id_str": string,
  "followed": false,
  "fansCount": number
}

interface TopArtistsResponse {
  "code": number,
  "more": boolean,
  "artists": Array<Artists>
}