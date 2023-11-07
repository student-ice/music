interface Params {
  limit?: number;
  offset?: number;
}

interface TopPlaylistParams extends Params {
  cat: string;
  order?: 'new' | 'hot';
}