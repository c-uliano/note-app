import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const HomePage = (props) => {
    // * state
    const [list, setList] = useState([]);

    // TODO update api link
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

    // TODO update api link
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

            <div className='row align-items-center'>
                <div className="col-md-6 text-center">
                    <h1>Create<br />A<br />Note</h1>
                    <Link to="/new/note" className='btn btn-primary'>New Note</Link>
                </div>
                <div className="col-md-6">
                    <p>Insert Content Here</p>

                    {list.map((note) => {
                        return (
                            <div className="row align-items-center border-bottom mb-4" key={note._id}>
                                <div className="col-md">
                                    <h3><Link to={`/view/note/${note._id}`}>{note.title}</Link></h3>
                                </div>
                                <div className="col-md-auto">
                                    <p><Link to={`/edit/note/${note._id}`} className='btn btn-primary me-3'>Edit</Link><button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button></p>
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