import request from '@/utils/request';

export function topArtists(): Promise<TopArtistsResponse> {
  return request({
    url: '/top/artists',
    method: 'get',
    noCookie: true,
  })
}

interface TopArtistsResponse {
  "code": number,
  "more": boolean,
  "artists": {
    "name": string,
    "id": number,
    "briefDesc": string,
    "picUrl": string,
    "img1v1Url": string,
    "albumSize": number,
    "alias": Array<string>,
    "trans": string,
    "musicSize": number,
    "topicPerson": number,
    "followed": false,
    "fansCount": number
  }[]
}
