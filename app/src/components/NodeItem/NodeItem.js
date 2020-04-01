// Import React, and the custom components we use within this component.
import React from 'react';
// Note that these paths are relative to the current file.
import NodeDelete from '../NodeDelete/NodeDelete';
import NodeEdit from '../NodeEdit/NodeEdit';

// Displays an information about an individual node
export default class NodeItem extends React.Component {
    constructor() {
      super();
      this.state = {
        showEdit: false,
      }
      this.editNode = this.editNode.bind(this);
      this.showEdit = this.showEdit.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
    }

    editNode(id) {
      this.props.editNode(id);
    }

    showEdit(e) {
      this.setState({ showEdit: true });
      e.preventDefault();
    }

    cancelEdit() {
      this.setState({ showEdit: false });
    }

    render() {
      let style = {
        content: {
          margin: '30px',
          border: '5px solid #cbcbcb',
        },
        buttons: {
          margin: '30px',
        }
      };
      return (
        <div id={this.props.id}>
          <div style={style.content}>
            <h2>{this.props.attributes.title}</h2>
            {this.props.attributes.body && <div dangerouslySetInnerHTML={{__html: this.props.attributes.body.value}} />}
          </div>
          <hr />
          <div style={style.buttons}>
            {this.state.showEdit === false &&
              <div>
                <button onClick={(e) => this.showEdit(e)}>
                  Edit
                </button>
              </div>
            }
            {this.state.showEdit === true &&
              <div>
                <NodeEdit {...this.props} title={this.props.attributes.title} body={this.props.attributes.body.value} cancelEdit={this.cancelEdit} />
                <button onClick={() => this.cancelEdit()}>
                  View
                </button>
              </div>
            }
            <NodeDelete {...this.props} />
          </div>
        </div>
      );
    }
  }