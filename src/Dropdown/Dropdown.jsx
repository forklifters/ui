const cx = require('classnames');
const React = require('react');
const ReactDOM = require('react-dom');

require('./dropdown.less');


/**
 * Shared dropdown menu element
 * @property data {Array} of items to display in the dropdown,
      containing `value` and `displayName`
 * @property selectedInd {Int} of the selected index in the list
 * @property defaultDisplay {String} of default value that should be displayed
 * @property handleChange {Function} to handle dropdown click/change
 */
const Dropdown = React.createClass({

  propTypes: {
    data: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([
        React.PropTypes.string, React.PropTypes.object
      ])).isRequired,
    initialSelectedInd: React.PropTypes.number,
    selectedInd: React.PropTypes.number,
    defaultDisplay: React.PropTypes.string,
    handleChange: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {open: false};
  },

  getDefaultProps() {
    return {data: []};
  },

  _generateNodes() {
    let {data} = this.props;

    // Translate `data` from an array of strings, if necessary.
    data = data.map(item => {
      return {
        value: _.has(item, 'value') ? item.value : item,
        displayName: _.has(item, 'displayName') ? item.displayName : item,
        className: item.className,
      }
    });

    return data.map((item, ind) => {
      return (
        <option
          className={cx(item.className)}
          key={ind}
          value={item.value}>
          {item.displayName}
        </option>
      );
    });
  },

  _handleChange(event) {
    let {handleChange} = this.props;
    handleChange(event);
  },

  _determineSelectedInd() {
    const { data, initialSelectedInd, selectedInd, value } = this.props;

    // Case 1: selectedInd or initialSelectedInd provided by props
    if (typeof(selectedInd) === 'number') {
      return selectedInd;
    }

    if (typeof(initialSelectedInd) === 'number') {
      return initialSelectedInd;
    }

    // Case 2: get index of `value` from data array
    return _.map(data, item => item.value || item).indexOf(value)
  },

  render() {
    const { className, defaultDisplay } = this.props;

    const dropdownClasses = cx(
      "tui-dropdown-container",
      dropdownClasses);

    const selectedInd = this._determineSelectedInd();

    return <div className={dropdownClasses}>
      <select onChange={e => this._handleChange(e)} className="tui-dropdown">
        {selectedInd == -1 &&
          <option selected disabled key="tui-dropdown-default">{defaultDisplay}</option>}
        {this._generateNodes()}
      </select>
    </div>;
  }
});

module.exports = Dropdown;
