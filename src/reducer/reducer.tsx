interface ContactData {
    firstName: string;
    phone: string;
    status: string;
  }
  
  interface Action {
    type: string;
    payload: any; 
  }
  
  interface State {
    addInputData: { id: string; data: ContactData }[];
  }
  
  const initialData: State = {
    addInputData: [],
  };
  
  const reducer = (state: State = initialData, action: Action): State => {
    switch (action.type) {

      case "ADD_CONTACT":
        const { id, data } = action.payload;
        return {
          ...state,
          addInputData: [
            ...state.addInputData,
            {
              id: id,
              data: data,
            },
          ],
        };
  
      case "EDIT_CONTACT":
        const editedData = state.addInputData.map((item) =>
          item.id === action.payload.id ? { ...item, data: action.payload.newData } : item
        );
        return {
          ...state,
          addInputData: editedData,
        };
  
      case "DELETE_CONTACT":
        const updateData = state.addInputData.filter((elem) => elem.id !== action.payload.id);
        return {
          ...state,
          addInputData: updateData,
        };
  
      default:
        return state;
    }
  };
  
  export type { State as YourReducerState };
  export {reducer}
  export type { Action};

  export default reducer;

  
  