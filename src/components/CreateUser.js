import React, { Component } from 'react'
import axios from 'axios'



export default class CreateUser extends Component {
    BASE_URL = 'http://localhost:4000/'


    state = {
        users: [],
        username:''
    }

    async componentDidMount(){
        this.getUsers()
    }

    getUsers = async () => {
        let res = await axios.get(this.BASE_URL + 'api/users')
        this.setState({
            users: res.data,
            username: ''
        })
    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        }) 
    }

    onSubmit = async e => {
        e.preventDefault()
        await axios.post(this.BASE_URL + 'api/users', {
            username: this.state.username
        })
        this.setState({ username: ''})
        this.getUsers()

    }

    deleteUser = async id => {
        await axios.delete(this.BASE_URL + 'api/users/' + id)
        this.getUsers()
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Crear usuario
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre de usuario" 
                                    onChange={this.onChangeUsername}
                                    value={this.state.username}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Guardar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => 
                                (<li 
                                className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}
                                >
                                {user.username}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
