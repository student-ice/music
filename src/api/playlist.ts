import request from '@/utils/request';

export function recommendPlaylists(params: Params): Promise<RecommendPlaylistData> {
  return request.get('/personalized', { params });
}
