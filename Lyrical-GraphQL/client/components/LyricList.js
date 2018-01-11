import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {
  //check data in console, you'll see __typename as the return type of data.
  onLike(id, likes) {
    //this.props.mutate is how we trigger our mutation from react.
    this.props.mutate({
      variables: { id },

      /**
       * optimisticResponse : this is when you want graphql to update your UI
       * before waiting for the backend to send a response to your mutation. When
       * the response comes, it will rerender itself. This is to make the effect
       * snappy.
       * id,
          __typename: 'LyricType',
          likes: likes + 1

          copy that structure right from the body as seen in console.
       */
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
