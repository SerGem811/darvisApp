import { Component, cloneElement } from 'react';
import interact from 'interact.js';

export default class PointDiv extends Component {
  static defaultProps = {
    draggable: false,
    resizable: false,
    draggableOptions: {},
    resizableOptions: {},
  };

  componentDidMount() {
    this.interact = interact(this.node);
    this.setInteractions();
  }

  componentWillReceiveProps() {
    this.interact = interact(this.node);
    this.setInteractions();
  }

  setInteractions() {
    const { draggable, resizable, draggableOptions, resizableOptions } = this.props;
    if (draggable) this.interact.draggable(draggableOptions);
    if (resizable) this.interact.resizable(resizableOptions);
  }

  render() {
    const { children } = this.props;
    return cloneElement(children, {
      ref: node => {
        this.node = node;
      },
      draggable: false,
    });
  }
}

PointDiv.propTypes = {};
