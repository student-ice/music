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