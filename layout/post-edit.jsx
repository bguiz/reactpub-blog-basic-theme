'use strict';

const React = require('react');

const config = require('../theme.js').settings.get('config');

let PostEdit = React.createClass({
  render() {
    let component;
    if (typeof config.sourceLinkPrefix === 'string') {
      let editUrl = `${config.sourceLinkPrefix}${this.props.post.meta.source}`;
      component = (
        <a
          href={editUrl}
          target="_blank">
          Edit this content
        </a>
      );
    }
    return component;
  },
});

module.exports = PostEdit;
