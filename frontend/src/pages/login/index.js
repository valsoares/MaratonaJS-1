import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {signIn} from '../../actions/AccountActions';

import styles from './styles.module.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cadastro: {
                email: '',
                password: ''
            },
            message: 'vazio'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleError() {

        if(this.props.message !== this.state.message) {
            alert(this.props.message);
            this.setState({message:this.props.message});
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        let data = JSON.parse(JSON.stringify(this.state.cadastro));

        try {
            this.setState({message:'vazio'});            
            await this.props.signIn(data);
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
                    <h1>Login to</h1> <h1>Your</h1> <h1>Account</h1>
                </div>
                <div className={styles.box}>
                    <form onSubmit={this.handleSubmit}>
                        <p>Email</p>
                        <input placeholder="email" type="email" name={'email'} value={this.state.cadastro.email} onChange={this.handleInput} required/>
                        <p>Password</p>
                        <input placeholder="password" type="password" name={'password'} value={this.state.cadastro.password} onChange={this.handleInput} required/>
                        <button>Submit</button>
                    </form>
                </div>
                <footer>
                    <p>Don't have an Account?</p>
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

export default connect(mapStateToProps, {signIn})(Login);