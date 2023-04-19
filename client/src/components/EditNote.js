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

    // * navigate
    const navigate = useNavigate();

    // * param for url to single product edit page
    const { id } = useParams();

    // TODO update api link
    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
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
            axios.put('http://localhost:8000/api/notes/'+note._id, note)
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

     // TODO update api link
    // * delete functionality
    const deleteOneHandler = (id) => {
        axios.delete(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    // TODO make sure the name="" & value="" for each input matches the backend model
    return(
        <div class="container">

            <div className=''>
                <div className="">
                    <h1>Edit<br />A<br />Note</h1>
                    <Link to="/" className=''>View All Notes</Link>
                </div>
                <div className="">
                    <form onSubmit={onSubmitHandler}>
                        <div className="">
                            {errors.title ? <p className=''>{errors.title}</p> : ""}
                            <label htmlFor="title" className="">Title</label>
                            <input
                                type="text"
                                name="title"
                                className=""
                                onChange={onChangeHandler}
                                value={note.title}
                                />
                        </div>
                        <div className="">
                            {errors.date ? <p className='text-danger'>{errors.date}</p> : ""}
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                className=""
                                onChange={onChangeHandler}
                                value={formattedDate}
                                />
                        </div>
                
                        <div className="">
                            {errors.content ? <p className=''>{errors.content}</p> : ""}
                            <label>Note</label>
                            <textarea name="content" rows="10" className="" value={note.content} onChange={onChangeHandler}></textarea>
                        </div>
                        <div>
                            <input className='' type="submit" value="Edit Note"/>
                            <button className="" onClick={(e) => deleteOneHandler(note._id)}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )


}

export default EditNote;