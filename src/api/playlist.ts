import request from '@/utils/request';

export function recommendPlaylists(params: Params): Promise<RecommendPlaylistData> {
  return request.get('/personalized', { params });
}

// 歌单,网友精选碟
export function topPlaylists(params: TopPlaylistParams): Promise<TopPlaylistData> {
  return request.get('/top/playlist', { params });
}

// 获取歌单详情
export function playlistDetail(params: PlaylistDetailParams): Promise<PlaylistDetailData> {
  return request.get('/playlist/detail', { params });
}

// 获取歌单所有歌曲
export function playlistTrackAll(params: PlaylistTrackAllParams): Promise<PlaylistTrackAllData> {
  return request.get('/playlist/track/all', { params });
}

interface PlaylistTrackAllParams extends Params {
  id: number | string;
}

export interface PlaylistTrackAllData {
  code: number;
  songs: Track[];
}