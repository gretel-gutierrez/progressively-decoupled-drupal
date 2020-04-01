 // Import React, and the custom components we use within this component.
import React from 'react';

 // Displays a form for adding a new node
 export default class NodeNew extends React.Component {
    constructor() {
      super();
      this.state = {
        input: {
          title: '',
        },
      };
      this.postNode = this.postNode.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    postNode() {
      let data = {
        "data": {
          "type": "node--article", // Not in documentation but required.
          "attributes": {
            "title": `${this.state.input.title}`,
            "body": {
              "value": `${this.input.value}`,
              "format": 'plain_text',
            }
          }
        }
      };
      console.log('NodeNew: ',data);
      this.props.postNode(data);
    }

    handleChange(event, target) {
      this.setState({input: { [target]: event.target.value}}, () => console.log(this.state));
    }

    handleSubmit(event) {
      this.postNode();
      event.preventDefault();
      // Clear out form.
      this.setState({input: { title: ''}});
      document.getElementById('post-body').value = "";
    }

    render() {
      let styles = {
        form: {
          margin: '30px'
        },
        formItem: {
          margin: '10px'
        }
      }
      return (
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <h3>Add a new article</h3>
          <input
            name="title"
            type="text"
            value={this.state.input.title}
            placeholder="Title"
            onChange={(e) => this.handleChange(e, 'title')}
            style={styles.formItem}
          />
          <br />
          <textarea
            id="post-body"
            name="body"
            type="textarea"
            rows="4"
            cols="30"
            ref={(input) => this.input = input}
            placeholder="Body"
            style={styles.formItem}
          />
          <br />
          <input
            name="submit"
            type="submit"
            value="Add Node"
            style={styles.button}
          />
        </form>
      );
    }
  }