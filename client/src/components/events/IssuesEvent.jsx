import React from 'react';
import moment from 'moment';
import markdown from 'remove-markdown';
import { ListGroupItem, Panel } from 'react-bootstrap';

const IssuesEvent = ({ event }) => (
  <ListGroupItem key={event.id} className="issue-event">
    <span className="content-img">
      <img src={event.user.avatar_url} alt='avatar' className="feed-img" />
    </span>
    <span className="content">
      <b className="content-user">@{event.user.login}</b><span className="content-break">|</span>
      <i className="content-updated">{moment(event.updated_at).startOf('day').fromNow()}</i>
      <span className="content-break">|</span>
      <span className="issue-event-label">Issue Event</span>
      <div><b>Author Association:</b> {event.author_association}</div>
      {event.org ? <div><b>Organization:</b> {event.org && event.org.login}</div> : '' }
      {/* <div><b>Repo Name:</b> {event.repo.name}</div> */}
      <div><b>Issue Title:</b> {event.title}</div>
      <div><b>Ranking:</b> {event.ranking}</div>
      <div><b>Issue Link:</b> <a href={event.html_url} style={{ color: 'white'}}>Visit Issue on Github</a></div>
      <Panel eventKey="1" className="message-ext">
        <Panel.Title toggle>View Issue Information</Panel.Title>
        <Panel.Body collapsible>
          {markdown(event.body)}
        </Panel.Body>
      </Panel>
    </span>
  </ListGroupItem>
);

export default IssuesEvent;