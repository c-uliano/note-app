import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import style from './homepage.module.css';

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
    
    // * onChange handler
    const onClickStrike = (e) => {
        // console.log(e.target);
        const index = parseInt(e.target.value);
        
        const newList = list.map((item, i) => {
            if (index === i) {
                return {...item, isCompleted: !item.isCompleted}
            }
            return item;
        });
        setList(newList);
    }

    return(
        <div className="container">
    
            <div className='row app-page align-items-center'>
                <div className="col-md-6 text-center">
                    <h1 className='display-3 title-block'>Create<br />A<br />Note</h1>
                    <Link to="/new/note" className='btn btn-info'>New Note</Link>
                </div>
                
                <div className="col-md-6 mt-4 mt-md-0">
                {list && list.map((note, idx) => (
                    <div className="row align-items-center border-bottom mb-2 pb-2 text-center text-md-start" key={idx}>
                        <div className='col-md-auto'>
                            <input onChange={onClickStrike} checked={note.isCompleted} name={idx} value={idx} className="form-check-input" type="checkbox" />
                        </div>
                        <div className="col-md">
                            <h3><Link to={`/view/note/${note._id}`} className={style.hoverUnderline}><span className={note.isCompleted ? style.strikeThrough : null}>{note.title}</span></Link></h3>
                        </div>
                        <div className="col-md-auto">
                            <div>
                                {note.isCompleted ? (
                                    <button className="btn btn-danger" onClick={(e) => deleteOneHandler(note._id)}>Delete</button>
                                ) : (
                                    <Link className="btn btn-primary me-1" to={`/edit/note/${note._id}`}>Edit</Link>
                                )}
                            </div>
                        </div>
                    </div>
                    )
                )}
                </div>
            </div>

        </div>
    )
}

export default HomePage;