import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const NewNote = (props) => {
    // * states
    const [note, setNote] = useState({
        title: "",
        date: "",
        content: "",
        isCompleted: false
    });

    const [errors, setErrors] = useState({
        title: "",
        date: "",
        content: ""
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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (formValidator()) {
            axios.post('http://localhost:8000/api/notes', note)
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

    return(
        <div className="container">

            <div className="row app-page align-items-center">
                <div className="col-md-6 text-center">
                    <h1 className='display-3 title-block'>Create<br />A New<br />Note</h1>
                    <Link to="/" className='btn btn-info'>View All Notes</Link>
                </div>
            
                <div className="col-md-6 mt-4 mt-md-0">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            {/* <input
                                type="hidden"
                                name="isCompleted"
                                className="form-control"
                                value="false"
                                /> */}
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
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                onChange={onChangeHandler}
                                />
                        </div>
                
                        <div className="mb-3">
                            {errors.content ? <p className='text-danger'>{errors.content}</p> : ""}
                            <label htmlFor="content" className="form-label">Note</label>
                            <textarea name="content" rows="8" className="form-control" onChange={onChangeHandler}></textarea>
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">Add Note</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewNote;