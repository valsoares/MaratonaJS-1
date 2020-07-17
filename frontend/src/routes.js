import React, {useEffect} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {initAccount} from './actions/AccountActions';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import List from './pages/list';
import Create from './pages/create';
import Edit from './pages/edit';

const Routes = ({initAccount}) => {
    useEffect(()=>{
        initAccount();
    }, [initAccount]);

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/singin" component={Login}/>
                <Route path="/singup" component={Register} />
                <Route path="/list" component={List} />
                <Route path="/create" component={Create} />
                <Route path="/edit/:id" component={Edit} />
            </Switch>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {account: state.account.account};
}

export default connect(mapStateToProps, {initAccount})(Routes);