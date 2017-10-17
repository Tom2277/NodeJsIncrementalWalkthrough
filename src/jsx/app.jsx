const ReactDOM  = require('react-dom')
const React     = require('react')

const GenericComponent = require('./GenericComponent/generic-component.jsx')
const GenericData = require('./GenericComponent/generic-data.js')
const Navbar = require('./Navbar/navbar.jsx')

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      genericData: GenericData,
      currentUser: {}
    }

    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.log("dummyLogout")
    this.setState({
      currentUser: { userName: "", uid: ""}
    });
  }
  
  login() {
    console.log('dummyLogin')
    this.setState({
      currentUser: {
        userName: "John Doe",
        uid: 12345
      }
    });
  }

  render(){
    return(<div>
      <Navbar currentUser={this.state.currentUser} handleLogin={this.login} handleLogout={this.logout}  />
      <div className="hello-message">
        <h1>Hello Starter World!</h1>
        <p> Tom Norian React Starter Kit </p>
      </div>
      <GenericComponent sectionTitle="sectionTitle from App Props" elements= {this.state.genericData} />
    </div>)
  }

}


ReactDOM.render(<div>
      <App />
    </div>,
  document.getElementById('content')
)