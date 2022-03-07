import { Table } from "console-table-printer";

const animeList = new Table({
  columns: [
    {
      name: "title",
      alignment: "left",
      color: "green"
    },
    {
      name: "type",
      alignment: "left",
      color: "magenta"
    },
    {
      name: "episodes",
      alignment: "left",
      color: "magenta"
    },
    {
      name: "debutDate",
      alignment: "left",
      color: "magenta"
    },
    {
      name: "finalDate",
      alignment: "left",
      color: "green"
    }
  ]
});

export default animeList;
