import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import {AuthUserContext} from '../Session';

import '../../css/App.css';
import 'bootstrap/dist/css/bootstrap.css'

import Header from '../Header';
import Footer from '../Footer';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
// import {withFirebase} from '../Firebase';

const App = () => (
// class App extends Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //     authUser: null,
  //   };
  // }

  // componentDidMount(){
  //   this.listener = this.props.firebase.auth.onAuthStateChanged(
  //     authUser=>{
  //       authUser ? this.setState({authUser}) : this.setState({authUser:null});
  //     },
  //   );
  // }
  //remove listener if component unmounts to avoid memory leak issues
  // componentWillUnmount(){
  //   this.listener();
  // }

  // render(){
  //   return(

      // <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
          <div>
            <Header />
            <div className="App">
              <div className="wrapper">
                <div className="nucontainer">
                  <Route exact path={ROUTES.LANDING} component={LandingPage} />
                  <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                  <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                  <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                  <Route path={ROUTES.HOME} component={HomePage} />
                  <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                  <Route path={ROUTES.ADMIN} component={AdminPage} />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      // </AuthUserContext.Provider>
  //   );
  // }
// }
);
// export default withFirebase(App);

export default withAuthentication(App);
