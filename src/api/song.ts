import request from '@/utils/request';

// 获取推荐新歌
export function newSong(params: Params): Promise<NewSongResult> {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params,
  })
}

// 获取歌曲Url
export async function songUrl(params: MusicUrlParams): Promise<SongUrlResult> {
  return request({
    url: '/song/url',
    method: 'get',
    params,
  })
}

// 获取歌曲详情
export async function songDetail(params: SongDetailParams): Promise<SongDetailResult> {
  return request({
    url: '/song/detail',
    method: 'get',
    params,
  })

}
export interface SongDetailResult {
  code: number;
  songs: SongDetailSongs[];
}

export interface SongDetailSongs {
  al?: SongDetailSongsAl;
  ar?: SongDetailSongsAr[];
  dt?: number;
  id?: number;
  name?: string;
  publishTime?: number;
}

export interface SongDetailSongsAl {
  id: number;
  name: string;
  picUrl: string;
}

export interface SongDetailSongsAr {
  id?: number;
  name?: string;
}