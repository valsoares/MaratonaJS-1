import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLink, editLink} from '../../actions/LinkActions';

import { FiRotateCcw, FiLogOut } from "react-icons/fi";

import styles from './styles.module.css';

class Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            links: {
                label: '',
                url: '',
                image: '',
                social: false
            },
            change: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        let data = JSON.parse(JSON.stringify(this.state.links));
        let id = this.props.match.params.id;
        
        try {
            await this.props.editLink(id, data);
            setTimeout(() => history.push('/list'), 500);
        }
        catch(err) {
            alert('Ocorreu algum erro, tente novamente!');
        }
    }

    handleInput(event) {
        let item = event.target.name;
        let value = event.target.name === 'social' ? event.target.checked : event.target.value;

        this.setState(prevState => ({
            links:{
              ...prevState.links,
              [item]: value
            }
        }));
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        try {
            await this.props.getLink(id);
        } catch (error) {
            alert('Ocorreu algum erro!');
        }
    }

    componentDidUpdate() {
        if((this.props.link != null) && (this.props.link != this.state.links) && (this.state.change === true)) {

            this.setState({links: this.props.link, change: false});
        }

    }
    
    render() {
        
        return(
            <div className="total">
                <header>
                    Orange
                    <Link to='/' onClick={this.handleLogOut}><FiLogOut/> Exit</Link>
                    <Link to='/list'><FiRotateCcw/> Back</Link>
                </header>
                <div className="frase">
                    <h1>Edit</h1> <h1>Your</h1> <h1>Link</h1>
                </div>
                <div className={styles.box}>
                    <form onSubmit={this.handleSubmit}>
                        <p>Label</p>
                        <input placeholder="label" name={'label'} value={this.state.links.label} onChange={this.handleInput} required/>
                        <p>Url</p>
                        <input type="url" placeholder="url" name={'url'} value={this.state.links.url} onChange={this.handleInput} required/>
                        <p>Image</p>
                        <input type="url" placeholder="image url" name={'image'} value={this.state.links.image} onChange={this.handleInput} required/>
                        <label>
                            <input type="checkbox" name={'social'} value={this.state.links.social} checked={this.state.links.social} onChange={this.handleInput} /> Is Social
                        </label>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {link: state.link.link};
}

export default connect(mapStateToProps, {getLink, editLink})(Edit);