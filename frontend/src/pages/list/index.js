import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {logOut} from '../../actions/AccountActions';
import {listLink, deleteLink, getDelLink} from '../../actions/LinkActions';

import { FiPlus, FiRotateCcw, FiLogOut } from "react-icons/fi";

import styles from './styles.module.css';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delet: 'telahidden',
            color: 'transparent',
            id: ''
        }

        this.handleShowDelete = this.handleShowDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    async handleShowDelete(key, link) {
        let delet = (this.state.delet) == 'telahidden' ? 'telashow' : 'telahidden';
        await this.props.getDelLink(link);
        this.setState({delet:delet, id:key});
    }

    async handleDelete(e) {
        e.preventDefault();

        try {
            if(this.props.linkDelete) {
                await this.props.deleteLink(this.props.linkDelete);
            }
            let delet = (this.state.delet) == 'telahidden' ? 'telashow' : 'telahidden';
            this.setState({delet:delet});
        } catch (error) {
            alert('Ocorreu algum erro, tente novamente!');
        }
    }

    handleLogOut() {
        this.props.logOut();
    }

    async componentWillMount() {

        try {
            await this.props.listLink();

        } catch (error) {   
            this.handleLogOut();
        }
    }

    render() {

        return(
            <div className="total">
                <header>
                    Orange
                    <Link to='/' onClick={this.handleLogOut}><FiLogOut/> Exit</Link>
                    <Link to='/'><FiRotateCcw/> Back</Link>
                </header>
                <div className="frase">
                    <h1>That's</h1> <h1>Your</h1> <h1>Links</h1>
                </div>
                <div className={styles.box}>
                    <h1><Link to='/create'><button><FiPlus />Add Link</button></Link></h1>
                    <div className={styles.conjunto}>
                        { this.props.links && this.props.links.length ? (
                            this.props.links.map((text, index) => {
                                return(
                                <div key={index} className={styles.item} style={{borderColor:((this.state.delet == 'telashow') && this.state.id === index) ? 'red' : 'transparent'}}>
                                    
                                    <div className={styles.grupo}>
                                        <p><Link to={`edit/${text.id}`}>Edit</Link></p>
                                        <p onClick={() => this.handleShowDelete(index, text)}>Delete</p>
                                    </div>
                                    <div className={styles.foto}><img src={text.image}/></div>
                                    <div className={styles.link}>
                                        <p>{text.label}</p>
                                        <a href={text.url} target="_blank" alt="logo">{text.url}</a>
                                    </div>
                                </div>
                                )
                            })
                        ) : null
                        }
                    </div>
                </div>
                <div className={styles[this.state.delet]}>
                    <div className={styles.popup}>
                        <h2>Delete Confirmation!</h2>
                        <p>Are you sure you want to delete, this action cannot be undone.</p>
                        <button onClick={this.handleShowDelete}>Cancel</button>
                        <button onClick={this.handleDelete} style={{marginLeft:'300px'}}>Delete</button>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        links: state.link.links,
        linkDelete: state.link.linkDelete
    };
}

export default connect(mapStateToProps, {logOut, listLink, deleteLink, getDelLink})(List);