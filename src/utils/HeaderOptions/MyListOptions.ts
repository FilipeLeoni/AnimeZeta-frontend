interface MyListOptionsProps {
  id: number;
  name: string;
}

const MyListOptions: MyListOptionsProps[] = [
  { id: 1, name: "All" },
  { id: 2, name: "Planning" },
  { id: 3, name: "Watching" },
  { id: 4, name: "Completed" },
];

export default MyListOptions;
