import React, { useState, useEffect } from 'react'
import db from '../resources/firebase.config'

import { Table, Button } from "react-bootstrap"

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
        <Table striped hover size="sm">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Bonus</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                bonus.map((item) => {
                    return (
                        <tr className="Item" key={ item.id }>
                            <td>{ item.username }</td>
                            <td>{ item.bonus }</td>
                            <td><Button size="sm" onClick={ () => onDeleteBonus(item.id) }>delete</Button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}

export default Bonus
