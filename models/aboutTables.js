// table model module
import { Table } from "console-table-printer";

// youtube model
const youtubeDevTable = new Table({
  columns: [
    {
      name: "youtubeChannel",
      alignment: "left",
      color: "green"
    },
    {
      name: "recomendation",
      alignment: "left",
      color: "cyan"
    }
  ]
});

// ideas model
const ideasTable = new Table({
  columns: [
    {
      name: "author",
      alignment: "left",
      color: "green"
    },
    {
      name: "tool",
      alignment: "left",
      color: "green"
    }
  ]
});

// exports tables
export {
  youtubeDevTable,
  ideasTable
};
