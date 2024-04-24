import React from "react";

import Button from "./Button.js";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: ["", "", "", "", ""],
      name: "",
    };
  }

  updateField = (field, event) => {
    event.persist();
    this.setState((prevState) => {
      const newState = prevState;
      const value = event.target.value;
      if (field === "name") {
        newState.name = value;
      } else {
        newState.fields[field] = value;
      }
      return newState;
    });
  };

  submitEmail = (event) => {
    event.preventDefault();
    if (typeof window !== undefined) {
      const fields = this.state.fields;
      const body = `${fields[0]},\n\n${fields[1]}.\n${fields[2]}.\n${fields[3]}.
        \n${fields[4]}\n${this.state.name}`;
      const bodyURI = encodeURIComponent(body);
      const mail = `mailto:${this.props.data.mailTo}?subject=ToDontForm%20-%20${fields[1]}&body=${bodyURI}`;
      window.location.href = mail;
      this.setState((prevState) => {
        const newState = prevState;
        newState.isSubmitted = true;
        return newState;
      });
    }
  };

  render() {
    let form = this.props.data;
    return (
      <div id="mail" className="layout__form-container">
        <form className="layout__form">
          <Button
            className="btn"
            type="point"
            text={form.title}
            link="form__field-container"
          />
          <div className="form__fields-container">
            {form.fields.map((field, key) => (
              <div key={key} className="form__field-container">
                <input
                  className="form__field"
                  type="text"
                  value={this.state.fields[key]}
                  placeholder={field.text}
                  data-placeholder-shown={this.state.fields[key] === ""}
                  onChange={this.updateField.bind(this, key)}
                  autoComplete="off"
                />
                <label htmlFor={"field #{key}"} className="form__label">
                  {field.text}
                </label>
              </div>
            ))}
            <div className="form__submit-container">
              <Button
                type="large"
                text={
                  this.state.isSubmitted ? form.submitResponse : form.submit
                }
                handler={this.submitEmail}
              />
              {this.state.isSubmitted && (
                <p className="form__submit-text">
                  {form.submitExpandedResponse}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
