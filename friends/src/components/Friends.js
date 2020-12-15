import React from "react";
// import Loader from 'react-loader-spinner';
import { axiosWithAuth } from "./../utils/axiosWithAuth";
import { v4 as uuidv4 } from 'uuid';

class Friends extends React.Component {
  state = {
    friends: [],
    newFriend: {
      name: "",
      age: "",
      email: "",
    },
  };

  componentDidMount() {
    this.getData();
    console.log("friends did mount");
  }

  getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log(res);
        this.setState({
          friends: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formatData = () => {
    const formattedData = [];
    this.state.friends.forEach((item) => {
      formattedData.push({
        name: item.name,
        age: item.age,
        email: item.email,
      });
    });
    return formattedData;
  };

  handleChange = (e) => {
    this.setState({
      newFriend: {
        ...this.state.newFriend,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.newFriend);
    axiosWithAuth()
      .post("/friends", this.state.newFriend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const friends = this.formatData();
    return (
      <div className="friends-page">
        <form onSubmit={this.handleSubmit} className="friends-form">
          <label>
            Name
            <br />
            <input
              type="text"
              name="name"
              value={this.state.newFriend.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Age
            <br />
            <input
              type="text"
              name="age"
              value={this.state.newFriend.age}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email
            <br />
            <input
              type="email"
              name="email"
              value={this.state.newFriend.email}
              onChange={this.handleChange}
            />
          </label>
          <button>Add New Friend</button>
        </form>
        <div className="friend-container">
          <div className="friend-list-header">Friends List:</div>
          {friends.map((item) => (
            <div key={uuidv4()} className="friend">
              <p>
                {item.name}, {item.age}
              </p>
              <p>{item.email}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Friends;
