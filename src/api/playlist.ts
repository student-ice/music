import request from '@/utils/request';

export function recommendPlaylists(params: Params): Promise<RecommendPlaylistData> {
  return request.get('/personalized', { params });
}

// 歌单,网友精选碟
export function topPlaylists(params: TopPlaylistParams): Promise<TopPlaylistData> {
  return request.get('/top/playlist', { params });
}

export function playlistDetail(params: PlaylistDetailParams): Promise<PlaylistDetailData> {
  return request.get('/playlist/detail', { params });
}
