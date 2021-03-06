import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import Select from 'react-select';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Filter Repos', input: '', options: [] };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    e.preventDefault();
    this.setState({ input: e.value });
  }

  render() {
    const { name, input } = this.state;
    const { onSelect, names, searched, options } = this.props;
    return (
      searched.length === 0
      ?
      <div className="filter">
        <ButtonToolbar>
          <DropdownButton title={name} id="dropdown-size-medium">
            <Select value={input} onChange={(e) => onSelect(e.value)} options={options} />

            {names.map((repo, i) => (
              <MenuItem eventKey={repo} key={i} onSelect={(e) => {
                onSelect(e)
                this.setState({ name: e })
              }}>{repo}</MenuItem>
            ))}

            <MenuItem divider />

            <MenuItem eventKey={'Show all'} onSelect={(e) => {
              onSelect(e)
              this.setState({ name: 'Showing All' })
            }}>View All</MenuItem>
            
          </DropdownButton>
        </ButtonToolbar>
      </div>
      :
      <div />
    );
  }
}