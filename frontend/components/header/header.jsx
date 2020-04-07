import React from 'react';
import {
  Link,
} from 'react-router-dom';

//header buttons
// import Menu from './menu';
import Searchbar from './searchbar';
// import Logo from './logo';
// import WatchlistButton from './watchlistbutton';
import LoginButton from './loginbutton';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    this.props.logout();
  }


  createSignin() {
    let signin = (<Link to='/signin'><LoginButton /></Link>);
    if (this.props.currentUser !== undefined) {
      let {currentUser} = this.props;
      signin = (
        <div className='regular-button'>
          <Link to={`/users/${currentUser.id}`} className='grey-hover person-icon'>&#x1f464;</Link>
          <div className='grey-hover' onClick={this.handleLogout}>
            Logout
          </div>
        </div>
      );
    }
    return signin;
  }


  render() {
    return (
      <div className='header'>
        <Link to='/'><img className='header-logo' src={window.imdbLogoURL}/></Link>
        {/* <Menu className='dead'/> */}
        {/* <Link className='dead' to='/imdbtv'><Logo pic={window.imdbTvURL}/></Link> */}
        <Searchbar />
        {/* <Link className='dead' to='/imdbpro'><Logo pic={window.imdbProURL}/></Link> */}
        {/* <Link className='dead' to='/watchlist'><WatchlistButton /></Link> */}
        {/* conditionally signed in already */}
        {this.createSignin()}
      </div>
    );
  }
  


}

export default Header;