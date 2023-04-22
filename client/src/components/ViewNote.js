import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom';

const ViewPage = (props) => {
    // * states
    const [note, setNote] = useState({});

    // * navigate
    const navigate = useNavigate();

    // * param for url to single product page
    const { id } = useParams();

    // * getting the data for the item
    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                setNote(res.data)
                console.log(note)
            })
            .catch(err => console.log(err))
    }, []);

    // * delete functionality
    const deleteOneHandler = (id) => {
        axios.delete(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="container">

            <div className='row app-page align-items-center'>
                <div className="col-md-6 text-center">
                    <div className='w-75 mx-auto'>
                        <h1 className='display-3 title-block'>{note.title}</h1>
                        <Link to="/" className='btn btn-info'>View All Notes</Link>
                    </div>
                </div>

                <div className="col-md-6 mt-4 mt-md-0">
                    <div className='mb-4'>
                        <p><i>{new Date(note.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone: "UTC"})}</i></p>
                        <p>{note.content}</p>
                    </div>
                    <div className="btn-group text-center text-md-start d-block">
                        <Link className="btn btn-primary me-1" to={`/edit/note/${note._id}`}>Edit</Link>
                        <button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button>
                    </div>
                </div>
            </div>

        </div>
    )


}

export default ViewPage;