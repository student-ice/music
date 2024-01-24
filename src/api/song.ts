import request from '@/utils/request';

// 获取推荐新歌
export function newSong(params: Params): Promise<NewSongResult> {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    noCookie: true,
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
    noCookie: true,
    params,
  })
}

// 获取歌词
export async function getLyric(params: LyricParams): Promise<LyricResult> {
  return request({
    url: '/lyric',
    method: 'get',
    params,
  })
}

export interface LyricParams {
  id: number;
}
export interface SongDetailResult {
  code: number;
  songs: Track[];
}

export interface LyricResult {
  code: number;
  lrc: {
    lyric: string;
  };
}