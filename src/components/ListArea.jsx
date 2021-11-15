import React from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask, completeTask} from '../store/features/todoSlice'
import ListItem from './ListItem';

// put store state from todoSlice.js in props
const mapStateToProps = (state) => {

    return {
      todos: state.todo.todos,
    };
};

// put action form totoSlice.js in props
const mapDispatchToProps = (dispatch) => {
    return {
        updateTask: (item) => dispatch(updateTask(item)),
        deleteTask: (item) => dispatch(deleteTask(item)),
        completeTask: (item) => dispatch(completeTask(item)),
    };
};

function ListArea(props) {
    //check name for ListItem
    function checkName(name) {
        let pos = props.todos.findIndex((el, i) => el.name == name);
        if(pos !== -1) {
            return true
        }
        return false
    }

    return (
        <div className="listArea">
            {
                props.todos.map((el, i) => {
                    return <ListItem item={el} updateTask={props.updateTask} deleteTask={props.deleteTask} completeTask={props.completeTask} key={i} checkName={checkName}/>
                })
            }
        </div>
    )
}

// binding store state and actions with ListArea component
export default connect(mapStateToProps, mapDispatchToProps)(ListArea);

