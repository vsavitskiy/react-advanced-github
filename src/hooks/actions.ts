import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {githubSlice} from "../store/github/github.slice";

const actions = {
  ...githubSlice.actions,
}

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
}