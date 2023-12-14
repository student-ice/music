import request from '@/utils/request';

export function newSong(params: Params): Promise<NewSongResult> {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params,
  })
}

export async function songUrl(params: MusicUrlParams): Promise<SongUrlResult> {
  return request({
    url: '/song/url',
    method: 'get',
    params,
  })
}