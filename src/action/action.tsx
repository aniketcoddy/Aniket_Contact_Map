interface ContactData {
    firstName: string;
    phone: string;
    status: string;
  }
  
  export const ADD_CONTACT = 'ADD_CONTACT';
  export const EDIT_CONTACT = 'EDIT_CONTACT';
  export const DELETE_CONTACT = 'DELETE_CONTACT';
  
  export const addContact = (data: ContactData) => {
    return {
      type: ADD_CONTACT,
      payload: {
        id: new Date().getTime().toString(),
        data: data,
      },
    };
  };
  
  export const editContact = (id: string, newData: ContactData) => {
    return {
      type: EDIT_CONTACT,
      payload: {
        id: id,
        newData: newData,
      },
    };
  };
  
  export const deleteContact = (id: string) => {
    return {
      type: DELETE_CONTACT,
      id: id,
    };
  };
  