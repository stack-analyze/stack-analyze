import { Table } from "console-table-printer";

const diskTables = new Table({
  columns: [
    {
      name: "type",
      alignment: "left",
      color: "green"
    },
    {
      name: "name",
      alignment: "left",
      color: "green"
    },
    {
      name: "vendor",
      alignment: "left",
      color: "green"
    },
    {
      name: "diskSize",
      alignment: "left",
      color: "yellow"
    },
    {
      name: "interfaceType",
      alignment: "left",
      color: "yellow"
    }
  ]
});

const controllersTable = new Table({
  columns: [
    {
      name: "model",
      alignment: "left",
      color: "green"
    },
    {
      name: "vendor",
      alignment: "left",
      color: "green"
    },
    {
      name: "vramSize",
      alignment: "left",
      color: "yellow"
    }
  ]
});

const displayTables = new Table({
  columns: [
    {
      name: "model",
      alignment: "left",
      color: "green"
    },
    {
      name: "main",
      alignment: "left",
      color: "green"
    },
    {
      name: "connection",
      alignment: "left",
      color: "cyan"
    },
    {
      name: "resolutionX",
      alignment: "left",
      color: "yellow"
    },
    {
      name: "resolutionY",
      alignment: "left",
      color: "yellow"
    }
  ]
});

export {
  diskTables,
  controllersTable,
  displayTables
};
