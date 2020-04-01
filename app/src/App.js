import React from 'react';
import NodeList from './components/NodeList/NodeList';
import NodeNew from './components/NodeNew/NodeNew';
import './App.css';

// Create a config setting
const config =  {
  base: 'https://my-drupal8-site.ddev.site:8300',
};

const JSONAPI_ROOT = `${config.base}/jsonapi/`;

// Set the headers as a constant variable
const headers = new Headers({
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'Cache': 'no-cache'
});


// Main component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
    console.log('App');

    this.loadNodeData = this.loadNodeData.bind(this);
    this.postNode = this.postNode.bind(this);
    this.patchNode = this.patchNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.fetchJsonApiGet = this.fetchJsonApiGet.bind(this);
    this.fetchJsonApiPost = this.fetchJsonApiPost.bind(this);
    this.fetchJsonApiPatch = this.fetchJsonApiPatch.bind(this);
    this.fetchJsonApiDelete = this.fetchJsonApiDelete.bind(this);
    this.updateData = this.updateData.bind(this);
    this.checkInvalidData = this.checkInvalidData.bind(this);
  }

  componentWillMount() {
    this.loadNodeData();
  }

  // GET list of node content & store in this.state.data
  loadNodeData() {
    console.log('loadNodeData');
    this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/article`, true);
  }

  // Update the data object in state
  updateData(destination, responseData, validate = true) {
    const validatedData = this.checkInvalidData(responseData, validate);
    if (validatedData || validate === false) {
      this.setState( { [destination]: responseData }, () => console.log('updateData: ',this.state));
    }
  }

  // Check that the data response is in the format we expect.
  checkInvalidData(data, validate = true) {
    if (validate) {
      if (data === null) {
        return false;
      }
      if (data.data === undefined ||
          data.data === null ) {
        return false;
      }
      return true;
    }
    return true;
  }

  // Helper function for any write/update operations
  fetchWithCSRFToken(url, options) {
    if (!options.headers.get('X-CSRF-Token')) {
      return fetch(`${config.base}/session/token?_format=json`)
        .then(response => response.text())
        .then((csrfToken) => {
          options.headers.append('X-CSRF-Token', csrfToken);
          return fetch(url, options);
        })
        .catch(err => console.log('Unable to obtain CSRF token:', err));
    }
    else {
      return fetch(url, options);
    }
  }

  // Perform GET request
  fetchJsonApiGet(destination, url) {
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then((data) => this.updateData(destination, data))
      .catch(err => console.log('API error:', err));
  }

  // POST to create new content
  postNode(data) {
    console.log('postNode: ',data);
    this.fetchJsonApiPost('post', `${JSONAPI_ROOT}node/article`, data);
  }

  fetchJsonApiPost(destination, url, postData) {
    this.fetchWithCSRFToken(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(postData)
    })
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      this.updateData(destination, data, false);
      this.loadNodeData();
    })
    .catch(err => console.log('API error:', err));
  }

  // PATCH to update existing content
  patchNode(id, data) {
    if (id !== undefined &&
        id !== null &&
        data !== undefined &&
        data !== null) {
      this.fetchJsonApiPatch('patch', `${JSONAPI_ROOT}node/article/${id}`, data);
    }
  }

  fetchJsonApiPatch(destination, url, update) {
    this.fetchWithCSRFToken(url, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers,
      body: JSON.stringify(update)
    })
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      this.updateData(destination, data, false);
      this.loadNodeData();
    })
    .catch(err => console.log('API error:', err));
  }

  // DELETE a node
  deleteNode(id) {
    if (id !== undefined && id !== null) {
      this.fetchJsonApiDelete('delete', `${JSONAPI_ROOT}node/article/${id}`);
    }
  }

  fetchJsonApiDelete(destination, url) {
    this.fetchWithCSRFToken(url, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers
    })
    .then(function(response) {
      // Should be 204
      console.log(response);
      return response;
    })
    .then((data) => {
      this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/article`);
    })
    .catch(err => console.log('API error:', err));
  }

  render() {
    return (
      <div className="App">
        <hr />
        <h2>All Articles</h2>
        <NodeList
          /* The components will update whenever the state data changes */
          data={this.state.data}
          patchNode={this.patchNode}
          deleteNode={this.deleteNode}
        />
        <hr />
        <NodeNew postNode={this.postNode} />
      </div>
    );
  }
}

export default App;