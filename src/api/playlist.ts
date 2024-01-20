import request from '@/utils/request';

export function recommendPlaylists(params: Params): Promise<RecommendPlaylistData> {
  return request({
    url: '/personalized',
    method: 'get',
    noCookie: true,
    params,
  });
}

// 歌单,网友精选碟
export function topPlaylists(params: TopPlaylistParams): Promise<TopPlaylistData> {
  return request({
    url: '/top/playlist',
    method: 'get',
    noCookie: true,
    params,
  });
}

// 获取歌单详情
export function playlistDetail(params: PlaylistDetailParams): Promise<PlaylistDetailData> {
  return request({
    url: '/playlist/detail',
    method: 'get',
    noCookie: true,
    params,
  });
}

// 获取歌单所有歌曲
export function playlistTrackAll(params: PlaylistTrackAllParams): Promise<PlaylistTrackAllData> {
  return request({
    url: '/playlist/track/all',
    method: 'get',
    noCookie: true,
    params,
  });
}

interface PlaylistTrackAllParams extends Params {
  id: number | string;
}

export interface PlaylistTrackAllData {
  code: number;
  songs: Track[];
}