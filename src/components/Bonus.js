import React, { useState, useEffect } from 'react'
import db from '../resources/firebase.config'
import moment from 'moment'

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
        <table className="table table-sm table-stripped">
            <thead>
                <tr>
                    <th>Tgl Muternya</th>
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
                            <td>
                                { moment(item.created).format('DD MMMM YYYY - HH:mm:ss ') }
                                (GMT{ moment(item.created).format('ZZ') })
                            </td>
                            <td>{ item.username }</td>
                            <td>{ item.bonus }</td>
                            <td><button className="btn btn-danger btn-sm" onClick={ () => onDeleteBonus(item.id) }>delete</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default Bonus
