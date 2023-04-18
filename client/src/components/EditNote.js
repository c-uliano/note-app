import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'

const EditNote = (props) => {
    // * states
    // TODO update these to match backend model
    const [note, setNote] = useState({});

    const [errors, setErrors] = useState({
        title: "",
        date: "",
        content: "",
    });

    // TODO update api link
    // * navigate
    const navigate = useNavigate();

    // * param for url to single product edit page
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`)
            .then(res => {
                setNote(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    // * format date to YEAR-MONTH-DAY to use as input's value
    const rawDate = note ? note.date : "";
    const formattedDate = rawDate ? rawDate.slice(0, 10) : "";

    // * form event handlers & functions
    const onChangeHandler = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    // TODO update lengths or anything else to match backend model
    const formValidator = () => {
        let isValid = true
        const newErrors = {}
        if (note.title.length < 5) {
            isValid = false;
            newErrors.title = "Hey there, title must be at least 5 characters";
        } else {
            newErrors.title = "";
        }
        if (!note.date) {
            isValid = false;
            newErrors.date = "Hey there, date must be entered";
        } else {
            newErrors.date = "";
        }
        if (note.content.length < 5) {
            isValid = false;
            newErrors.content = "Hey there, the note's content must be at least 5 characters";
        } else {
            newErrors.content = "";
        }
        setErrors(newErrors);
        return isValid;
    }

    // TODO update api link
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formValidator()) {
            axios.post('http://localhost:8000/api/note', note)
            .then(res => {
                console.log(res);
                const id = res.data._id
                navigate(`/view/note/${id}`);
            })
            .catch(err => {
                console.log(err);
            })
        } 
    }

    const cancelBtn = (e) => {
        navigate(`/view/note/${note._id}`);
    }




    return(
        <div class="container">

            <div class="left">
                <h1>Edit A Note</h1>
                <Link to="/">View All Notes</Link>
            </div>

            <div class="right">
                <form>
                    <div class="input">
                        <label>Title</label>
                        <input 
                            type="text"
                            name="title"
                            />
                    </div>

                    <div class="input">
                        <label>Date</label>
                        <input 
                            type="date"
                            name="date"
                            />
                    </div>
                    
                    <div class="input">
                        <label>Note</label>
                        <textarea name="note"></textarea>
                    </div>

                    <div class="submit">
                        <input type="submit" value="Edit Note"/>
                    </div>
                </form>
            </div>

        </div>
    )


}

export default EditNote;