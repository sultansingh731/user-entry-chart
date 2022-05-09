import { useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function Header() {
  const [getName, setName] = useState("");

  const changeHandler = (e) => {
    let nameValue = e.target.value;
    setName(nameValue);
  };
  const createUser = async (name) => {
    console.log(name);
    if (name.length === 0) {
      return;
    }
    await axios.post("/users/create", { name });
  };

  return (
    <>
      <h1 className="h-title">BIO BAZAAR</h1>
      <label className="lable-class">Enter Name</label>
      <input
        id="input-name"
        placeholder="enter your name"
        value={getName}
        onChange={changeHandler}
      />
      <button onClick={() => createUser()} className="create-user-btn">
        Create New User
      </button>
      <br />
      <br />
    </>
  );
}

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
  constructor() {
    super();
    this.state = {
      userList: [],
    };
  }
  componentDidMount() {
    this.requestUsers();
  }
  requestUsers() {
    axios
      .get("/users/")
      // .then((res)=> console.log(res))
      .then((res) => {
        this.setState({
          userList: res.data.userList,
        });
      });
  }

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

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Table />
      </div>
    </>
  );
}

export default App;
