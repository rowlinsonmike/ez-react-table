import React, { useState } from "react";
import EzReactTable from "ez-react-table";

import data from "./assets/todo.json";

export default {
  title: "ez-react-table",
  component: EzReactTable,
};

const Template = (props) => {
  const [_data, setData] = useState([...data]);
  const title = () => (
    <h1 style={{ margin: 0, padding: 0 }}>
      <i style={{ color: "#ff0374" }} className="las la-clipboard-check" />
      <span style={{ color: "#ff0374" }}>Todos</span>
    </h1>
  );
  const toolbar = [
    {
      button: () => <i style={{ color: "#06a847" }} className="las la-plus" />,
      props: { onClick: () => alert("Add logic here to create a todo!") },
    },
    {
      button: () => <i style={{ color: "#ff0374" }} className="las la-trash" />,
      props: {
        onClick: (data) => {
          setData(_data.filter((d) => !data.find(item => item._id === d._id)));
        },
      },
      selected: true,
    },
  ];
  const cols = [
    { title: "Todo", width: 400, key: "todo" },
    {
      title: "Status",
      width: 100,
      key: "status",
      center: true,
      render: (value, object) => <span>{value ? "🎉" : "➖"}</span>,
    },
    {
      width: 100,
      center: true,
      render: (value, object) => (
        <div style={{ display: "flex" }}>
          <button
            style={{ background: "none", border: "none" }}
            onClick={() =>
              setData(
                _data.map((d) => {
                  if (d._id === object._id) {
                    d.status = !d.status;
                  }
                  return d;
                })
              )
            }
          >
            <i
              style={{ fontSize: "1.3rem", color: "#06a847" }}
              className="las la-check-circle"
            ></i>
          </button>
          <button
            style={{ background: "none", border: "none" }}
            onClick={() => setData(_data.filter((d) => d._id !== object._id))}
          >
            <i
              style={{ fontSize: "1.3rem", color: "#ff0374" }}
              className="las la-minus-circle"
            ></i>
          </button>
        </div>
      ),
    },
  ];
  return (
    <EzReactTable
      cols={cols}
      data={_data}
      toolbar={toolbar}
      title={title}
      defaultSort="status"
      accentColor="#ff0374"
      tableHeight={300}
      uid="_id"
      selectable
      {...props}
    />
  );
};

export const TodoApp = Template.bind({});
