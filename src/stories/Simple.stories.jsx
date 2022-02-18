import EzReactTable from "../lib";
import "../lib/styles.css"
import React from "react";

const Template = (args) => <EzReactTable {...args} />;

export default {
  title: "Examples",
  component: EzReactTable,
};

export const Simple = () => {
    return (<div style={{ width: "80%", position: 'relative'}}>
      <Template
        cols={[
          {
            title: "First",
            key: "first",
          },
          {
            title: "Last",
            key: "last",
          }
        ]}
        data={[
          { first: "Michael", last: "Myers" },
          { first: "Laurie", last: "Strode" },
          { first: "Samuel", last: "Loomis" },
        ]}
      />
    </div>)
}
