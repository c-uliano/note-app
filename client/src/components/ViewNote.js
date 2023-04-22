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

            <div className='row app-page'>
                <div className="col-xs-12 col-md-5 font-google">
                    <div>
                    <h1 class="title-block-2">{note.title}</h1>
                    </div>
                    <div class="navi-1"> 
                    <button class="button-note"><Link to="/" className='button-note-text'>View All Notes</Link></button>
                    </div>
                </div>
                <div className="col-xs-12 col-md-7">
                    <div className='list-block'>
                        <p><i>{new Date(note.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone: "UTC"})}</i></p>
                        <p>{note.content}</p>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-primary"><Link to={`/edit/note/${note._id}`} className='button-note-text'>Edit</Link></button>&nbsp;<button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button>
                    </div>
                </div>
            </div>

        </div>
    )


}

export default ViewPage;