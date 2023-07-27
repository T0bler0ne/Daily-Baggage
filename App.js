import './App.css';
import React,{useEffect, useState} from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [istodo_compl,settodo_compl]=useState(false);
  const [allTodos,setTodo]=useState([]);
  const [newTitle,setnewTitle]=useState("");
  const [newDesc,setNewDesc]=useState("");
  const [completedTodos,setCompletedTodos]=useState([]);
  //const [inputvalue,setInputValue]=useState("");

  const handleAdd=()=>{
    
    let neewTodoItem={
      title:newTitle,
      desc:newDesc
    }
    let updateTodoArr= [...allTodos];    //cpy list
    updateTodoArr.push(neewTodoItem);
    setTodo(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr));  //storing in local storage
    setNewDesc("");
    setnewTitle("");
    settodo_compl(false);
  };

  const handleDelete=index=>{
    let reducedList=[...allTodos];
    console.log(reducedList.length,'size1');
    reducedList =[...reducedList.slice(0, index), ...reducedList.slice(index + 1)];
    console.log(reducedList.length,'size');
    localStorage.setItem('todolist',JSON.stringify(reducedList));
    setTodo(reducedList);
  };

  const handleCompleteDelete=index=>{
    let reducedcompleted=[...completedTodos];
    console.log(reducedcompleted.length,'size1');
    reducedcompleted =[...reducedcompleted.slice(0, index), ...reducedcompleted.slice(index + 1)];
    console.log(reducedcompleted.length,'size');
    localStorage.setItem('completedlist',JSON.stringify(reducedcompleted));
    setCompletedTodos(reducedcompleted);
  };

  
  useEffect(()=>{
    let saveTodo= JSON.parse(localStorage.getItem('todolist')); // convert local strg data to array
    let saveCompleted= JSON.parse(localStorage.getItem('completedlist')); 
    if(saveTodo){
      setTodo(saveTodo);
    }
    if(saveCompleted){
      setCompletedTodos(saveCompleted);
    }
  },[]);

  const handleComplete=(index)=>{
    let now = new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;   //starts from 0
    let yyyy= now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn= dd+'-'+mm+'-'+yyyy+' at '+h+':'+m+':'+s;

    let filteredItem={
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completedlist',JSON.stringify(updatedCompletedArr));
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setnewTitle(e.target.value)} placeholder="What's your task" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder="Task description" />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAdd} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="todo-compl">
          <button className={`secondaryBtn ${istodo_compl===false && 'active'}`} onClick={() =>settodo_compl(false)}>To do</button>    {/*on clicking, state will be false and the class name will be changed to "active" when istodo_compl is false   ps:this comment makes button separate*/}
          <button className={`secondaryBtn ${istodo_compl===true && 'active'}`} onClick={() =>settodo_compl(true)}>Completed</button>   {/*on clicking, state will be true and the class name will be changed to "active" when istodo_compl is true*/}
        </div>
        
        
          {istodo_compl===false&&allTodos.map((item,index)=>{
            return(
              <div className='todo-list'>
                <div className="todo-list-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDelete(index)} title="Delete?"/>
                  <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title="Complete?"/>
                </div>
              </div>
            
            );
          })}
          
          {istodo_compl===true&&completedTodos.map((item,index)=>{
            return(
              <div className='todo-list'>
                <div className="todo-list-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <p>Completed on:{item.completedOn}</p>
                </div>
                
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleCompleteDelete(index)} title="Dlete?"/>
                </div>
              </div>
            
            );
          })}
        
  
      </div>
    </div>
  );
}

export default App;
