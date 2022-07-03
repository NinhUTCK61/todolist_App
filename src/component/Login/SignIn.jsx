import { Button, Row, Col, Form, Input, notification } from 'antd'
import { signInWithEmailAndPassword,} from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase/firebaseConfig'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from "../../scss/login.module.scss"
import { Outlet, useNavigate } from 'react-router-dom'

export default function SignIn() {
 
    const [valueEmail, setValueEmail] = useState('');
    const [valuePass, setValuePass] = useState('')

    const navigate = useNavigate();
    
    const handleNavigateRegisterPage = (e)=>{
        e.preventDefault();
        navigate('/signup', {replace:true})
        return
    }
   

    const handleLoginAccountCreated = ()=>{
        signInWithEmailAndPassword(auth, valueEmail, valuePass)
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log(user)
            notification["success"]({
                message:"Logged in successfully",
                duration: 1.5,
                top: "50px"
            })
        })
        .catch((error)=>{
            const textNotify = (error.code).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi , ' ').replace("auth", '').trim()
            notification['error']({
                message: `${textNotify.charAt(0).toUpperCase() + textNotify.slice(1)}`,
                duration: 1.5,
                top: "50px"
            })
        })
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
                            <Input onChange={(e)=>setValueEmail(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={(e)=>setValuePass(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" 
                            htmlType="submit" 
                            className="login-form-button" 
                            style={{width:"100%"}}
                            onClick={handleLoginAccountCreated}
                            >
                                Log in
                            </Button>
                            <div style={{marginTop: "4px"}}>
                                Or <a href='' onClick={(e)=>handleNavigateRegisterPage(e)}>register now!</a>
                            </div>
                        </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Outlet/>
        </div>

    )
}