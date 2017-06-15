import React, { Component } from 'react';

import User from "./components/User";
import Content from "./components/Content";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchTweets();
  }

  fetchTweets = () => {
    const url = "https://pioller.herokuapp.com/api/v1/tweets";
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer bebac12905c259cf6e75c9ff70297cc40d3421346ce3480431106604c3a85d8e921c7f175970c2e555f82d9463030cdead12837866fac471fe66b3a993d6bcda",
      },
    };
    return fetch(url, options)
      .then(data => data.json())
      .then(data => {
        this.setState({
          tweets: data.tweets,
          error: null,
        });
      })
      .catch(err => {
        this.setState({ error: err })
      });
  }

  render() {
    const { tweets, error } = this.state;

    return (
      <div>
        <h1>Cliente de tweets</h1>
        <ul>
          {error && (
            <p>
              {error.message}
            </p>
          )}
          {tweets.length === 0 && (
            <p>
              No hay tweets
            </p>
          )}
          {tweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </ul>
        <button onClick={this.fetchTweets}>Refresh</button>
      </div>
    );
  }
}

class Tweet extends Component {
  render() {
    const { tweet, ...props } = this.props;
    return (
      <li {...props}>
        <User private={tweet.private}>{tweet.user.first_name} {tweet.user.last_name}</User>
        <Content>
          {tweet.content}
        </Content>
      </li>
    )
  }
}

export default App;
