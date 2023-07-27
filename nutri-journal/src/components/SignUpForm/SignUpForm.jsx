import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };

    // The object passed to setState is merged with the current state object
    handleChange = (evt) => {
        this.setState({
        [evt.target.name]: evt.target.value,
        error: ''
        });
    };

    handleSubmit = async (evt) => {
        // Prevent form from being submitted to the server
        evt.preventDefault();
      try {
        // We don't want to send the 'error' or 'confirm' property,
        //  so let's make a copy of the state object, then delete them
        const formData = {...this.state};
        delete formData.error;
        delete formData.confirm;

        const user = await signUp(formData);
        // Baby step!
        this.props.setUser(user);
      } catch {
          // An error occurred 
          this.setState({ error: 'Sign Up Failed - Try Again' });
        }
      };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
        <div className="form-container">
        <form className="px-4 py-3" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleDropdownFormEmail1">Name</label>
            <input type="text" className="form-control" id="exampleDropdownFormEmail1" name="name" value={this.state.name} placeholder="John Doe" onChange={this.handleChange} required></input>
            <small id="emailHelpBlock" className="form-text text-muted">
              Please enter your name.
            </small>
          </div>
          <br></br>
          <div className="form-group">
            <label for="exampleDropdownFormPassword1">Email</label>
            <input type="email" className="form-control" id="exampleDropdownFormPassword1" name="email" value={this.state.email} placeholder="yourname@example.com" onChange={this.handleChange} required></input>
            <small id="passwordHelpBlock" className="form-text text-muted">
              Please enter your email address.
            </small>
          </div>
          <br></br>
          <div className="form-group">
            <label for="exampleDropdownFormPassword1">Password</label>
            <input type="password" className="form-control" id="exampleDropdownFormPassword1" name="password" value={this.state.password} placeholder="**********" onChange={this.handleChange} required></input>
            <small id="passwordHelpBlock" className="form-text text-muted">
              Your password must be 4 characters long.
            </small>
          </div>
          <br></br>
          <div className="form-group">
            <label for="exampleDropdownFormPassword1">Confirm Password</label>
            <input type="password" className="form-control" id="exampleDropdownFormPassword1" name="confirm" value={this.state.confirm} placeholder="**********" onChange={this.handleChange} required></input>
            <small id="passwordHelpBlock" className="form-text text-muted">
              Please key in your password again.
            </small>
          </div>
          <br></br>
          <button type="submit" disabled={disable} className="btn btn-primary">Sign up</button>
        </form>
        <div className="dropdown-divider"></div>
        </div>
        );
      }
  }