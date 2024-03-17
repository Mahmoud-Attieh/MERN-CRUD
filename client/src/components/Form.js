import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate} from "react-router-dom";

import {
    Routes,
    Route,
    Link 
} from "react-router-dom";
export default () => {
    //keep track of what is being typed via useState hook
    
    const [noteTitle, setNoteTitle] = useState(""); 
    const [noteBody, setNoteBody] = useState("");
    const [noteValue, setNoteValue] = useState(0);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    
    //handler when the form is submitted
    const onSubmitHandler = e => {

        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new exam

        axios.post('http://localhost:7990/api/notes', {
            noteTitle,
            noteBody,
            noteValue
        })
            .then(res=>{
                
                navigate("/");
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
                console.log(err)
            })
    }

    //onChange to update firstName and lastName
    return (
        <div>
            <h1>Write Notes</h1>
            <h3>Write a new Notes!</h3>
            <Link to={"/" }>Go back home</Link>

            {errors.map((err, index) => <p key={index} style={{ color: "red" }}>{err}</p>)}
            {/* <p style={{ color: "red" }}>{nameError}</p> */}

        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Note Title</label><br/>
                <input type="text" onChange={(e)=>setNoteTitle(e.target.value)} value={noteTitle}/><br/>
                <label>Note Body</label><br/>
                <input type="text" onChange={(e)=>setNoteBody(e.target.value)} value={noteBody}/><br/>
                <label>Note Value</label><br/>
                <input type="number" onChange={(e)=>setNoteValue(e.target.value)} value={noteValue}/><br/>
            </p>

            <input value={"Write this Note "} type="submit"/>

            </form>
        </div>
    )
}
