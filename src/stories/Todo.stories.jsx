import EzReactTable from "../lib";
import "../lib/styles.css"
import React,{useState,useCallback} from "react";

const Template = (args) => <EzReactTable {...args} />;

export default {
  title: "Examples",
  component: EzReactTable,
};

const Button = ({children,style,...args}) => {
    return <button {...args} style={{border: '1px solid grey',display: 'flex',justifyContent:"center",alignItems:"center",borderRadius: "5px", marginLeft:"10px",width: "30px", height: "30px", fontSize:"30px",background: "transparent",...style}}>{children}</button>
}
const Toolbar = ({selected,clearSelected,todos,setTodos}) => {
  const [newTodo, setNewTodo] = useState("")
  const addTodo = () => {
      if(newTodo){
          setTodos([...todos,{id: Math.random(),todo: newTodo, completed: false}])
          setNewTodo("")
      }
  }
  const completeTodos = () => {
      let ids = selected.map(s => s.id)
      setTodos(todos.map(t => ids.includes(t.id) ? {...t, completed: true} : {...t}))
      clearSelected()
  }
  const deleteTodos = () => {
      let ids = selected.map(s => s.id)
      setTodos(todos.filter(t => !ids.includes(t.id)))
      clearSelected()
  }
return <div style={{width: "40%", display: 'flex', flexDirection: "row-reverse"}}>
  {selected.length ? <Button onClick={deleteTodos} style={{color: "red"}}>-</Button> : null}
  {selected.length ? <Button onClick={completeTodos} style={{color: "green"}}>✓</Button> : null}
  <div style={{"display":'flex'}}>
  <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
  <Button onClick={addTodo} style={{color: "green"}}>+</Button>
  </div>
</div>
}
export const Todo = () => {
    const [todos,setTodos] = useState([])
    return (<div style={{ width: "80%", position: 'relative'}}>
      <Template
        data={todos}
        selectable="id"
        cols={[
          { title: "Todo", key: "todo"},
          { title: "Completed", key: "completed", align: "center", format: value => value ? "🎉" : "➖"}
        ]}
        toolbar={useCallback(({...props}) => <Toolbar todos={todos} setTodos={setTodos} {...props} />,[todos])}
        rowHeight={40}
        showCols={2}
        tableHeight={400}
        title={() =>     <h1 style={{ margin: 0, padding: 0 }}>
        <span style={{ color: "purple" }}>📝 Todo List</span>
      </h1>}
      />
    </div>)
}
