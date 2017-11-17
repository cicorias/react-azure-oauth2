import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: null,
            lastName: null,
            loginName: null,
            isOpen: false
        }
    }
    render() {
        return (
            <div>This would be a login control...</div>
        )
    }
}