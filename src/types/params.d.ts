interface Params {
  limit?: number;
  offset?: number;
}

interface TopPlaylistParams extends Params {
  cat: string;
  order?: 'new' | 'hot';
}

interface PlaylistDetailParams {
  id: string | string[];
}

interface MusicUrlParams {
  id: number | number[];
}

interface SongDetailParams {
  ids: string
}