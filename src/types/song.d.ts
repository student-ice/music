interface NewSongResult {
  category: number;
  code: number;
  result: SongResult[];
}

interface SongResult {
  alg: string;
  canDislike: boolean;
  copywriter: null;
  id: number;
  name: string;
  picUrl: string;
  song: SongData;
  trackNumberUpdateTime: null;
  type: number;
}

interface SongData {
  alias: string[];
  artists: SongArtist[];
  audition: null;
  commentThreadId: string;
  copyFrom: string;
  copyright: number;
  copyrightId: number;
  crbt: null;
  dayPlays: number;
  disc: string;
  duration: number;
  exclusive: boolean;
  fee: number;
  ftype: number;
  hearTime: number;
  id: number;
  mark: number;
  mvid: number;
  name: string;
  no: number;
  position: number;
  ringtone: string;
  score: number;
}

interface AlbumData {
  alias: string[];
  blurPicUrl: string;
  briefDesc: string;
  commentThreadId: string;
  company: string;
  companyId: number;
  copyrightId: number;
  description: string;
  id: number;
  mark: number;
  name: string;
  onSale: boolean;
  pic: number;
  picId: number;
  picId_str: string;
  picUrl: string;
  publishTime: number;
  size: number;
  songs: string[];
  status: number;
  subType: string;
  tags: string;
  transName: null;
  type: string;
}

interface SongArtist {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  id: number;
  img1v1Id: number;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picUrl: string;
  topicPerson: number;
  trans: string;
}
interface SongUrlResult {
  code: number;
  data: SongUrlData[];
}

interface SongUrlData {
  br?: number;
  canExtend?: boolean;
  code?: number;
  effectTypes?: null;
  encodeType?: string;
  expi?: number;
  fee?: number;
  flag?: number;
  freeTimeTrialPrivilege?: FreeTimeTrialPrivilege;
  freeTrialInfo?: null;
  freeTrialPrivilege?: FreeTrialPrivilege;
  gain?: number;
  id?: number;
  level?: string;
  md5?: string;
  payed?: number;
  peak?: number;
  podcastCtrp?: null;
  rightSource?: number;
  size?: number;
  time?: number;
  type?: string;
  uf?: null;
  url?: string;
  urlSource?: number;
}

interface FreeTimeTrialPrivilege {
  remainTime: number;
  resConsumable: boolean;
  type: number;
  userConsumable: boolean;
}

interface FreeTrialPrivilege {
  cannotListenReason: null;
  listenType: null;
  playReason: null;
  resConsumable: boolean;
  userConsumable: boolean;
}