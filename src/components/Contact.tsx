import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, editContact, deleteContact } from '../action/action';

interface ContactFormData {
  firstName: string;
  phone: string;
  status: string;
}

const Contact : React.FC = ()=> {
  const [openadd, setOpenadd] = useState(true);
  const [formdata, setFormdata] = useState<ContactFormData>({
    firstName: '',
    phone: '',
    status: 'Active',
  });
  const [editId, setEditId] = useState<number | null>(null);

  const add = useSelector((state: any) => state.reducer.addInputData);

  console.log(add,"check")

  const dispatch = useDispatch();

  const handleonclick = () => {
    setOpenadd(false);
  };

  let name: string, value: string;

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    name = e.target.name;
    value = e.target.value;

    setFormdata({ ...formdata, [name]: value });
  };

  const handleEdit = (id: number) => {
    const contactToEdit = add.find((contact: any) => contact.id === id);
    if (contactToEdit) {
      setFormdata({
        firstName: contactToEdit.data.firstName || '',
        phone: contactToEdit.data.phone || '',
        status: contactToEdit.data.status || 'Active',
      });
      setEditId(id);
    }
  };

  const handleEditSubmit = () => {
    if (formdata.firstName && formdata.phone && formdata.status) {
      const editedContact = {
        firstName: formdata.firstName,
        phone: formdata.phone,
        status: formdata.status,
      };
      if(editId!==null){ 
        dispatch(editContact(editId.toString(), editedContact));
      }
     
      setFormdata({
        firstName: '',
        phone: '',
        status: 'Active',
      });
      setEditId(null);
    }
  };

  const handleAddSubmit = () => {
    if (formdata.firstName && formdata.phone && formdata.status) {
      dispatch(addContact(formdata));
      setFormdata({
        firstName: '',
        phone: '',
        status: 'Active',
      });
    }
  };

  document.title = 'Your Contacts';

  return (
    <div className='mt-20 3xl:mt-14 2xl:mt-10 lg:mt-10 md:mt-4'>
     <div className='font-[Roboto] text-6xl 3xl:text-4xl lg:text-3xl xs:text-2xl  text-white font-semibold flex justify-center items-center xs:gap-2 gap-3'>Your
        <span className='font-[Roboto] mt-1 text-6xl 3xl:text-4xl xs:text-2xl lg:text-3xl  text-[#00C66C] font-semibold'>
          Contacts
        </span>
      </div>

      <div className=' flex justify-center items-center p-3 mt-14 3xl:mt-8 2xl:mt-4  xs:mt-2'>

        {openadd ? (

          <div className='flex text-4xl 3xl:text-2xl 2xl:text-xl lg:text-lg xs:text-xl 3xl:p-2 lg:p-1  animate-bounce font-[Roboto] border-2 bg-[#00C66C] text-[#0F1730] font-semibold border-solid justify-center items-center border-[#00C66C] p-3 rounded-lg cursor-pointer' onClick={handleonclick}>
            Add Contact
          </div>
        ) : (
          <form className='flex flex-col p-4 justify-center items-center border-2 border-white rounded-2xl'>
            <div className='flex xs:flex-col'>
              <div className='font-[Roboto]  p-3 3xl:p-2 text-4xl 3xl:text-2xl 2xl:text-xl lg:text-base md:text-sm   text-[#00C66C]' >Name :
                <input type='text' placeholder='enter your name' value={formdata.firstName} name='firstName' autoComplete='off' className='border-2 rounded-xl 3xl:rounded-lg ml-4 lg:ml-4 border-solid border-white bg-[#0F1730] text-3xl 3xl:text-xl 2xl:text-base  lg:text-sm md:text-xs  text-[white] 2xl:p-1 p-2' onChange={handleInputs} />
              </div>
              <div className='font-[Roboto]  p-3 3xl:p-2  text-4xl 3xl:text-2xl 2xl:text-xl lg:text-base md:text-sm text-[#00C66C]'>Phone :
                <input type='text' placeholder='enter your no.' value={formdata.phone} name='phone' autoComplete='off' className='border-2 rounded-xl 3xl:rounded-lg ml-3 border-solid border-white bg-[#0F1730] text-3xl 3xl:text-xl 2xl:text-base  lg:text-sm md:text-xs  text-[white] 2xl:p-1 p-2' onChange={handleInputs} />
              </div>
            </div>
            <div className='flex items-center mt-6 3xl:mt-2 2xl:mt-1 p-2'>
              <h1 className='font-[Roboto]  text-4xl 3xl:text-2xl 2xl:text-xl lg:text-base md:text-sm text-[#00C66C]'>Status :</h1>
              <div className='flex flex-col ml-10 2xl:ml-5 text-sm gap-4  3xl:gap-2 2xl:gap-1'>
                <div className='flex'>
                  <input type='radio' name='status' value="Active" checked={formdata.status === 'Active'} onChange={handleInputs} />
                  <h1 className='font-[Roboto]   font-semibold text-3xl 3xl:text-xl 2xl:text-base lg:text-sm md:text-xs pl-3 text-[#00C66C]'>Active</h1>
                </div>
                <div className='flex'>
                  <input type='radio' name='status' value="Inactive" checked={formdata.status === 'Inactive'} onChange={handleInputs} />
                  <h1 className='font-[Roboto] font-semibold text-3xl 3xl:text-xl 2xl:text-base  lg:text-sm md:text-xs pl-3 text-red-600'>Inactive</h1>
                </div>
              </div>
            </div>
            <div className='flex gap-6 3xl:gap-4 mt-6 3xl:mt-2'>
              {editId !== null ? (
                <div className='flex p-2 3xl:p-1 px-24 3xl:px-16  2xl:px-14 lg:px-12 bg-[#00c66c] justify-center items-center rounded-xl cursor-pointer' onClick={handleEditSubmit}>
                  <img src='edit1.png' className='w-10 3xl:w-8 2xl:w-6 lg:w-4' />
                </div>
              ) : (
                <div className='flex p-2 3xl:p-1 px-24 3xl:px-16  2xl:px-14 lg:px-12 bg-[#00c66c] justify-center items-center rounded-xl cursor-pointer' onClick={handleAddSubmit}>
                  <img src='social.png' className='w-10 3xl:w-8 2xl:w-6 lg:w-4' />
                </div>
              )}
              <div className='flex p-2 3xl:p-1 px-24 3xl:px-16 2xl:px-14  lg:px-12 bg-[#00c66c] justify-center items-center rounded-xl cursor-pointer' onClick={() => { setOpenadd(true) }}>
                <img src='close.png' className='w-10 3xl:w-8 2xl:w-6  lg:w-4' />
              </div>
            </div>
          </form>
        )}
      </div>

      <div className='flex flex-wrap mt-20 2xl:mt-12 gap-14 2xl:gap-10 lg:gap-7 justify-center'>
        {add.map((elem : any) => {
          return (
            <div className={`flex flex-col border-2 w-fit p-5 3xl:p-3 2xl:p-2 border-black border-solid ${elem.data?.status === 'Active' ? 'border-green-500' : 'border-red-500'}`} key={elem.id}>
              <div className='text-xl 3xl:text-base 2xl:text-xs lg:text-[10px]  font-semibold text-white '><span className={`absolute -mt-11 ml-48 3xl:ml-32 2xl:ml-40 3xl:-mt-10 2xl:-mt-6 lg:-mt-6 lg:ml-40 border-2 border-solid p-1 px-4 lg:px-2 rounded-3xl ${elem.data?.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>{elem.data?.status || "NA"}</span></div>
              <div className={`text-2xl 3xl:text-base 2xl:text-sm font-semibold ${elem.data?.status === 'Active' ? 'text-[#00c66c]' : 'text-red-500'}`}>Name :
                <span className=' text-white'> {elem.data?.firstName || "NA"}</span>
              </div>
              <div className={`text-2xl 3xl:text-base 2xl:text-sm font-semibold ${elem.data?.status === 'Active' ? 'text-[#00c66c]' : 'text-red-500'}`}>Phone :
                <span className=' text-white'> {elem.data?.phone || "NA"}</span>
              </div>
              <div className='flex mt-6 3xl:mt-4 gap-4'>
                <div className='flex border-2 border-solid border-white p-2 px-10 3xl:px-8 justify-center items-center rounded-xl cursor-pointer' onClick={() => handleEdit(elem.id)}>
                  <img src='edit.png' className='w-8 3xl:w-5 2xl:w-6 lg:w-4' />
                </div>
                <div className='flex border-2 border-solid border-white p-2 px-10 3xl:px-8 justify-center items-center rounded-xl cursor-pointer' onClick={() => dispatch(deleteContact(elem.id))} >
                  <img src='delete.png' className='w-8 3xl:w-5 2xl:w-6 lg:w-4' />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Contact;
