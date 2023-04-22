import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'

const EditNote = (props) => {
    // * states
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

    // * delete functionality
    const deleteOneHandler = (id) => {
        axios.delete(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    return(
        <div class="container">

            <div className='row app-page align-items-center'>
                <div className="col-md-6 text-center">
                    <h1 className='display-3 title-block'>Edit<br />A<br />Note</h1>
                    <Link to="/" className='btn btn-info'>View All Notes</Link>
                </div>

                <div className="col-md-6 mt-4 mt-md-0">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            {errors.title ? <p className='text-danger'>{errors.title}</p> : ""}
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                onChange={onChangeHandler}
                                value={note.title}
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
                                value={formattedDate}
                                />
                        </div>
                
                        <div className="mb-3">
                            {errors.content ? <p className='text-danger'>{errors.content}</p> : ""}
                            <label htmlFor="content" className="form-label">Note</label>
                            <textarea name="content" rows="8" className="form-control" value={note.content} onChange={onChangeHandler}></textarea>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-primary me-1" type='submit'>Edit Note</button>
                            <button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )


}

export default EditNote;