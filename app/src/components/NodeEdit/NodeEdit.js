// Import React, and the custom components we use within this component.
import React from 'react';

// Displays the form for editing a node
export default class NodeEdit extends React.Component {
    constructor(props) {
      super();
      this.state = {
        input: {
          title: props.title,
          body: props.body,
        },
      };
      this.patchNode = this.patchNode.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    patchNode() {
      let data = {
          "data": {
            "id": this.props.id,
            "type": "node--article",
            "attributes": {
              "title": `${this.state.input.title}`,
              "body": {
                "value": `${this.input.value}`,
              }
          }
        }
      };
      console.log('NodeEdit: ',data);
      this.props.patchNode(this.props.id, data);
      this.props.cancelEdit();
    }

    handleChange(event, target) {
      this.setState({input: { [target]: event.target.value}}, () => console.log(this.state));
    }

    handleSubmit(e) {
      this.patchNode();
      e.preventDefault();
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
          <input
            name="title"
            type="text"
            value={this.state.input.title}
            onChange={(e) => this.handleChange(e, 'title')}
            style={styles.formItem}
          />
          <br />
          <textarea
            name="body"
            id="patch-body"
            type="textarea"
            rows="4"
            cols="30"
            ref={(input) => this.input = input}
            defaultValue={this.state.input.body}
            style={styles.formItem}
          />

          <br />
          <input
            name="submit"
            type="submit"
            value="Save"
            style={styles.button}
          />
        </form>
      );
    }
  }