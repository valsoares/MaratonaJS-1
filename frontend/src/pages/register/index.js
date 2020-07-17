import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {signUp} from '../../actions/AccountActions';

import styles from './styles.module.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cadastro: {
                email: '',
                password: '',
                password_confirmation: ''
            },
            redirect: false,
            message: 'vazio'
        }

        this.handleRegister = this.handleRegister.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleError() {

        if(this.props.message !== this.state.message) {
            alert(this.props.message);
            this.setState({message:this.props.message});
        }
    } 

    async handleRegister(e) {
        e.preventDefault();
        let data = JSON.parse(JSON.stringify(this.state.cadastro));
        
        try {
            this.setState({message:'vazio'});
            await this.props.signUp(data);
            this.setState({redirect: true});
        }
        catch(err) {
            this.handleError();
        }
    }

    handleInput(event) {
        let item = event.target.name;
        let value = event.target.value;

        this.setState(prevState => ({
            cadastro:{
              ...prevState.cadastro,
              [item]: value
            }
        }));
    }

    render() {

        if(this.props.account) {
            return <Redirect to='/list' />;
        }

        return(
            <div className="total">
                <header>Orange</header>
                <div className="frase">
                    <h1>Create</h1> <h1>Your</h1> <h1>Account</h1>
                </div>
                <div className={styles.box}>
                    <form onSubmit={this.handleRegister}>
                        <p>Email</p>
                        <input placeholder="email" type="email" name={'email'} value={this.state.cadastro.email} onChange={this.handleInput} required/>
                        <p>Password</p>
                        <input placeholder="password" type="password" name={'password'} value={this.state.cadastro.password} onChange={this.handleInput} required/>
                        <p>Password Confirmation</p>
                        <input placeholder="password" type="password" name={'password_confirmation'} value={this.state.cadastro.password_confirmation} onChange={this.handleInput} required/>
                        <button>Submit</button>
                    </form>
                </div>
                <footer>
                    <p>Already have an Account?</p>
                    <p><Link to='/'>Back to Home</Link></p>
                </footer>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        message: state.account.message
    };
}

export default connect(mapStateToProps, {signUp})(Register);