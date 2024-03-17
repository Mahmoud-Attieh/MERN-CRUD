import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from 'axios';
import {
    Routes,
    Route,
    Link 
    } from "react-router-dom"; 
    
const Update = (props) => {
    const [noteTitle, setNoteTitle] = useState(""); 
    const [noteBody, setNoteBody] = useState("");
    const [noteValue, setNoteValue] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 


    useEffect(() => {
        axios.get('http://localhost:7990/api/notes/' + id)
            .then(res => {
                setNoteTitle(res.data.noteTitle);
                setNoteBody(res.data.noteBody);
                setNoteValue(res.data.noteValue);
                
            })
    }, []);


    const deleteNote = (noteId) => {
        axios.delete('http://localhost:7990/api/notes/' + noteId)
            .then(res => {
                console.log("Deleted succefully")
                navigate("/")
            })
            .catch(err => console.error(err));
    }

    const updateNote = e => {
        e.preventDefault();
        axios.patch('http://localhost:7990/api/notes/' + id, {
            noteTitle,noteBody,noteValue
        })
            .then(res => navigate("/"))
                .catch(err=>{
                    const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                    const errorArr = []; // Define a temp error array to push the messages in
                    for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                        errorArr.push(errorResponse[key].message)
                    }
                    // Set Errors
                    setErrors(errorArr);
                }) 
    }

    return (
        <div>
        <Link to={"/" }>Go back home</Link>
            <h1>Edit Note</h1>
            {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
            <form onSubmit={updateNote}>
                <p> 
                    <label>Note Title</label><br />
                    <input type="text" // from model attri String
                    name="noteTitle" 
                    value={noteTitle} 
                    onChange={(e) => { setNoteTitle(e.target.value) }} />
                </p>
                <p> 
                    <label>Note Body</label><br />
                    <input type="text" // from model attri String
                    name="noteBody" 
                    value={noteBody} 
                    onChange={(e) => { setNoteBody(e.target.value) }} />
                </p>
                <p>
                    <label>Note Value</label><br />
                    <input type="number" // number 
                    name="noteValue" 
                    value={noteValue} 
                    onChange={(e) => { setNoteValue(e.target.value) }} />
                </p>
                <input value={"Edit Note"} type="submit"/>
                <button onClick={(e)=>{deleteNote(id)}}>Delete Note</button> 
            </form>

        </div>
    )
}
    
export default Update;