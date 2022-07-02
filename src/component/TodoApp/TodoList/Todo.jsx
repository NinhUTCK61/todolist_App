import React, { useState } from 'react'
import { Tag, Select, Input, Button, Typography, Checkbox, Divider} from 'antd'
import { EditTwoTone, DeleteTwoTone, CheckCircleTwoTone} from '@ant-design/icons';
import { completedTodo, deleteTodo, updateTodo } from './todoSlice.jsx'
import { useDispatch } from 'react-redux';
import  handleCheckPriority  from './checkPriority.js';
import styles from '../../../scss/tagTodo.module.scss'

const {Option} = Select
const priorityMapColor = {
  Hight: 'red',
  Medium: 'purple',
  Low: 'cyan'
}
export default function Todo(children) {
   
    const [titleValue, setTitle] = useState(`${children.title}`);
    const [contentValue, setContent] = useState(`${children.content}`);
    const [valueSection, setValueSection] = useState(`${children.priority}`);
    const [visible, setvisible] = useState(true);
    const [isCompletedTodo, setIsCompletedTodo] = useState(false)

    const handlePriorityChange =(e)=>{
        setValueSection(e)
    }

    const handleTitleChange = (e)=>{
        setTitle(e.target.value)
    }

    const handleContentChange = (e)=>{
        setContent(e.target.value)
    }

    const handleEditTodo = ()=>{
        setvisible(false)
    }

    const dispatch = useDispatch();
    
    const handleUpdateTodo = ()=>{
        if((titleValue === '' || contentValue === '')) return
        else{
            const todo = {
                id: children.id, 
                uid: children.uid,
                title: titleValue.trim(),
                content: contentValue.trim(), 
                priority: valueSection,
                rank: handleCheckPriority(valueSection),
            }
            dispatch(
                updateTodo({...todo})
            )
            setValueSection('Hight')
            setvisible(true)
        }
    }

    const handleDeleteTodo = ()=>{
        dispatch(
            deleteTodo({
                id: children.id,
                uid: children.uid, 
                title: children.title,
                content: children.content, 
                priority: children.priority,
                rank: children.rank,
                email: children.email
            })
        )
    } 
     
    const onChange = (e) => {
        dispatch(
            completedTodo({
                id: children.id,
                uid: children.uid, 
                completed: e.target.checked
            })
        )
    };
  return (
    <div className={styles.todoBox}>
        <div className={styles.settingTodo}>
            <div>
                {
                    children.completed?(<Typography.Text type='success'>Completed!</Typography.Text>):(null)
                }
            </div>
            <div>
                <EditTwoTone twoToneColor="orange" onClick={handleEditTodo} className={styles.iconSettingEdit}/>
                <DeleteTwoTone twoToneColor="red" onClick={handleDeleteTodo} className={styles.iconSettingDelete}/>
                <Checkbox checked={children.completed} onChange={onChange}></Checkbox>
            </div>
        </div>
        <Divider style={{margin: "0px"}}/>
        <div className={styles.tagContent} style={{background:children.completed?("#95e207"):("#fff")}}>
            <div className={styles.tagInput}>
                {
                    (visible) ? (
                        <Typography.Text mark
                            size={4}
                            style={{fontSize: '18px'}}
                            color="#2db7f5"
                        >
                            {children.title.toUpperCase().trim()}
                        </Typography.Text>
                    ):(
                        <Input  
                            bordered={!visible}
                            allowClear={!visible} 
                            value={titleValue}
                            onChange={e=>handleTitleChange(e)}
                            autoFocus={true}
                            size={32}
                        />
                    )
                }
            </div>
            <div className={styles.tagInput}>
                {(visible)?(
                    <pre style={{paddingLeft:'2px'}}>{`${children.content.trim()}`}</pre>
                ):
                (
                    <Input.TextArea
                        style={{background: '#fff', color: "#000", cursor:"context-menu", fontSize:'15px'}}
                        disabled={visible} 
                        bordered={!visible}
                        allowClear={!visible} 
                        value={contentValue} 
                        onChange={e=>handleContentChange(e)}
                        autoSize={!visible}
                    />
                    
                )}
            </div>
            {   
                (visible)
                ?
                (<Tag color={priorityMapColor[children.priority]}>{children.priority}</Tag>)
                :
                (<Select 
                        className={styles.tagPriority}
                        value={valueSection}
                        onChange={(e)=>handlePriorityChange(e)}
                        placeholder="Choose priority"
                        disabled={visible}
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
                </Select>)
            }
            {
                !visible &&(
                    <div style={{paddingTop: '8px', textAlign: "end"}}>
                        <span style={{paddingRight:'4px'}}>
                            <Button onClick={()=>setvisible(true)} >Cancel</Button>
                        </span>
                        <Button onClick={handleUpdateTodo}>Update</Button>
                    </div>
                )
            }
        </div>
    </div>
  )
}
