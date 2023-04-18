import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const NewNote = (props) => {
    // * states
    // TODO update these to match backend model
    const [note, setNote] = useState({
        title: "",
        date: "",
        content: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        date: "",
        content: "",
    });

    // * navigate
    const navigate = useNavigate();

    // * form event handlers & functions
    const onChangeHandler = (e) => {
        // console.log(e);
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
        navigate("/");
    }



    // TODO make sure the name="" for each input matches the backend model
    return(
        <div className="container">

            <div className='row align-items-center'>
                <div className="col-md-6 text-center">
                    <h1>Create<br />A New<br />Note</h1>
                    <Link to="/" className='btn btn-primary'>View All Notes</Link>
                </div>
                <div className="col-md-6">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            {errors.title ? <p className='text-danger'>{errors.title}</p> : ""}
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                onChange={onChangeHandler}
                                />
                        </div>
                        <div className="mb-3">
                            {errors.date ? <p className='text-danger'>{errors.date}</p> : ""}
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                onChange={onChangeHandler}
                                />
                        </div>
                
                        <div className="mb-3">
                            {errors.content ? <p className='text-danger'>{errors.content}</p> : ""}
                            <label>Note</label>
                            <textarea name="content" rows="10" className="form-control" onChange={onChangeHandler}></textarea>
                        </div>
                        <div>
                            <input className='btn btn-success' type="submit" value="Add Note"/>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewNote;