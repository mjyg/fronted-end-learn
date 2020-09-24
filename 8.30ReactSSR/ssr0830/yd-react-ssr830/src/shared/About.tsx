import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface IProps {
  data: string;
  dispatch: Dispatch;
}

class About extends React.Component<IProps> {
  static loadData = (store) => {
    return new Promise((resolve) => {
      axios.get("http://localhost:3000/getData").then((response) => {
        store.dispatch({
          type: "CHANGE_DATA",
          payload: {
            data: response.data.data,
          },
        });
        resolve(response.data.data);
      });
    });
  };

  componentDidMount() {
    if (!this.props.data) {
      axios.get("http://localhost:3000/getData").then((response) => {
        this.props.dispatch({
          type: "CHANGE_DATA",
          payload: {
            data: response.data.data,
          },
        });
      });
    }
  }

  render() {
    return <div>{this.props.data}</div>;
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
