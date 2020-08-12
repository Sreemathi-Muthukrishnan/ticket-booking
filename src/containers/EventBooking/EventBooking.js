import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../Input/Input";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./EventBooking.module.css";
import * as actions from "../../store/actions/index";
class EventBooking extends Component {
  state = {
    bookForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Name",
        },
        value: "",
        label: "Name of Attendee",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Mail Address",
        },
        value: "",
        label: "Email Address",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      numberOfSeats: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: 1, displayValue: "1" },
            { value: 2, displayValue: "2" },
            { value: 3, displayValue: "3" },
            { value: 4, displayValue: "4" },
            { value: 5, displayValue: "5" },
            { value: 6, displayValue: "6" },
          ],
        },
        value: 1,
        valid: true,
        label: "Number of seats",
        validation: {},
      },
    },
    booked: false,
    formIsValid: false,
  };
  cancelHandler = () => {
    this.props.history.push("/");
  };
  bookHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.bookForm) {
      formData[formElementIdentifier] = this.state.bookForm[
        formElementIdentifier
      ].value;
    }
    const updatedBookForm = {
        ...this.state.bookForm,
      };
    updatedBookForm.name.value="";
    updatedBookForm.email.value="";
    updatedBookForm.numberOfSeats.value = 1;
    this.setState({
      booked: true,
      bookForm:updatedBookForm,
      formIsValid:false,
    });
    this.props.onBooked(formData);
    console.log(formData);
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedBookForm = {
      ...this.state.bookForm,
    };
    const updatedFormElement = {
      ...updatedBookForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedBookForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedBookForm) {
      formIsValid = updatedBookForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      bookForm: updatedBookForm,
      formIsValid: formIsValid,
    });
  };
  componentDidMount() {
    console.log(this.props.event);
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.bookForm) {
      formElementsArray.push({
        id: key,
        config: this.state.bookForm[key],
      });
    }

    // let inputs = [];
    // if(this.state.bookForm.numberOfSeats.value > 1){
    //     for (let i = 1; i <= this.state.bookForm.numberOfSeats.value; i++) {
    //         inputs.push(

    //         )
    //       }
    // }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            elementType={formElement.config.elementType}
            key={formElement.id}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            label={formElement.config.label}
            name={formElement.id}
          />
        ))}
      </form>
    );
    return (
      <Aux>
        <h1>Number of available seats: {this.props.event.seats}</h1>
        <div className={classes.BookForm}>
          <h3 style={{ color: "black" }}>Enter Your Contact Details</h3>
          {form}
          <button
            type="button"
            onClick={this.bookHandler}
            className={classes.formButton}
            disabled={!this.state.formIsValid}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={this.cancelHandler}
            className={classes.formButton}
          >
            Cancel
          </button>
        </div>
        {this.state.booked ? (
          <div className={classes.BookForm}>
            <h2>Name of Attendee : {this.props.info.name}</h2>
            <p>Email : {this.props.info.email}</p>
            <p>Number of seats : {this.props.info.numberOfSeats}</p>
          </div>
        ) : null}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    event: state.event,
    info: state.bookDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onBooked: (bookDetails) => dispatch(actions.bookDetailsInfo(bookDetails)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventBooking);
