const phoneReducerInitialState = {
  phoneNumber: "",
  operator: "",
  error: "",
  price: "",
};

export const actionPhoneReducer = {
  updatePhoneNumber: "UPDATE_PHONE_NUMBER",
  updateError: "UPDATE_ERROR",
  updateOperator: "UPDATE_OPERATOR",
  updatePrice: "UPDATE_PRICE",
  setError: "SET_ERROR",
};

export function phoneReducer(state = phoneReducerInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionPhoneReducer.updatePhoneNumber:
      return { ...state, phoneNumber: payload.value };
    case actionPhoneReducer.updateError:
      const newerror =
        state.phoneNumber.slice(0, 2) !== "09"
          ? "شماره موبایل باید با 09 شروع شود"
          : state.phoneNumber.length < 11
          ? "فرمت شماره اشتباه است"
          : "";
      return { ...state, error: newerror };

    case actionPhoneReducer.setError:
      return { ...state, error: payload.error };

    case actionPhoneReducer.updateOperator:
      const newPrice = payload.value ? state.price : "";
      return {
        ...state,
        operator: payload.value,
        price: newPrice,
      };
    case actionPhoneReducer.updatePrice:
      return { ...state, price: payload.value };
    default:
      return state;
  }
}
