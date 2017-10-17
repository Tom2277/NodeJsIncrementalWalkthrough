const React     = require('react')


class GenericComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      title: props.sectionTitle,
      elements: props.elements,
      selectedElement:  { name: "Great Idea", details:"The best way to get something done is to begin!"}
    }

    this.elementsUpdate = this.elementsUpdate.bind(this)

  }

  elementsUpdate(index){
    console.log( index , "was index")
    this.setState({selectedElement: this.state.elements[index]})
  }
 

  render() {
    return (<div className="generic-component container">
      <div className="col-md-12">
        <div className="col-md-6">
          <section>
            <h5>{this.state.title}</h5>
            <div className="well" key="selected-generic-element" >
              <h3>{this.state.selectedElement.name}</h3>
              <p>{this.state.selectedElement.details}</p>
            </div>
          </section>
        </div>
        <div className="col-md-6">
          <h5>Press Numbers to Change the Message</h5>
          <div className="btn-group well" >
            {
              this.state.elements.map((elem, index) => {
                return <button key={index} className="btn"  onClick={() => this.elementsUpdate(index)}  >{ index + 1 }</button>
              })
            }
          </div>
        </div>
      </div>
    </div>)
  }
}

module.exports = GenericComponent