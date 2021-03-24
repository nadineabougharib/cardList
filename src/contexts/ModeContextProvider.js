import React, { Component, createContext } from "react";

export const ModeContext = createContext();

class ModeContextProvider extends Component {
  state = {
    mode: "",
  };
  submitMode = (value) => {
    this.setState({
      mode: value,
    });
  };
  render() {
    return (
      <ModeContext.Provider
        value={{
          mode: this.state.mode,
          submitMode: this.submitMode,
        }}
      >
        {this.props.children}
      </ModeContext.Provider>
    );
  }
}

export default ModeContextProvider;
