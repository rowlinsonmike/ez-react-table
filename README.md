
<p align="center">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/ez-react-table.png" width="150" title="logo">
</p>
  <h1 align="center" >EZ React Table</h1>
  <p align="center"><i>🔋 Batteries included table component that just works.</i></p>

## Features

- 💻 virtualized
- 🔽 sorting
- 🔃 refresh
- 🕵 search
- 🤯 simple
- 🤩 style
- 🌔 dark mode
  
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
            },
            {
              title: "Actions",
              width: 100,
              key: "action",
              center: true,
              render: (value, object) => (
                <button onClick={() => alert(JSON.stringify(object))}>
                  View
                </button>
              ),
            },
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

  