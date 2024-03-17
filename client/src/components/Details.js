import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import {
    Routes,
    Route,
    Link
    } from "react-router-dom";
    
const Details = (props) => {
    const [note, setNote] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:7990/api/notes/' +id)
            .then(res => setNote(res.data))
            .catch(err => console.error(err));
    }, []);
    
    return (
        <div>
            <h1>One Note</h1>
            <h3>Random Note</h3>
            <Link to={"/" }>Go back home</Link>
            <h2>{note.noteTitle}</h2>
            <h2>{note.noteBody}</h2>
            <h2>Value: {note.noteValue}</h2>
            <Link to={"/notes/edit/"+note._id }>Edit Note</Link>
        </div>
    )
}
    
export default Details;