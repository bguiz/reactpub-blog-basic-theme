'use strict';

const React = require('react');
const ReactDisqusThread = require('react-disqus-thread');

const config = require('../theme.js').settings.get('config');

let DisqusComments = React.createClass({
  render() {
    let url = `${config.baseUrl}${this.props.location.pathname}`;
    return (
      <ReactDisqusThread
        shortname={config.disqusId}
        identifier={url}
        title={this.props.post.meta.title}
        url={url} />
    );
  },
});

module.exports = DisqusComments;
