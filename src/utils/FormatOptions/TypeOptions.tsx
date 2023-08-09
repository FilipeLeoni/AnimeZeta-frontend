export interface TypeOption {
  label: string;
  value: string;
}

const TypeOptions: TypeOption[] = [
  { label: "TV Show", value: "tv" },
  { label: "Movie", value: "movie" },
  { label: "OVA", value: "ova" },
  { label: "Music", value: "music" },
  { label: "Special", value: "special" },
];

export default TypeOptions;
