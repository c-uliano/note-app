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

    // TODO make sure the name="" for each input matches the backend model
    return(
        <div className="container">
            <div class="row app-page">
            <div className="col-xs-12 col-md-5 font-google">
                <div className="">
                <div>
                    <h1 className="title-block">Create<br />A New<br />Note</h1>
                </div>
                <div class="navi-1"> 
                    <button class="button-note"><Link to="/" className='button-note-text'>View All Notes</Link></button>
                </div>
                </div>
            </div>
            
            <div className="col-xs-12 col-md-7">
                    <div class="list-block">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-4">
                            {errors.title ? <p className=''>{errors.title}</p> : ""}
                            <label htmlFor="title" className="form-labe">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control form-control-lg"
                                onChange={onChangeHandler}
                                />
                        </div>
                        <div className="mb-4">
                            {errors.date ? <p className=''>{errors.date}</p> : ""}
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control form-control-lg"
                                onChange={onChangeHandler}
                                />
                        </div>
                
                        <div className="mb-4">
                            {errors.content ? <p className=''>{errors.content}</p> : ""}
                            <label htmlFor="content" className="form-label">Note</label>
                            <textarea name="content" rows="10" className="form-control form-control-lg" onChange={onChangeHandler}></textarea>
                        </div>
                        <div class="text-end mb-4">
                            {/*<input className='' type="submit" value="Add Note"/>*/}
                            <button class="btn btn-primary" type="submit"><span class="button-note-text">Add Note</span></button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewNote;