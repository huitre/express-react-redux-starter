import React from 'react';
import crypto from 'crypto-browserify';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

class Home extends React.Component {
  state = {
    balance: []
  }
  componentWillMount() {
    this.fetchBalance().then(data => this.setState({ balance: data })).catch(e => console.log(e));
  }
  fetchBalance() {
    return axios.get(`${API_URL}/balance`);
  }
  render() {
    return (
      <div className="container home">
        <h1>Home</h1>
      </div>
    )
  }
}

export default Home;
