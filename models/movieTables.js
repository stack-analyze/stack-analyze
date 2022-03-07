import { Table } from "console-table-printer";

const movieList = new Table({
  columns: [
    {
      name: "title",
      alignment: "left",
      color: "green"
    },
    {
      name: "original_language",
      alignment: "left",
      color: "green"
    },
    {
      name: "popularity",
      alignment: "left",
      color: "yellow"
    },
    {
      name: "vote_average",
      alignment: "left",
      color: "yellow"
    },
    {
      name: "release_date",
      alignment: "left",
      color: "yellow"
    }
  ]
});

export default movieList;
