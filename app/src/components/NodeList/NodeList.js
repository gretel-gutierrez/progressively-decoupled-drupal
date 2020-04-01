// Import React, and the custom components we use within this component.
import React from 'react';
// Note that these paths are relative to the current file.
import NoData from '../NoData/NoData';
import NodeItem from '../NodeItem/NodeItem';

// Display the content for each article node in Drupal
export default class NodeList extends React.Component {
    render() {
      let { data, patchNode, deleteNode } = this.props;
      return (

          <div>
            {data !== null &&
              data.data !== undefined &&
              data.data !== null &&
              data.data.length > 0 ?
              data.data.map(item =>
                <NodeItem
                  {...item}
                  key={`node-${item.id}`}
                  patchNode={patchNode}
                  deleteNode={deleteNode}
                />)
              :
              <NoData />
            }
          </div>
      );
    }
}