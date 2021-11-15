import React, { useState, useRef} from 'react';
import Button from '@mui/material/Button';
import moment from 'moment';
import { styled } from '@mui/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    marginLeft: '10px',
  }));

function ListItem(props) {
    
    const divRef = useRef(null);
    const [editable, setEditable] = useState(false)
    const [messageError, setMessageError] = useState(false)

    let prevName = props.item.name;
    
    // controlling value in input and check if input empty
    function onChangeName(value) {
        divRef.current.textContent = value
    }

    // toggle div in editable/not editable mode
    function toggleEditable(e) {
        setEditable(!editable);
    }

    // cancel changing in the task
    function cancelEdit() {
        setMessageError(false)
        setEditable(!editable)
        divRef.current.textContent = prevName
        
    }

    // update task in store
    function changeTask() {
        if (divRef.current.textContent == props.item.name || !divRef.current.textContent.trim() || props.checkName(divRef.current.textContent) == true) return setMessageError(true) // check if the previous name is the same as the new changed name 
        toggleEditable();
        setMessageError(false); // switch message error to false if name comparison is false (line42)
        props.updateTask({
            date: moment.utc().format('hh:mm:ss'),
            name: divRef.current.textContent,
            completed: props.item.completed,
            oldname: prevName
        })
    }

    //delete task
    function deleteTask() {
        setMessageError(false); // switch message error to false if name comparison is false (line42)
        props.deleteTask(divRef.current.textContent)
    }

    return (
        <>
            <div className={`task task-error_${messageError}`}>
                <div className="task-date">
                    {props.item.date}
                </div>

                <div ref={divRef} 
                    className={`task-name task-completed_${props.item.completed} edit-${editable}`} 
                    contentEditable={editable} 
                    onBlur={(e)=>{onChangeName(e.currentTarget.textContent)}} 
                    onClick={() => {(editable) ? null : props.completeTask(divRef.current.textContent)}}
                    suppressContentEditableWarning='true'
                >
                    {prevName}
                </div>
                {
                    editable ? 
                    <>
                    <span><StyledButton variant="contained" onClick={() => changeTask()}> Save </StyledButton></span>
                    <span><StyledButton variant="contained" onClick={() => cancelEdit()}> Cancel </StyledButton></span>
                    </>
                    :
                    <>
                    <span><StyledButton variant="contained" onClick={(e) => toggleEditable(e)}> Edit </StyledButton></span>
                    <span><StyledButton variant="contained" onClick={() => deleteTask()}> Del </StyledButton></span>
                    </>
                }

            </div>
        </>
    )
}

export default ListItem