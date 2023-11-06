import request from '@/utils/request';

export function topArtists(): Promise<TopArtistsResponse> {
  return request({
    url: '/top/artists',
    method: 'get',
  })
}
