<!-- <p align="center">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/ez-react-table.png" width="150" title="logo">
</p> -->
  <h1 align="center" >EZ React Table</h1>
  <p align="center"><i>๐ Batteries included table component that does it all!</i></p>
  <p align="center"><i>โก๏ธ Try out the <a href="https://rowlinsonmike.github.io/ez-react-table/" target="_blank">Demo</a>! โก๏ธ</i></p>
  <p align="center">๐ <em>Active Development</em> ๐ </p>

## Features

- ๐ป virtualized rows
- ๐ฝ built in sorting
- ๐ column pagination
- โ๏ธ column resize
- ๐ต global search
- ๐ overflow management with tool tips
- ๐จcustomizable toolbar
- โ selectable rows

<!-- ## Screenshots

<p float="left">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/screenshot-1.png" width="350" title="screenshot 1">
  <img src="https://github.com/rowlinsonmike/ez-react-table/blob/main/assets/screenshot-2.png" width="350" title="screenshot 2">
</p> -->

## Installation

Install ez-react-table with npm

```bash
  npm install ez-react-table
```

## Usage/Examples

Simple

```javascript
import { EzReactTable } from "ez-react-table";
import "ez-react-table/lib/styles.css";

function App() {
  return (
    <div>
      <EzReactTable
        cols={[
          {
            title: "First",
            key: "first",
          },
          {
            title: "Last",
            key: "last",
          },
        ]}
        data={[
          { first: "Michael", last: "Myers" },
          { first: "Laurie", last: "Strode" },
          { first: "Samuel", last: "Loomis" },
        ]}
      />
    </div>
  );
}
```

## Configuration

### Component properties

| Property       | Type             | Default   | Description                                                                     |
| :------------- | :--------------- | :-------- | :------------------------------------------------------------------------------ |
| `cols`         | `array`          | `[]`      | column configuration                                                            |
| `data`         | `array`          | `[]`      | data to render                                                                  |
| `rowHeight`    | `number`         | `30`      | height of rows in pixels                                                        |
| `tableHeight`  | `number`         | `500`     | height of table in pixels                                                       |
| `showCols`       | `number`       | `cols.length`    | how many columns to show before paginating                                                    |
| `title`        | `Component or string` | `null`    | create title for table, can be either a string or a react component                   |
| `toolbar`      | `Component`          | `null`      | react component to pass as toolbar                                                   |
| `selectable`   | `string`        | `null`   | defining makes rows selectable, pass column key to use as unique identifier.                                             |
| `initialSelected`   | `array`        | `[]`   | array of of ids that should be checked on component load. The array contains the values of the property specified in `selectable`                                           |
| `onSelect`   | `function`        | `null`   | function that runs when selections occur. the function will get passed the current selection array                                          |

### Component `toolbar` property

the toolbar component recieves 2 properties defined below

| Property | Description                                                                          |
| :------- | :----------------------------------------------------------------------------------- |
| `selected` | array of selected rows               |
| `clearSelected`  | clear selected rows               |


### Column Configuration

| Property | Type       | Description                             |
| :------- | :--------- | :-------------------------------------- |
| `title`  | `string`   | column display name                     |
| `align` | `string`  | justify-content css property         |
| `key`    | `string`   | correlated property name in data object |
| `format` | `function` | render custom content               |

### Column Configuration `format` function

| Argument | Description               |
| :------- | :------------------------ |
| `value`  | value to render in column |
| `object` | row's object              |

```javascript
(value, object) => <span>{value}</span>;
```

## Styles

Apply default styles

```css
import { EzReactTable } from "ez-react-table";
import "ez-react-table/lib/main.css";
import "ez-react-table/lib/styles.css";
```

For custom styles, copy `ez-react-table/lib/styles.css` and modify as needed.
```css
import { EzReactTable } from "ez-react-table";
import "ez-react-table/lib/main.css";
import "./styles.css";
```

## Acknowledgements

- [react-window](https://github.com/bvaughn/react-window)
- [simple-bar](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react)
- [tippy.js](https://github.com/atomiks/tippyjs)

## Authors

- [@rowlinsonmike](https://www.github.com/rowlinsonmike)
