import React from 'react';
import moment from 'moment';
import { ListGroupItem, Panel } from 'react-bootstrap';

const PullRequest = ({ pull }) => (
  <ListGroupItem key={pull.id} className="events">
    <span className="content-img">
      <img src={pull.user.avatar_url} alt='avatar of pull creator' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{pull.user.login}</b>
      <span className="content-break">|</span>
      <i className="content-updated">{moment(pull.updated_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      {pull.pull_request ? 'Pull Request' : 'Issue Event'}
      <div><b>Repo Name: </b>{pull.html_url.slice(19).split('/')[0]}</div>
      <div><b>Repo Owner: {pull.html_url.slice(19).split('/')[1]}</b></div>
      <div><b>Title: </b>{pull.title}</div>
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle>View Issue Message</Panel.Title>
        <Panel.Body collapsible>
          {pull.body}
        </Panel.Body>
      </Panel>
      {pull.pull_request 
      ? 
      <div><b>Pull Request Link: </b><a href={pull.pull_request.html_url}>{pull.pull_request.html_url}</a></div>
      :
      <div><b>Issue Link: </b><a href={pull.html_url}>{pull.html_url}</a></div>
      }
    </span>
  </ListGroupItem>
);

export default PullRequest;