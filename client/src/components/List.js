import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Routes,
    Route,
    Link
    } from "react-router-dom";

const List = () => {
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:7990/api/notes')
            .then(res=>{
                setNotes(res.data);
            })
            .catch(err => console.error(err));
    },[notes]);

    const deleteNote = (noteId) => {
        axios.delete('http://localhost:7990/api/notes/' + noteId)
            .then(res => {
                console.log("Deleted succefully")
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h1> Note Wall </h1>
            <h3>Leave a note</h3>
            <button><Link to={"/notes/new" }>Write note</Link></button>
            {notes.map( (note, i) =>
            <div key={i}>
                <h1 >{note.noteTitle}</h1>
                <h3 >{note.noteBody}</h3>
                <h3 >Value:{note.noteValue}</h3>
                <h3 ><Link to={"/notes/edit/" + note._id }>Edit</Link></h3>
            </div>
                
                )}
                <br/><br/>
        </div>
    )
}
export default List;