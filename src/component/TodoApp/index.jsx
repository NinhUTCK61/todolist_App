import React, { useContext, useState } from 'react'
import { Input, Select, Tag, Button, Typography, Row, Col, Layout} from 'antd'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addNewTodo } from './TodoList/todoSlice.jsx'
import Todo from './TodoList/Todo.jsx';
import {v4 as uuid} from'uuid'
import  handleCheckPriority  from './TodoList/checkPriority.js';
import styles from "../../scss/modalTodo.module.scss"
import clsx from 'clsx';
import {AuthContext} from "../AuthProvider/AuthProvider.jsx"

const {Option} = Select;
export default function TodoList() {
    const {user} = useContext(AuthContext)
    const [titleValue, setTitle] = useState('');
    const [contentValue, setContent] = useState('');
    const [valueSection, setValueSection] = useState('Hight')
    
    const {todoList} = useSelector(state=>state);
    const dispatch = useDispatch();
    
    const handleAddTodo = async()=>{
        if(titleValue === '' || contentValue === ''){
            return
        }else
        {   
            const data = {
                id: uuid(),
                title: titleValue,
                content: contentValue, 
                priority: valueSection,
                rank: handleCheckPriority(valueSection),
                email: user.email
            }
            dispatch(
                addNewTodo({...data})
            )
            setTitle('');
            setContent('');
            setValueSection('Hight')
        }
    }
   
    const handlePriorityChange =(e)=>{
        setValueSection(e)
    }

    const handleTitleChange = (e)=>{
        setTitle(e.target.value)
    }

    const handleContentChange = (e)=>{
        setContent(e.target.value)
    }

  return (
    <> 
        <div className={styles.container}>
            <Row 
                gutter={16}
                justify="space-around"
            >
                <Col span={18}>
                    <div>
                        <Row gutter={[16, 16]}>
                            {
                                (todoList.todos).map((todo, index)=>(
                                    
                                    <Col span={8} key={index}>
                                            <Todo
                                                key={index}
                                                id = {todo.id}
                                                title = {todo.title} 
                                                content = {todo.content}
                                                priority = {todo.priority}
                                                rank = {todo.rank}
                                                email = {user.email}
                                            />
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                </Col>

                <Col span={6}>
                    <div className={styles.formContainer}>
                        <Typography.Title level={3} className={styles.formHeading}>What's the Plan for Today?</Typography.Title>
                        <div className={styles.formInput}>
                            <Input  
                                value={titleValue} 
                                allowClear={true} 
                                placeholder='enter the intended title' 
                                onChange={e=>handleTitleChange(e)}
                            />
                        </div>
                        <div className={styles.formInput}>
                            <Input.TextArea   
                                value={contentValue} 
                                allowClear={true} 
                                placeholder='enter what you intend to do' 
                                onChange={e=>handleContentChange(e)}
                                autoSize={
                                    {
                                        minRows: 4,
                                        maxRows: 6
                                    }
                                }
                            />
                        </div>
                        <div className={clsx(styles.formInput)}>
                            <Select
                                className={styles.formPriority}
                                defaultValue={"Hight"} 
                                value={valueSection}
                                onChange={(e)=>handlePriorityChange(e)}
                                placeholder="Choose priority"
                            >
                                <Option value={'Hight'} label='Hight'>
                                    <Tag color={'red'}>Hight</Tag>
                                </Option>
                                <Option value={'Medium'} label='Medium'>
                                    <Tag color={'purple'}>Medium</Tag>
                                </Option>
                                <Option value={'Low'} label='Low'>
                                    <Tag color={'cyan'}>Low</Tag>
                                </Option>
                            </Select>
                        </div>
                        <div className={styles.btnAdd}>
                            <Button onClick={handleAddTodo}>Add</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </>
  )
}

