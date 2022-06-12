import React, { useContext } from 'react'
import { Row, Col, Avatar, Menu, Dropdown, Button } from 'antd'
import { AuthContext } from '../AuthProvider/AuthProvider'
import styles from '../../scss/header.module.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'

export default function Header() {
    const {user} = useContext(AuthContext)
  return (
    <header className={styles.header}>
        <Row justify='center'>
            <Col span={22}>
                <div className={styles.headerItem}>
                    <span className={styles.imgLogo}>
                        <img src="http://cit336.malorieaaron.com/public/images/to_do_list_logo.png" alt="Logo" />
                    </span>
                    <Dropdown
                        overlay={<Menu
                            items={[
                                {
                                    key: '1',
                                    label: (
                                        <span onClick={()=>{auth.signOut()}}>Sign Out</span>
                                    ),
                                },
                            ]}
                        />}
                        placement="bottom"
                        arrow={{
                            pointAtCenter: true,
                        }}
                        
                    >
                        
                        <Avatar style = {{cursor: "pointer"}} src={user.photoURL}/>
                    </Dropdown>
                </div>
            </Col>
        </Row>
    </header>
  )
}
