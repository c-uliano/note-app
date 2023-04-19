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

    // TODO update api link
    // * getting the data for the item
    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                setNote(res.data)
                console.log(note)
            })
            .catch(err => console.log(err))
    }, []);

    // TODO update api link
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

            <div className='row'>
                <div className="col-md-6 text-center">
                    <h1>{note.title}</h1>
                    <Link to="/" className='btn btn-primary'>View All Notes</Link>
                </div>
                <div className="col-md-6">
                    <div className='mb-4'>
                        <p><i>{new Date(note.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone: "UTC"})}</i></p>
                        <p>{note.content}</p>
                    </div>
                    <div>
                        <p><Link to={`/edit/note/${note._id}`} className='btn btn-primary me-3'>Edit</Link><button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button></p>
                    </div>
                </div>
            </div>

        </div>
    )


}

export default ViewPage;