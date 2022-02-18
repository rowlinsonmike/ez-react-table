
<p align="center">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/ez-react-table.png" width="150" title="logo">
</p>
  <h1 align="center" >EZ React Table</h1>
  <p align="center"><i>🔋 Batteries included table component that does it all!</i></p>
  <p align="center"><i>⚡️ Try out the <a href="https://rowlinsonmike.github.io/ez-react-table/?path=/story/ez-react-table--demo" target="_blank">Demo</a>! ⚡️</i></p>
  <p align="center">🏗 <em>Active Development</em> 🛠</p>

## Features

- 💻 virtualized rows
- 🔽 built in sorting 
- 🔃 refresh
- 🕵 global search
- 🤯 simple 
- 🤩 beatuiful style
- 🌔 dark mode
- 🌊 overflow management with tool tips
- ♾️ infinite loading
- 🔨customizable toolbar and actions 
- ✅ selectable rows
  
## Screenshots

<p float="left">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/screenshot-1.png" width="350" title="screenshot 1">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/screenshot-2.png" width="350" title="screenshot 2">
</p>

  
## Installation

Install ez-react-table with npm

```bash
  npm install ez-react-table
```
    
## Usage/Examples

Simple 
```javascript
import EzReactTable from "ez-react-table";

function App() {
  return <div>
    <EzReactTable
          cols={[
            {
              title: "First",
              width: "200px",
              key: "first",
            },
            {
              title: "Last",
              width: "200px",
              key: "last",
            }
          ]}
          data={[
            { first: "Michael", last: "Myers" },
            { first: "Laurie", last: "Strode" },
            { first: "Samuel", last: "Loomis" },
          ]}
        />
  </div>
}
```

Kitchen Sink
```javascript
import { useState } from "react";
import EzReactTable from "ez-react-table";

// fake data
const data = Array.from(Array(20))
  .map((i) => [
    { first: "Michael", last: "Myers" },
    { first: "Laurie", last: "Strode" },
    { first: "Samuel", last: "Loomis" },
  ])
  .reduce((a, c) => [...a, ...c], []);

// define columns
const cols = [
  {
    title: "First",
    width: "200px",
    key: "first",
  },
  {
    title: "Last",
    width: "200px",
    key: "last",
  },
  {
    title: "Actions",
    width: "100px",
    key: "action",
    center: true,
    render: (value, object) => (
      <button onClick={() => alert(JSON.stringify(object))}>View</button>
    ),
  },
];

function App() {
  const [_data, setData] = useState(data);
  const update = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
    setData([..._data, { first: "Leigh", last: "Brackett" }]);
  };
  return (
    <div className="App">
      <EzReactTable
        tableHeight={500}
        rowHeight={40}
        defaultSort="first"
        accentColor="#edaf1f"
        update={update}
        darkMode
        cols={cols}
        data={_data}
      />
    </div>
  );
}
```

## Configuration

### Component properties

| Property | Type     | Default | Description                |
| :-------- | :------- | :-------- |  :------------------------- |
| `cols` | `array` | `[]` | column configuration |
| `data` | `array` | `[]` | data to render |
| `rowHeight` | `number` | `50` | height of rows in pixels |
| `tableHeight` | `number` | `300` | height of table in pixels |
| `update` | `function` | `null` | function call to update data |
| `infiniteLoad` | `function` | `null` | function call to load more items |
| `defaultSort` | `string` | `null` | default column sort |
| `accentColor` | `string` | `#b8b8b8` | color for table accents |
| `darkMode` | `bool` | `false` | toggle dark mode, default is false |
| `title` | `func or string` | `null` | create title for table, can be either a string or a component |
| `toolbar` | `array` | `[]` | define buttons for toolbar |
| `selectable` | `boolean` | `false` | when true, allow selection of rows |
| `uid` | `string` | `null` | **required** if selectable it `true`, key of unique property on objects in data |

### Component `toolbar` property

the toolbar property defines the available toolbar buttons. It takes an array of objects, each object has the following properties:

| Property | Description                |
| :-------- |  :------------------------- |
| `button` | React Component to render button, typically either an svg or font icon |
| `props` | props to be passed to the button component, such as `onClick` property |
| `select` | defaults to `false` if not passed. When `true` button appears when rows are selected |

the `onClick` property supplied to the `props` object recieves an array argument when select property equals `true`. The array is a list of currently selected objects.

```javascript
//example
[
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
    }
]
```

### Component `infiniteLoad` function

| Argument | Description                |
| :-------- |  :------------------------- |
| `visibleStopIndex` | index of last loaded item |

function that updates passed `data` prop to EzReactTable with more data

```javascript
(visibleStopIndex) => {...}
```
### Component `update` function

function that updates passed `data` prop to EzReactTable

### Column Configuration
| Property | Type     | Description                |
| :-------- | :------- |  :------------------------- |
| `title` | `string` | column display name |
| `width` | `string` | width of column (100px, 30%) |
| `center` | `boolean` | aligns column content to center |
| `key` | `string` | correlated property name in data object |
| `render` | `function` | render customer component |

### Column Configuration `render` function

| Argument | Description                |
| :-------- |  :------------------------- |
| `value` | value to render in column |
| `object` | row's object |


```javascript
(value,object) => <div>{value}</div>
```
  

## Acknowledgements

 - [react-window](https://github.com/bvaughn/react-window)
 - [simple-bar](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react)
 - [tippy.js](https://github.com/atomiks/tippyjs)
 - [styled components](https://github.com/styled-components/styled-components)
  
## Authors

- [@rowlinsonmike](https://www.github.com/rowlinsonmike)

  
Copied