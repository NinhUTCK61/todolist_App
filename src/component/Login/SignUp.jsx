import { Button, Row, Col, Form, Input, notification } from 'antd'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import React from 'react'
import { auth, db} from '../../firebase/firebaseConfig'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from "../../scss/login.module.scss"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react';
import AuthProvider from '../AuthProvider/AuthProvider';
import { addDoc, collection } from 'firebase/firestore';

export default function SignUp() {
    
    const [valueEmail, setvalueEmail] = useState('');
    const [valuePassword, setvaluePassword] = useState('')
    const onFinish = (values) => {
        
    };

    const navigate = useNavigate()
    const handleNavigateSignInPage = (e)=>{
        e.preventDefault();
        navigate("/login")
    } 
    
    const handleRegisterAccount = async()=>{
        try {
            if(valueEmail.trim() !== "")
            {
                const {user} = await createUserWithEmailAndPassword(auth, valueEmail, valuePassword)
                notification["success"]({
                    message: "Successful registration",
                    duration: 1.5,
                    top: "50px"
                })
                
                await addDoc(collection(db, "users"), {
                    displayName: user.email,
                    email: user.email,
                    uid: user.uid,
                })
            }
        } catch (error) {
            console.log(error.code)
            const textNotify = (error.code).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi , ' ').replace("auth", '').trim()
            
            notification['error']({
                message: `${textNotify.charAt(0).toUpperCase() + textNotify.slice(1)}`,
                duration: 1.5,
                top: "50px"
            })
        }
    }
  return (
        <div className={styles.loginBackGd}>
            <Row justify='center' style={{height: "100vh"}} align="middle">
                <Col span={6}>
                    <div className={styles.loginContainer}>
                        <span className={styles.imgLogo}>
                            <img src="http://cit336.malorieaaron.com/public/images/to_do_list_logo.png" alt="Logo" />
                        </span>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                                ]}
                            >
                                <Input onChange={(e)=>setvalueEmail(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                hasFeedback
                                rules={[
                                { required: true, message: 'Please input your Password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (value.length >= 6) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password length must be more than 6!'));
                                    },
                                })
                                ]}
                            >
                                <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={(e)=>setvaluePassword(e.target.value)}
                                />
                            </Form.Item>
                             
                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                                ]}
                            >
                                <Input.Password placeholder='Confirm your password!'/>
                            </Form.Item>
                            
                            <Form.Item>
                                <Button type="primary" 
                                    htmlType="submit" 
                                    className="login-form-button" 
                                    style={{width:"100%"}}
                                    onClick={handleRegisterAccount}
                                >
                                Register
                                </Button>
                                <div style={{marginTop: "4px"}}>
                                Do you already have an account? <a onClick={(e)=>handleNavigateSignInPage(e)}>Sign in now!</a>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>

        
    )
}