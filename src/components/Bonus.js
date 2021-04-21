import React, { useState, useEffect } from 'react'
import { Col, Row, Button } from "react-bootstrap"
import db from '../resources/firebase.config'

const Bonus = () => {
    const [bonus, setBonus] = useState([])

    const getBonus = async() => {
        db.collection("daftarBonus").onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setBonus(docs)
        })
    }

    useEffect(() => {
        getBonus()
    }, [])

    const onDeleteBonus = async(id) => {
        if(window.confirm("hapus bonus ini?")) {
            await db.collection("daftarBonus").doc(id).delete()
        }
    }

    return (
        <>
            {
                bonus.map((item) => {
                    return (
                        <Row className="Item" key={ item.id }>
                            <Col>{ item.username }</Col>
                            <Col>{ item.bonus }</Col>
                            <Col><Button size="sm" onClick={ () => onDeleteBonus(item.id) }>delete</Button></Col>
                        </Row>
                    )
                })
            }
        </>
    )
}

export default Bonus
