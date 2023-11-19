import request from '@/utils/request';

export function newSong(params: Params): Promise<NewSongResult> {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params,
  })
}