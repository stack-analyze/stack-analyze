export interface AboutApp {
  mainDeveloper: string;
  version: string;
  license: string;
}

export interface DeveloperList {
  name: string;
  roles: string[] | string;
}

export interface Youtube {
  youtubeChannel: string;
  recomendation: string;
}

export interface Twitch {
  user: string;
  details?: string;
}

export interface Projects {
  name: string;
  desc: string;
}
