import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getFreshToken} from '../../actions/AccountActions';
import {getToken, getAccount} from '../../services/account';

const TokenRefresher = ({getFreshToken}) => {
    const treshold = 30;
    const token = getToken();
    const account = getAccount();

    const calculate = () => {
    
            const tokenParts = token.split('.');
            const header = tokenParts[0];
            const payload = tokenParts[1];
            const signature = tokenParts[2];

            const data = JSON.parse(atob(payload));
            const expires = data.exp;
            const secondsToExpire = expires - (Date.now()/1000);

            const horas = Math.floor(secondsToExpire / 3600);
            const minutos = Math.floor(secondsToExpire / 60) - (horas * 60);
            const segundos = secondsToExpire % 60;

            const formatNumber = (v) => `0${Number.parseInt(v,10)}`.slice(-2);
            const Time = [horas, minutos, segundos].map(formatNumber).join(':');
            
            return secondsToExpire;
    };
    
    useEffect(()=> {
        if(account !== undefined){
            const segundos = calculate() - treshold;
            const id = setTimeout(getFreshToken, segundos * 1000);
            return () => clearTimeout(id);
        }
    }, [getFreshToken]);

    return null;

};

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps, {getFreshToken})(TokenRefresher);