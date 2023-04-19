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

            <div className=''>
                <div className="">
                    <h1>Create<br />A<br />Note</h1>
                    <Link to="/new/note" className=''>New Note</Link>
                </div>
                <div className="">
                    {list.map((note) => {
                        return (
                            <div className="" key={note._id}>
                                <div className="">
                                    <h3><Link to={`/view/note/${note._id}`}>{note.title}</Link></h3>
                                </div>
                                <div className="">
                                    <p><Link to={`/edit/note/${note._id}`} className=''>Edit</Link><button className="" onClick={(e) => deleteOneHandler(note._id)}>Delete</button></p>
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