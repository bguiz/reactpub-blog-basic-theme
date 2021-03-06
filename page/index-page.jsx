'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const PaginationPage = require('./pagination-page.jsx');
const data = require('../theme.js').settings.get('data');

let Link = ReactRouter.Link;

let Index = React.createClass({
  render() {
    return (
      <PaginationPage
        pageId={1} />
    );
  },
});

module.exports = Index;
