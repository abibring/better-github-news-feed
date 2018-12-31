import React, { Component } from 'react';
import axios from 'axios';
import HomeFeed from './HomeFeed.jsx';
import Filter from './Filter.jsx';
import NavigationBar from '../app/NavigationBar.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      isAuthenticated: false, 
      repos: [], 
      isLoading: true, 
      filterBy: '', 
      filteredRepos: [], 
      repoNames: [] 
    };
    this.userToken = this.props.userToken;
    this.signOut = this.signOut.bind(this);
    this.getStarred = this.getStarred.bind(this);
    this.confirmRedirect = this.confirmRedirect.bind(this);
    this.getReposAssociated = this.getReposAssociated.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleRepoFilter = this.handleRepoFilter.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (!this.userToken) {
      history.push('/');
    } else {
      this.setState({ isAuthenticated: true }, () => this.getStarred());
    }
  }
  
  confirmRedirect() {
    window.onbeforeunload = () => { return; };
  }
  
  signOut() {
    const { history } = this.props;
    axios.get('/logout')
    .then(() => {
      window.localStorage.clear();
      this.setState({ isAuthenticated: false }, () => history.push('/'));
    })
    .catch(() => history.push('/'));
  }
  
  getStarred() {
    this.setState({ isLoading: true })
    axios.get('/user/starred', { params: { userToken: this.userToken }})
    .then(({ data }) => this.setState({ repos: data, isLoading: false }, () => this.getReposAssociated() ))
    .catch(err => console.error(`err in componentDidMount: ${err}`));
  }
  
  getReposAssociated() {
    const { repos } = this.state;
    axios.get('/user/associated', { params: { userToken: this.userToken }})
    .then(({ data }) => {
      let allRepoData = [...repos, ...data];
      allRepoData = allRepoData.sort((a,b) => b.ranking - a.ranking);
      let repoNamesWithDups = [];
      allRepoData.map(repo => repoNamesWithDups.push(repo.html_url.split('/')[3]))
      let repoNamesUnique = [...new Set(repoNamesWithDups)];
      this.setState({ repos: allRepoData, repoNames: repoNamesUnique })
    })
    .catch(err => console.error('error with owned repos', err));
  }
  
  onSelect(e) {
    if (e === 'Show all') {
      this.setState({ filterBy: '' });
    } else {
      this.handleRepoFilter(e);
    }
  }

  handleRepoFilter(e) {
    console.log('e', e);
    const { repos } = this.state;
    this.setState({ filterBy: e }, () => {
      let filtered = repos.filter(repo => repo.html_url.split('/')[3] === e);
      this.setState({ filteredRepos: filtered });
    })
  }
  
  render() {
    const { repos, isLoading, filteredRepos, filterBy, repoNames } = this.state;
    return (
      <div className="main">
        <NavigationBar signOut={this.signOut} />
        <Filter repos={repos} names={repoNames} onSelect={this.onSelect} filtered={filteredRepos}/>
        <HomeFeed isLoading={isLoading} leave={this.confirmRedirect} repos={filterBy !== '' ? filteredRepos : repos} />
      </div>
    );
  }
}
