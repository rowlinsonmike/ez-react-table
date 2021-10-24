
<p align="center">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/ez-react-table.png" width="150" title="logo">
</p>
  <h1 align="center" >EZ React Table</h1>
  <p align="center"><i>🔋 Batteries included table component that just works.</i></p>
  <p align="center"><i>⚡️ Try out the <a href="https://rowlinsonmike.github.io/ez-react-table/?path=/story/ez-react-table--demo" target="_blank">Demo</a>! ⚡️</i></p>

## Features

- 💻 virtualized rows
- 🔽 built in sorting 
- 🔃 built in refresh button
- 🕵 global search
- 🤯 simple implementation 
- 🤩 beatuiful style
- 🌔 dark mode
- 🌊 overflow management with tool tips
  
## Screenshots

<p>
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/screenshot.png" width="350" title="logo">
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
              width: 200,
              key: "first",
            },
            {
              title: "Last",
              width: 200,
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
    width: 200,
    key: "first",
  },
  {
    title: "Last",
    width: 200,
    key: "last",
  },
  {
    title: "Actions",
    width: 100,
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
| `defaultSort` | `string` | `null` | default column sort |
| `accentColor` | `string` | `#b8b8b8` | color for table accents |
| `darkMode` | `bool` | `false` | toggle dark mode, default is false |

### Column Configuration
| Property | Type     | Description                |
| :-------- | :------- |  :------------------------- |
| `title` | `string` | column display name |
| `width` | `number` | width of column in pixels |
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

  