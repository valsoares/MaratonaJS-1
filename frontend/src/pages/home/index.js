import React from 'react';
import {Link} from 'react-router-dom';
import { FiLogIn, FiUserPlus } from "react-icons/fi";

import styles from './styles.module.css';

export default class Home extends React.Component {
    render() {
        return(
            <div className={styles.total}>
                <header>Orange</header>
                <div className={styles.frase}>
                    <h1>Your Link</h1> <h1>Repository</h1>
                </div>
                
                    <div className={styles.box}>
                        <div className={styles.grupo}>
                            <p>Already have an Account?</p>
                            <Link to='singin'><button><FiLogIn /> Sing In</button></Link>
                        </div>
                        <div className={styles.grupo}>
                            <p>Don't have an Account?</p>
                            <Link to='singup'><button><FiUserPlus /> Sing Up</button></Link>
                        </div>
                    </div>
               
            </div>
        );
    }
}