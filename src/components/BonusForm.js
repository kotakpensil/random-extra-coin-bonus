import React, { useState } from "react"
import db from "../resources/firebase.config"

import AnimatedNumber from "react-animated-numbers"

import { Button, Container, Form } from "react-bootstrap"
import { toast } from "react-toastify"

const BonusForm = () => {
    const collection = db.collection("daftarBonus/")

    const [username, setUsername] = useState("");
    const [bonus, setBonus] = useState(0)
    var checkuser = false

    const insertBonus = async() => {
        const min = 1000
        const max = 24000
        const random = Math.floor(Math.random() * (max - min + 1) + min)
        setBonus(random)

        await collection.doc().set({
            username: username,
            bonus: random,
            created: Date().toLocaleString()
        })

        toast("Selamat boss dapat " + random, { type: "success" })
    }

    const userValidation = async() => {
        await collection.where("username", "==", username).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.exists) {
                    checkuser = true
                }
            })
        })

        if(checkuser === true) {
            toast("udah pernah ambil bosss woi", { type: "info" })
        } else {
            insertBonus()
        }
    }

    const bonusValidation = () => {
        if (username !== "") { 
            userValidation()
        } else {
            toast("masukin username dulu boss", { type: "info" })
        }

    }

    return (
        <Container>
            <Form.Group>
                <small>Masukkan username dengan benar. Kami tidak bertanggung jawab dengan pegisian username yang salah</small>
            </Form.Group>
            <Form.Group className="centered">
                <Form.Control required size="lg" type="text" value={username} onChange={e => setUsername(e.target.value)} name="username" placeholder="username" />
            </Form.Group>
            <Form.Group className="centered">
                <AnimatedNumber
                    fontStyle={{ fontFamily: "Nunito", fontSize: 56 }}
                    animateToNumber={ bonus }
                    animationType={ "random" }
                />
            </Form.Group>
            <Form.Group className="centered">
                <Button size="lg" onClick={ bonusValidation }>PUTAR BONUS</Button>
            </Form.Group>
        </Container>
    )
}

export default BonusForm
