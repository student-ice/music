interface PlaylistDataResult {
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

// 推荐歌单数据
interface RecommendPlaylistData {
  hasTaste: boolean;
  code: number;
  category: number;
  result: PlaylistDataResult[];
}

// 网友精选碟数据

interface TopPlaylistData {
  playlists: PlaylistDataResult[];
  total: number;
  code: number;
  more: boolean;
  cat: string;
}

interface TopPlaylistDataResult {
  name: string;
  id: number;
  trackNumberUpdateTime: number;
  status: number;
  userId: number;
  createTime: number;
  updateTime: number;
  subscribedCount: number;
  trackCount: number;
  coverImgUrl: string;
  description: string;
}

// 歌单详情数据

interface PlaylistDetailData {
  code: number;
  playlist: PlaylistDetailPlaylist;
}

interface PlaylistDetailPlaylist {
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  copied: boolean;
  coverImgId: number;
  id: number;
  userId: number;
  name: string;
  description: string;
  creator: Creator;
  createTime: number;
  ordered: boolean;
  coverImgUrl: string;
  playCount: number;
  shareCount: number;
  subscribedCount: number;
  tags: string[];
  titleImage: number;
  titleImageUrl: null;
  trackCount: number;
  trackIds: { id: number }[];
  trackNumberUpdateTime: number;
  tracks: Track[];
  trackUpdateTime: number;
  updateTime: number;
}

interface Creator {
  nickname: string;
  userId: number;
  avatarUrl: string;
}

interface Track {
  al: Al;
  ar: Ar[];
  cd: string;
  copyright: number;
  dt: number;
  fee: number;
  id: number;
  name: string;
}

interface TrackAl {
  id: number;
  name: string;
  picUrl: string;
}

interface TrackAr {
  id: number;
  name: string;
}