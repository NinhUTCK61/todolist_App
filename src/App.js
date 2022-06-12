import './App.css';
import React, { useContext, useEffect } from 'react'
import TodoList from './component/TodoApp/index.jsx';
import BackGroundTodo from './component/backgroundAnimation/BackGroundTodo.js'
import { Col, Row } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import { useDispatch } from 'react-redux';
import { AuthContext } from './component/AuthProvider/AuthProvider';
import { fetchData } from './component/TodoApp/TodoList/todoSlice';
import Header from './component/Header/Header';
import SignUp from './component/Login/SignUp';
export default function App() {
  const {user} = useContext(AuthContext)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchData(user))
  },[user.email])
  return (
    <>
                      
      <Routes>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/" element={
          <>
            <Header/>
            <BackGroundTodo/> 
            <Row justify='center'>
              <Col span={20}>
                <TodoList/>
              </Col>
            </Row>
          </>
        }/>
      </Routes>
    </>
  )
}
