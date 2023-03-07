import axios from "axios";
import * as actions from "store/actions/api";

// prettier-ignore
const api =({ dispatch }: any) =>(next: any) => async (action: any) => {
    if (action.type !== actions.apiCallBegin.type) return next(action);

    const { url, method, data, onStart,onSuccess, onError } = action.payload;

    if(onStart) dispatch({type:onStart});

    next(action);

    try {
      const response = await axios.request({
        baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
        url,
        method,
        data,
      });
      //General
      dispatch(actions.apiCallSuccess(response.data));
      //Specific
      if(onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error: any) {
      //General
      dispatch(actions.apiCallFailed(error.message));
      //Specific
      if(onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
