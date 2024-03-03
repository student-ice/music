import request from '@/utils/request';

export function topArtists(): Promise<TopArtistsResponse> {
  return request({
    url: '/top/artists',
    method: 'get',
    noCookie: true,
  }).then((res) => {
    res.artists = res.artists.map((artist) => {
      return {
        id: artist.id,
        name: artist.name,
        picUrl: artist.img1v1Url,

      }
    })
    return res;
  });
}

interface TopArtistsResponse {
  "code": number,
  "more": boolean,
  "artists": PlaylistBaseInfo[]
}
