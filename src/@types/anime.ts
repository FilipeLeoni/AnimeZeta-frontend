export interface AnimeTypes {
  mal_id: number;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  duration: string;
  favorites: number;
  genres: GenreTypes[];
}

export interface GenreTypes {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ReviewTypes {
  mal_id: number;
  url: string;
  type: string;
  date: string;
  review: string;
  score: number;
  tags: string[];
  user: {
    url: string;
    username: string;
    images: {
      jpg: {
        image_url: string;
      };
      webp: {
        image_url: string;
      };
    };
  };
}
