import { Table } from "console-table-printer";

const coinTable = new Table({
  columns: [
    {
      name: "symbol",
      alignment: "left",
      color: "green"
    },
    {
      name: "name",
      alignment: "left",
      color: "white_bold"
    },
    {
      name: "price",
      alignment: "left",
      color: "yellow"
    },
    {
      name: "priceChanged",
      alignment: "left"
    },
    {
      name: "lastUpdated",
      alignment: "left",
      color: "magenta"
    }
  ]
});

export default coinTable;
