import { Table } from "console-table-printer";

const twitchTable = new Table({
  columns: [
    {
      name: "display_name",
      alignment: "left",
      color: "green"
    },
    {
      name: "broadcaster_type",
      alignment: "left",
      color: "green"
    },
    {
      name: "view_count",
      alignment: "left",
      color: "yellow"
    },
    {
      name: "createdTime",
      alignment: "left",
      color: "green"
    }
  ]
});

export default twitchTable;
