import React,{useState} from "react";
import EzReactTable from "ez-react-table";

import data from "./assets/data.json";
const cols = [
  { title: "Name", width: 200, key: "name" },
  { title: "Email", width: 200, key: "email" },
  { title: "Website", width: 200, key: "website" },
];

export default {
  title: "ez-react-table",
  component: EzReactTable,
  argTypes: {
    darkMode: {
      control: {
        type: 'boolean'
      }
    },
    accentColor: {
      control: {
        type: 'color'
      }
    },
    rowHeight: {
      control: {
        type: 'number'
      }
    },
    tableHeight: {
      control: {
        type: 'number'
      }
    },
    defaultSort: {
      control: {
        type: 'text'
      }
    },
  },
};

const Template = (props) => {
  const [_data,setData] = useState([...data]) 
  const infiniteLoad = () => setData([..._data, ...data])
  return <EzReactTable update={() => {
    setTimeout(() => setData([...data]),2000)
  }} infiniteLoad={infiniteLoad} cols={cols} data={_data} {...props} />;
};

export const Demo = Template.bind({});
Demo.args = {
  darkMode: false,
  accentColor: "#b8b8b8",
  rowHeight: 50,
  tableHeight: 300,
  defaultSort: 'website'
}
