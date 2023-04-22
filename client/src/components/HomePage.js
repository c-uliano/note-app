import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const HomePage = (props) => {
    // * state
    const [list, setList] = useState([]);

    // * get all items from database
    useEffect(() => {
        axios.get('http://localhost:8000/api/notes')
            .then(res => {
                setList(res.data)
                console.log(list) //prints empty array because state is updates late
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    // * delete functionality
    const deleteOneHandler = (id) => {
        axios.delete(`http://localhost:8000/api/notes/${id}`)
            .then(res => {
                const filteredList = list.filter(item => item._id !== id)
                setList(filteredList)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="container">
    
            <div className='row app-page p-4 align-items-center'>
                <div className="col-md-6 text-center">
                    <h1 className='display-3 title-block'>Create<br />A<br />Note</h1>
                    <Link to="/new/note" className='btn btn-info'>New Note</Link>
                </div>
                
                <div className="col-md-6 mt-4 mt-md-0">
                {list.map((note) => {
                    return (
                    <div className="row align-items-center border-bottom mb-2 pb-2 text-center text-md-start">
                        <div className="col-md" key={note._id}>
                            <h3><Link to={`/view/note/${note._id}`}>{note.title}</Link></h3>
                        </div>
                        <div className="col-md-auto">
                            <div className="btn-group">
                                <Link className="btn btn-primary me-1" to={`/edit/note/${note._id}`}>Edit</Link>
                                <button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>

        </div>
    )
}

export default HomePage;