import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client'; 
import { ApolloProvider } from 'react-apollo'; /**ApolloProvider glues react with ApolloStore (which is agnostic to what frontend JS
framework that i'll be using. ApolloStore is where our data is. Its an abstract layer fetching data from our graphql server. **/

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

//ApolloClient assumes that we'll be listening to /graphql endpoints as mentioned in server.js

const client = new ApolloClient({
  //Following is a caching system. If you dont use this, you could use the refetch way to update client.
  dataIdFromObject: o => o.id // this makes apollo client takes every piece of data and pass it through the function. The result of this function is saved inside the apollo store. Only works when all the IDs in our appln is unique
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
