import React from "react";
import "./App.css";
import axios from "axios";

class Row extends React.Component {
  approveRequest = async (id) => {
    console.log(`request for approving id ${id}`);
    axios.put("/users/approved", { id }).then(() => this.props.approve(this));
  };

  render() {
    return (
      <tr key={this.props.x.id}>
        <td>{this.props.x.id}</td>
        <td>{this.props.x.name}</td>
        <td>
          <img
            src="https://img.icons8.com/bubbles/50/000000/user.png"
            height="25"
            alt="user icon"
          />
        </td>
        <td></td>
        <td>
          <button
            id={this.props.x.id}
            onClick={() => this.approveRequest(this.props.x.id)}
            disabled={this.props.x.isApprove}
          >
            {this.props.x.isApprove ? "approved" : "approve"}
          </button>
        </td>
      </tr>
    );
  }
}

class Table extends React.Component {
  state = {
    userList: [],
  };
  componentDidMount() {
    this.requestUsers();
    this.requestUsers.bind(this);
    this.props.setRequestUser(this.requestUsers);
  }
  requestUsers = () => {
    axios
      .get("/users/")
      // .then((res)=> console.log(res))
      .then((res) => {
        this.setState({
          userList: res.data.userList,
        });
      });
  };

  render() {
    return (
      <>
        <table>
          <thead>
            <tr className="t-head" key={0}>
              <td className="t-data">Id</td>
              <td className="t-data">Name</td>
              <td className="t-data">Image</td>
              <td className="t-data"></td>
              <td className="t-data">Resolve</td>
            </tr>
          </thead>
          <br />
          <tbody>
            {this.state.userList.map((x) => {
              if (!x.isApprove) {
                return (
                  <Row x={x} key={x.id} approve={() => this.requestUsers()} />
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <br />
          <tbody>
            {this.state.userList.map((x) => {
              if (x.isApprove) {
                return <Row x={x} key={x.id} />;
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </>
    );
  }
}

class App extends React.Component {
  state = {
    requestUsers: () => {},
    name: "",
  };

  setRequestUser = (func1) => {
    this.setState({ requestUsers: func1 });
  };
  changeHandler = (e) => {
    let nameValue = e.target.value;
    this.setState({ name: nameValue });
  };
  createUser = async (name) => {
    console.log(name);
    if (name.length === 0) {
      return;
    }
    axios.post("/users/create", { name }).then(() => {
      this.state.requestUsers()
      this.setState({name:""})
    });
  };
  render() {
    return (
      <>
        <div className="container">
          <h1 className="h-title">BIO BAZAAR</h1>
          <div className="flex-item header-wrapper">
            <label className="lable-class">Enter Name</label>&nbsp;&nbsp;&nbsp;
            <input
              id="input-name"
              placeholder="enter your name"
              value={this.state.name}
              onChange={this.changeHandler}
            />&nbsp;&nbsp;&nbsp;
            <button
              onClick={() => this.createUser(this.state.name)}
              className="create-user-btn"
            >
              Create New User
            </button>
          </div>

          <br />
          <br />
          <Table setRequestUser={(fun1) => this.setRequestUser(fun1)} />
        </div>
      </>
    );
  }
}

export default App;
