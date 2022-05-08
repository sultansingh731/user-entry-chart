import { useEffect, useState } from "react";
import React from "react";
import "./App.css"
import axios from "axios";
import { render } from "@testing-library/react"; 

const createUser = (name) => {
  console.log(name);
  if (name.length === 0) {
    return
  }
  axios.post("http://localhost:5000/users/create", { name })
    .then(data => {
      document.location.reload()
    })
}

function Header() {
  const [getName, setName] = useState("")
  const changeHandler = (e) => {
    let nameValue = e.target.value
    setName(nameValue)
  }
  return (
    <>
      <h1 className="h-title">BIO BAZAAR</h1>
      <label className="lable-class">Enter Name</label>
      <input id="input-name"
        placeholder="enter your name"
        value={getName}
        onChange={changeHandler} />
      <button onClick={() => createUser(getName)} className="create-user-btn">
        Create New User
      </button>
      <br />
      <br />
    </>
  );
}

const approveRequest = (id) => {
  console.log(`request for approving id ${id}`);
  axios.put("http://localhost:5000/users/approved", { id })
    .then(data => {
      document.location.reload()
    })
};

function Row(props) {
  let x = props.x;

  return (
    <tr key={x.id}>
      <td>{x.id}</td>
      <td>{x.name}</td>
      <td>
        <img
          src="https://img.icons8.com/bubbles/50/000000/user.png"
          height="25"
          alt="user icon"
        />
      </td>
      <td></td>
      <td>
        <button id={x.id} onClick={() => approveRequest(x.id)} disabled={x.isApprove}>
          {x.isApprove ? "approved" : "approve"}
        </button>
      </td>
    </tr>
  );
}

class Table extends React.Component {
  constructor() {
    super()
    this.state = {
      userList: []
    }

    axios.get("http://localhost:5000/users/")
      // .then((res)=> console.log(res))   
      .then((res) => {
        this.setState({
          userList: res.data.userList
        })
      })


  }
  // let userList = [
  //   { id: 1, name: "oops", isApprove: false },
  //   { id: 2, name: "oops", isApprove: false },
  //   { id: 3, name: "oops", isApprove: false },
  //   { id: 4, name: "oops", isApprove: true },
  //   { id: 5, name: "oops", isApprove: true },
  //   { id: 6, name: "oops", isApprove: true }
  // ]
  render() {
    return (<>
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
              return <Row x={x} key={x.id} />;
            }
            else {
              return null
            }
          })}
        </tbody>
        <br />
        <tbody>
          {this.state.userList.map((x) => {
            if (x.isApprove) {
              return <Row x={x} key={x.id} />;
            }
            else {
              return null
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
