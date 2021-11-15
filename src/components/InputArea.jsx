import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from 'moment';
import { saveTask } from '../store/features/todoSlice';
import { styled } from '@mui/styles';
import Box from '@mui/material/Box';

const StyledInputButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    marginLeft: 5,
    marginTop: 10,
    float: 'right'
  }));

const StyledTextfield = styled(TextField)(({ theme }) => ({
    position: 'relative',
    width: '100%'

  }));

const mapStateToProps = (state) => {
    return {
      todos: state.todo.todos,
    };
};


// input component
const InputArea = (props) => {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(false)
    const dispatch = useDispatch();
    var exist = false

    // Controlling value in input and check if input empty
    function changeSetName(value) {
        setName(value);
    }

    //check input is empty or already exist
    function checkName(name) {
        if (!name.trim()) {
            setErrorMessage(true)
            return true
        }

        let pos = props.todos.findIndex((el, i) => el.name == name);
        if(pos !== -1) {
            setErrorMessage(true)
            return true
        }

        setErrorMessage(false)
        return false
    }
    
    // save task to the store
    function createTask() {
        if (checkName(name)) return
        const data = {
            date: moment.utc().format('hh:mm:ss'),
            name: name,
            completed: false
        }
        dispatch(saveTask(data))
        setName('')
    }

    // catch enter click instead add button click
    function handleSubmit(e) {
        e.preventDefault();
        createTask()
    }
    
    return (
        <div className={`inputArea`}>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: 'inline-block',
                        position: 'relative',
                        width: '80%'
                    }}
                >
                <StyledTextfield 
                    id="standard-basic" 
                    label="Enter task" 
                    variant="standard" 
                    value={name} 
                    required
                    onChange={ e => changeSetName(e.target.value)} error={errorMessage}
                    error={errorMessage}
                    helperText={errorMessage ? 'Empty field or this task already exists!' : ' '}
                >

                </StyledTextfield>
                </Box>
                <StyledInputButton variant="contained" onClick={() => createTask()}> Add task </StyledInputButton>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(InputArea);


