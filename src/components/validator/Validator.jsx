import React, { Component } from "react";

import isEmail from "validator/lib/isEmail";
import isDate from "validator/lib/isDate";
import isHexColor from "validator/lib/isHexColor";

const options = [
  {
    value: "",
    label: "-- Select Country--",
  },
  {
    value: "Finland",
    label: "Finland",
  },
  {
    value: "Sweden",
    label: "Sweden",
  },
  {
    value: "Norway",
    label: "Norway",
  },
  {
    value: "Denmark",
    label: "Denmark",
  },
];

// mapping the options to list(array) of JSX options

const selectOptions = options.map(({ value, label }) => (
  <option value={value}>{label}</option>
));

export default class Validator extends Component {
  // declaring state
  state = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    tel: "",
    dateOfBirth: "",
    favoriteColor: "",
    weight: "",
    gender: "",
    file: "",
    bio: "",
    skills: {
      html: false,
      css: false,
      javascript: false,
    },
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      tel: false,
      dateOfBirth: false,
    },
  };

  handleChange = (e) => {
    /*
     we can get the name and value like: e.target.name, e.target.value
    Wwe can also destructure name and value from e.target
    const name = e.target.name
    const value = e.target.value
    */
    const { name, value, type, checked } = e.target;
    /*
    [variablename] we can make a value stored in a certain variable could be a key for an object, in this case a key for the state
    */

    if (type === "checkbox") {
      this.setState((prevState) => ({
        skills: { ...prevState.skills, [name]: checked },
      }));
    } else if (type === "file") {
      this.setState({ [name]: e.target.files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleBlur = (e) => {
    const { name } = e.target;
    this.setState((prevState) => ({
      touched: { ...prevState.touched, [name]: true },
    }));
  };

  validate = () => {
    // Object to collect error feedback and to display on the form
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      dateOfBirth: "",
      favoriteColor: "",
    };

    const {
      firstName,
      lastName,
      email,
      tel,
      dateOfBirth,
      favoriteColor,
      touched: {
        firstName: firstNameIsTouched,
        lastName: lastNameIsTouched,
        email: emailIsTouched,
        tel: telIsTouched,
        dateOfBirth: dateOfBirthIsTouched,
        favoriteColor: favoriteColorIsTouched,
      },
    } = this.state;

    if (
      (firstNameIsTouched && firstName.length < 3) ||
      (firstNameIsTouched && firstName.length > 12)
    ) {
      errors.firstName = "First name must be between 2 and 12";
    }

    // LastName must be Capitalized
    if (
      lastNameIsTouched &&
      (lastName.charCodeAt(0) < 65 || lastName.charCodeAt(0) > 90)
    ) {
      errors.lastName = "Last name must be capitalized";
    }

    // Email should be a valid email. allowed list be yahoo,gmail,icloud
    if (emailIsTouched && !isEmail(email)) {
      errors.email = "Email is not valid";
    }

    // Tel should be a valid number from France or China
    if (telIsTouched && !tel.match(/\+\d{2}\s?\d{9,11}/g)) {
      errors.tel = "Tel should be a valid number from France and china";
    }

    // dateOfBirth should be in a given format
    if (dateOfBirthIsTouched && !isDate(dateOfBirth)) {
      errors.dateOfBirth = "dateOfBirth is not valid";
    }

    // Color should be HexColor
    if (favoriteColorIsTouched && !isHexColor(favoriteColor)) {
      errors.favoriteColor = "favoriteColor should be HexColor";
    }

    return errors;
  };

  handleSubmit = (e) => {
    /*
      e.preventDefault()
      stops the default behavior of form element 
      specifically refreshing of page
      */
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      country,
      gender,
      tel,
      dateOfBirth,
      favoriteColor,
      weight,
      bio,
      file,
      skills,
    } = this.state;

    const formattedSkills = Object.entries(skills).map(([key, value]) => {
      if (value) {
        return key.toUpperCase();
      }
      return "";
    });
    const data = {
      firstName,
      lastName,
      email,
      country,
      gender,
      tel,
      dateOfBirth,
      favoriteColor,
      weight,
      bio,
      file,
      skills: formattedSkills,
    };
    /*
     the is the place where we connect backend api
      to send the data to the database
      */
    console.log(data);
  };

  render() {
    // accessing the state value by destrutcturing the state
    // the noValidate attribute on the form is to stop the HTML5 built-in validation

    const {
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      tel: telError,
      dateOfBirth: dateOfBirthError,
      favoriteColor: favoriteColorError,
    } = this.validate();
    const {
      firstName,
      lastName,
      email,
      gender,
      tel,
      dateOfBirth,
      favoriteColor,
      weight,
      bio,
    } = this.state;
    return (
      <div className="App">
        <h3>Add Student</h3>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="row">
            <div className="form-group">
              <label htmlFor="firstName">First Name </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="First Name"
              />
              <br />
              <small>{firstNameError}</small>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Last Name"
              />
              <br />
              <small>{lastNameError}</small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Email"
              />
              <small>{emailError}</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tel">Telephone </label>
            <input
              type="tel"
              name="tel"
              value={tel}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="Tel: +33 **********"
            />
            <small>{telError}</small>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of birth </label>
            <input
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="Date of Birth"
            />
            <small>{dateOfBirthError}</small>
          </div>
          <div className="form-group">
            <label htmlFor="favoriteColor">Favorite Color</label>
            <input
              type="color"
              id="favoriteColor"
              name="favoriteColor"
              value={favoriteColor}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              placeholder="Favorite Color"
            />
            <small>{favoriteColorError}</small>
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weight}
              onChange={this.handleChange}
              placeholder="Weight in Kg"
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <br />
            <select name="country" onChange={this.handleChange} id="country">
              {selectOptions}
            </select>
          </div>

          <div>
            <p>Gender</p>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={this.handleChange}
                checked={gender === "Female"}
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input
                id="male"
                type="radio"
                name="gender"
                value="Male"
                onChange={this.handleChange}
                checked={gender === "Male"}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                id="other"
                type="radio"
                name="gender"
                value="Other"
                onChange={this.handleChange}
                checked={gender === "Other"}
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          <div>
            <p>Select your skills</p>
            <div>
              <input
                type="checkbox"
                id="html"
                name="html"
                onChange={this.handleChange}
              />
              <label htmlFor="html">HTML</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="css"
                name="css"
                onChange={this.handleChange}
              />
              <label htmlFor="css">CSS</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="javascript"
                name="javascript"
                onChange={this.handleChange}
              />
              <label htmlFor="javascript">JavaScript</label>
            </div>
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <br />
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={this.handleChange}
              cols="120"
              rows="10"
              placeholder="Write about yourself ..."
            />
          </div>

          <div>
            <input type="file" name="file" onChange={this.handleChange} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
