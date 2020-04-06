// Called once for each node returned from JSON:API
class NodeItem extends React.Component {
  render() {
    return <div>
      <h2>{this.props.attributes.title}</h2>
      {this.props.attributes.body && <div dangerouslySetInnerHTML={{__html: this.props.attributes.body.value}} />}
    </div>;
  }
}

class NoData extends React.Component {
  render() {
    return <div>No articles found.</div>;
  }
}

class NodeList extends React.Component {
  // Initialize the this.state variable
  constructor() {
    super();
    this.state = { data: null };
    this.loadNodeData = this.loadNodeData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.checkInvalidData = this.checkInvalidData.bind(this);
  }

  // When the component first loads, it will run loadNodeData()
  componentWillMount() {
    this.loadNodeData();
  }

  loadNodeData() {
    // Point to local Drupal instance.
    const API_ROOT = 'https://my-drupal8-site.ddev.site/jsonapi/';
    const url = `${API_ROOT}node/article`;

    // Retrieve data from Drupal's API and sends it to updateData()
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then((data) => this.updateData(data))
      .catch(err => console.log('API got an error', err))
  }

  updateData(responseData) {
    const validatedData = this.checkInvalidData(responseData);
    console.log('validatedData: ', validatedData);

    // Data is being retrieved
    if (validatedData) {
      this.setState( { data: responseData.data }, () => console.log('state', this.state));
    }
  }

  // Validator function
  checkInvalidData(data) {
    if (data === null) {
      return false;
    }
    if (data.data === undefined ||
        data.data === null ||
        data.data.length === 0 ) {
      return false;
    }
    return true;
  }

  render() {
    // Add css to identify the current node
    const style = {
      nodeItem: {
        border: '2px solid black',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#ccc',
      },
      nodeItemActive: {
        border: '3px solid red',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#fff',
      }
    };

    return (
      <div>
        <h2>Content list</h2>

        {this.state.data !== null ?
          this.state.data.map(item => {
            let className = 'nodeItem';
            let current = false;

            console.log('Number(this.props.nid): ', Number(this.props.nid));
            console.log('Number(item.attributes.nid): ', Number(item.attributes.drupal_internal__nid));

            if (Number(this.props.nid) === Number(item.attributes.drupal_internal__nid)) {
              className = 'nodeItemActive';
              current = true;
            }

            console.log(className);
            return (<div style={style[className]}> <NodeItem current={current} {...item} /> </div>);
          } )
          :
          <NoData />
        }
      </div>
    );
  }
}

// data-nid is retrieved and passed as a prop to the NodeList component.
ReactDOM.render(
  <NodeList
    nid = { document.getElementById('react-app').getAttribute('data-nid') }
  />,
  document.getElementById('react-app')
);
