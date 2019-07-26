import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { Redirect } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {
    BASE_URL = 'http://localhost:4000/'


    state = {
        users: [],
        userSelected: '',
        title:'',
        content:'',
        date: Date.now(),
        editing: false,
        _id: ''
    }

    async componentDidMount(){
        this.getUsers()
    }

    onSubmit = async e => {
        console.log(this.state)
        e.preventDefault()
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        if(this.state.editing) {
            await axios.put(this.BASE_URL + 'api/notes/' + this.state._id, newNote)
        } else {
            await axios.post(this.BASE_URL + 'api/notes', newNote)
        }
        window.location.href = '/'
    }

    getUsers = async () => {
        let res = await axios.get(this.BASE_URL + 'api/users')
        this.setState({
            users: res.data,
            userSelected: res.data[0].username
        })
        if( this.props.match.params.id ) {
            const res = await axios.get(this.BASE_URL + 'api/notes/' + this.props.match.params.id)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }
        console.log(this.state)
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">Crear Nota</div>
                        <div className="card-body">
                        {/* SELECT USER */}
                        <div className="form-group">
                            <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                            value={this.state.userSelected}
                            >
                                {
                                    this.state.users.map(user => 
                                    <option key={user._id} value={user.username}>{user.username}</option> )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="titulo" 
                            name="title"
                            onChange={this.onInputChange}
                            required
                            value={this.state.title}
                            />
                        </div>
                        <div className="form-group">
                            <textarea 
                            name="content"
                            className="form-control"
                            placeholder="Contenido"
                            onChange={this.onInputChange}
                            required
                            value={this.state.content}
                            >
                            </textarea>
                        </div>

                        <div className="form-group">
                            <DatePicker 
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                            <form onSubmit={this.onSubmit}>
                                
                                <button type="submit" className="btn btn-primary">
                                    Crear nota
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
