const React     = require('react')

// this is a very basic bootstrap navbar - it does NOT use the react-bootstrap library
class Navbar extends React.Component {

  render() {
    return (<div>

      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#"><img alt="ReactBrand" src="images/reactlogo.png" /></a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="http://tomnorian.com" target="_blank">Tom Norian Blog Link</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right" >
              {
                this.props.currentUser.uid ?
                <div>
                  <span className="navbar-brand">{this.props.currentUser.userName}</span>
                  <span className="navbar-brand btn" onClick={ () => this.props.handleLogout()} >Logout</span>
                </div>

                :
                  <span className="navbar-brand btn" onClick={ () => this.props.handleLogin()}> Login</span>

              }
            
            </ul>
          </div>
        </div>
      </nav>
    </div>)
  }
}

module.exports = Navbar