import request from '@/utils/request';

export function recommendPlaylists(params: Params): Promise<RecommendPlaylistResponse> {
  return request({
    url: '/personalized',
    method: 'get',
    noCookie: true,
    params,
  });
}

// 歌单,网友精选碟
export function topPlaylists(params: TopPlaylistParams): Promise<TopPlaylistResponse> {
  return request({
    url: '/top/playlist',
    method: 'get',
    noCookie: true,
    params,
  });
}

// 获取歌单详情
export function playlistDetail(params: PlaylistDetailParams): Promise<PlaylistDetailResponse> {
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

interface PlaylistTrackAllData {
  code: number;
  songs: Track[];
}

export interface PlaylistData {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
}

interface RecommendPlaylistResponse {
  hasTaste: boolean;
  code: number;
  category: number;
  result: {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    trackCount: number;
    highQuality: boolean;
  }[];
}

interface TopPlaylistResponse {
  playlists: PlaylistData[];
  total: number;
  code: number;
  more: boolean;
  cat: string;
}

export interface PlaylistDetailResponsePlaylist {
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  id: number;
  userId: number;
  name: string;
  description: string;
  creator: {
    nickname: string;
    userId: number;
    avatarUrl: string;
  };
  createTime: number;
  ordered: boolean;
  coverImgUrl: string;
  playCount: number;
  shareCount: number;
  subscribedCount: number;
  tags: string[];
  titleImageUrl: null;
  trackCount: number;
  trackIds: { id: number }[];
  trackNumberUpdateTime: number;
  tracks: Track[];
  trackUpdateTime: number;
  updateTime: number;
};

interface PlaylistDetailResponse {
  code: number;
  playlist: PlaylistDetailResponsePlaylist;
}