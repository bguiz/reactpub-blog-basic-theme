'use strict';

const React = require('react');
const marked = require('marked');
const reactCssModules = require('react-css-modules');
const highlightJs = require('highlight.js/lib/highlight.js');

const data = require('../theme.js').settings.get('data');
const markdownCss = require('./markdown.css');

[
  'javascript',
  'json',
  'bash',
  'css',
  'go',
  'haskell',
  'python',
  'rust'
].forEach((language) => {
  // Register languages manually so that we do not need to load the whole lot
  highlightJs.registerLanguage(
    language,
    require(`highlight.js/lib/languages/${language}.js`));
});

highlightJs.configure({
  useBR: false,
});
const markedRender = new marked.Renderer();
markedRender.code = (code, language) => {
  let highlightedCode;
  if (language) {
    try {
      highlightedCode = highlightJs.highlight(language, code);
    } catch (ex) {
      //do nothing
    }
  }
  if (!highlightedCode) {
    highlightedCode = highlightJs.highlightAuto(code);
  }
  return `<pre class="hljs ${language} lang-${language}">${highlightedCode.value}</pre>`;
}

let Markdown = React.createClass({
  getInitialState() {
    return {
    };
  },

  componentWillReceiveProps(nextProps) {
    this.loadPostBody(nextProps);
  },

  render() {
    let markup = this.getMarkup(this.props.markdown);
    return (
      <span
        styleName="markdown-render"
        dangerouslySetInnerHTML={markup} />
    );
  },

  loadPostBody(props) {
    props = props || this.props;
    if (props.markdown) {
      let markup = this.getMarkup(props.markdown);
      this.setState({
        markup,
      });
    }
    else {
      //TODO load asynchonously based on this.props.src
      // this.getMarkup('?????');
      // this.setState({
      //   markup,
      // });
    }
  },

  getMarkup(markdown) {
    let markup = marked(
      markdown,
      {
        renderer: markedRender,
        sanitize: false,
        smartypants: true,
        smartLists: true,
      }
    );
    markup = {
      __html: markup,
    }
    return markup;
  },

});

module.exports = reactCssModules(Markdown, markdownCss);
