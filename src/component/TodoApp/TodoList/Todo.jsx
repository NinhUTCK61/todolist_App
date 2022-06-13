import React, { useState } from 'react'
import { Tag, Select, Input, Button, Typography} from 'antd'
import { EditTwoTone, DeleteTwoTone} from '@ant-design/icons';
import { deleteNewtodo, updateNewTodo } from './todoSlice.jsx'
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
            const objTodoPrev = {
                id: children.id, 
                title: children.title,
                content: children.content, 
                priority: children.priority,
                rank: children.rank,
                email: children.email
            };
            const todo = {
                id: children.id, 
                    title: titleValue,
                    content: contentValue, 
                    priority: valueSection,
                    rank: handleCheckPriority(valueSection),
                    email: children.email
            }
            dispatch(
                updateNewTodo({objTodoPrev,todo})
            )
            setValueSection('Hight')
            setvisible(true)
        }
    }

    const handleDeleteTodo = ()=>{
        dispatch(
            deleteNewtodo({
                id: children.id, 
                title: children.title,
                content: children.content, 
                priority: children.priority,
                rank: children.rank,
                email: children.email
            })
        )
    }

  return (
      <div className={styles.todoBox}>
        <div className={styles.settingTodo}>
            <EditTwoTone twoToneColor="orange" onClick={handleEditTodo} className={styles.iconSettingEdit}/>
            <DeleteTwoTone twoToneColor="red" onClick={handleDeleteTodo} className={styles.iconSettingDelete}/>
        </div>
        <div className={styles.tagContent}>

        </div>
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
  )
}
