export interface TvShowSearch {
  total:    string;
  page:     number;
  pages:    number;
  tv_shows: TvShow[];
}

export interface TvShow {
  id:                   number;
  name:                 string;
  permalink:            string;
  start_date:           string;
  end_date:             null | string;
  country:              string;
  network:              string;
  status:               Status;
  image_thumbnail_path: string;
}

export type Status = "Canceled/Ended" | "Ended" | "Running" | "To Be Determined" | "In Development" | "New Series" | "TBD/On The Bubble";


export interface TvShowDetailResult {
  tvShow: TvShowDetail;
}

export interface TvShowDetail extends TvShow {
  // the comments are from TvShow interface
  // id:                   number;
  // name:                 string;
  // permalink:            string;
  // start_date:           string;
  // end_date:             string|null;
  // country:              string;
  // status:               Status;
  // network:              string;
  // image_thumbnail_path: string;
  url:                  string;
  description:          string;
  description_source:   null;
  runtime:              number;
  youtube_link:         null;
  image_path:           string;
  rating:               number;
  rating_count:         string;
  countdown:            Episode | null;
  genres:               string[];
  pictures:             any[];
  episodes:             Episode[];
}

export interface Episode {
  season:   number;
  episode:  number;
  name:     string;
  air_date: Date;
}