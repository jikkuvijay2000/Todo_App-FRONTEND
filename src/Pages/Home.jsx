import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { BASE_URL } from '../services/baseurl';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { getUserID } from '../Hooks/getUserID';
import { useCookies } from 'react-cookie';

function Home() {
  const [text, setText] = useState('');
  const [allTodo, setAllTodo] = useState([]);
  const userID = getUserID();
  const [cookies] = useCookies(['access_token']);
  const [editID, setEditID] = useState(null);
  const [editText, setEditText] = useState('');

  const updateTODO = async (id, updatedText) => {
    try {
      const response = await axios.put(`${BASE_URL}/todo/updatetodo/${id}`, { userInput: updatedText }, { headers: { authorization: cookies.access_token } });
      toast.success("TODO updated");
      setAllTodo(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, userInput: updatedText } : todo));
      setEditID(null);
      setEditText('');
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  }

  const deleteTODO = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todo/deletetodo/${id}`, { headers: { authorization: cookies.access_token } });
      toast.success("TODO deleted");
      setAllTodo(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  }

  const handleTodoAdd = async (e) => {
    e.preventDefault();
    if (!text) {
      toast.error("Please Enter your TODO");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/todo/addtodo`, {
        userInput: text,
        userOwner: userID
      }, { headers: { authorization: cookies.access_token } });
      toast.success("Your TODO added! Heads up and focus✨");
      setText('');
      setAllTodo(prevTodos => [...prevTodos, response.data]);
    } catch (err) {
      toast.error("Sorry! We had some trouble, Can you please try again?");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/todo/gettodo`, {
          headers: { authorization: cookies.access_token },
          params: { userID: userID }
        });
        setAllTodo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodo();
  }, [userID, cookies.access_token]);

  return (
    <div>
      <div className='container'>
        <div className='d-flex'>
          <Form className='mx-auto mt-5' onSubmit={handleTodoAdd}>
            <input
              className='todoinput'
              type='text'
              placeholder='Type here...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className='formbutton' type='submit'>Add</button>
          </Form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className='mt-5'>
          {allTodo.map((todo) => (
            <div key={todo._id} className='buttongroup container bg-dark p-3 mt-2 w-75 d-flex'>
              {editID === todo._id ? (
                <input
                  type='text'
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <p className='text-light p-2 mt-2'>{todo.userInput}</p>
              )}
              <div className='ms-auto p-2 mt-1'>
                {editID === todo._id ? (
                  <button className='formoutput' type='button' onClick={() => updateTODO(todo._id, editText)}>
                    <i className="fa-solid fa-check text-light"></i>
                  </button>
                ) : (
                  <>
                    <button className='formoutput' type='button' onClick={() => { setEditID(todo._id); setEditText(todo.userInput); }}>
                      <i className="fa-solid fa-pen text-light"></i>
                    </button>
                    <button className='formoutput ms-auto' type='button' onClick={() => deleteTODO(todo._id)}>
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
