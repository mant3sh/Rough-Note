import axios from "axios";
import { useEffect, useReducer } from "react";
const initialState = {
  data: [],
  loading: false,
  error: null,
};
const Actions = {
  FETCH_API: "fecth-api",
  SET_DATA: "set-data",
  SET_ERROR: "set-error",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.FETCH_API:
      return { ...state, loading: true };
    case Actions.SET_DATA:
      return { ...state, loading: false, data: payload.data };
    case Actions.SET_ERROR:
      return { ...state, error: payload.data };
  }
}

export default function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: Actions.FETCH_API });
    axios
      .get(url)
      .then((res) => {
        dispatch({ type: Actions.SET_DATA, payload: res.json().data });
      })
      .catch((e) => {
        dispatch({ type: Actions.SET_ERROR, payload: e.message });
      });
  }, [url]);

  return state;
}
