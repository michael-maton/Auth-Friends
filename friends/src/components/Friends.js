import React from 'react';
// import Loader from 'react-loader-spinner';
import { axiosWithAuth } from "./../utils/axiosWithAuth";

class Friends extends React.Component {
  state = {
    friends: []
  };

  componentDidMount() {
    this.getData();
    console.log("friends did mount");
  }

  getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then(res => {
          console.log(res);
        this.setState({
          friends: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  };


  formatData = () => {
    const formattedData = [];
    this.state.friends.forEach((item) => {
        formattedData.push({
            name: item.name,
            age: item.age,
            email: item.email
        })
    })
    return formattedData;
  }


  render() {
      const friends = this.formatData();
    return (
      <div className="friend-container">
          <div className="friend-list">Friends List:</div>
          {friends.map(item => (
            <div className="friend">
                <p>{item.name} {item.age}</p>
                <p>{item.email}</p>
            </div>
        ))}
      </div>
    );
  }
}

export default Friends;
