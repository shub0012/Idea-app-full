import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import "./css/style.css";
import axios from "axios";

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangePortalId = this.onChangePortalId.bind(this);
    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeFocusArea = this.onChangeFocusArea.bind(this);
    this.onChangeProblem = this.onChangeProblem.bind(this);
    this.onChangeSolution = this.onChangeSolution.bind(this);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      date: "",
      portalID: "",
      account: "",
      department: "",
      focusArea: "",
      problem: "",
      solution: "",
    };
  }

  onChangeFname(e) {
    this.setState({
      fname: e.target.value,
    });
  }

  onChangeLname(e) {
    this.setState({
      lname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangePortalId(e) {
    this.setState({
      portalID: e.target.value,
    });
  }

  onChangeAccount(e) {
    this.setState({
      account: e.target.value,
    });
  }
  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    });
  }
  onChangeFocusArea(e) {
    this.setState({
      focusArea: e.target.value,
    });
  }
  onChangeProblem(e) {
    this.setState({
      problem: e.target.value,
    });
  }
  onChangeSolution(e) {
    this.setState({
      solution: e.target.value,
    });
  }
  //When the user clicks on submit button
  onSubmit(e) {
    e.preventDefault();

    const user = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      date: this.state.date,
      portalID: this.state.portalID,
      account: this.state.account,
      department: this.state.department,
      focusArea: this.state.focusArea,
      problem: this.state.problem,
      solution: this.state.solution,
    };

    console.log(user);

    axios
      .post("https://idea-app-backend.herokuapp.com/person", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
      message: "Idea Successfully Added!",
    });

    //window.location= '/allUsers';
  }

  render() {
    return (
      <div id="wrap" className="">
        <br />
        <br />
        <div className="container align-items-center">
          <h1>Provide Details to Add an Idea</h1>
          <br />

          <form onSubmit={this.onSubmit}>
            <div>
              First Name:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.fname}
                onChange={this.onChangeFname}
                type="text"
                placeholder="First name"
              />
            </div>
            <br />
            <div>
              Last Name:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.lname}
                onChange={this.onChangeLname}
                type="text"
                placeholder="Last name"
              />
            </div>
            <br />
            <div>
              Email:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                type="email"
                placeholder="Email"
              />
            </div>
            <br />
            <div>
              Date:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.date}
                onChange={this.onChangeDate}
                type="text"
                placeholder="Enter the Date in DD/MM/YYYY Format..."
              />
            </div>
            <br />
            <div>
              portalID:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.portalID}
                onChange={this.onChangePortalId}
                type="text"
                placeholder="PortalID"
              />
            </div>
            <br />
            <div>
              Account:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.account}
                onChange={this.onChangeAccount}
                type="text"
                placeholder="Account Name Ex : Hilton,BMW"
              />
            </div>
            <br />
            <div>
              Department:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.department}
                onChange={this.onChangeDepartment}
                type="text"
                placeholder="Department Name... Ex: App"
              />
            </div>
            <br />
            <div>
              Focus Area:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.focusArea}
                onChange={this.onChangeFocusArea}
                type="text"
                placeholder="Foucs Area Ex: Process,Client Values"
              />
            </div>
            <br />
            <div>
              Problem/Idea:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.problem}
                onChange={this.onChangeProblem}
                type="text"
                placeholder="Enter your Problem/Idea/suggestion"
              />
            </div>
            <br />
            <div>
              Solution:{" "}
              <input
                className="form-control mr-sm-2"
                required
                value={this.state.solution}
                onChange={this.onChangeSolution}
                type="text"
                placeholder="Enter your Approch for your Idea"
              />
            </div>
            <br />

            <div>
              <button className="btn btn-success" type="submit">
                Add Idea
              </button>
            </div>
          </form>

          <h3 style={{ color: "green" }} className="label label-success">
            {this.state.message}
          </h3>
        </div>
      </div>
    );
  }
}

export default AddUser;
