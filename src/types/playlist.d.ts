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
  alg: string;
}

interface RecommendPlaylistData {
  hasTaste: boolean;
  code: number;
  category: number;
  result: PlaylistDataResult[];
}

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