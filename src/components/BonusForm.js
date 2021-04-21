import React, { useState } from "react"
import db from "../resources/firebase.config"
import AnimatedNumber from "react-animated-numbers"
import { Button, Form } from "react-bootstrap"
import { toast } from "react-toastify"

const BonusForm = () => {
    const [username, setUsername] = useState("");
    const [bonus, setBonus] = useState(0)

    const randomNumber = async() => {
        const min = 1000
        const max = 24000
        const random = Math.floor(Math.random() * (max - min + 1) + min)
        setBonus(random)

        const daftarBonus = db.collection("daftarBonus");

        daftarBonus.where("username", "==", username).get()
            .then(snapshot => {
                try {
                    if (snapshot.empty) {
                        daftarBonus.doc().set({
                            username: username,
                            bonus: random,
                            created: Date().toLocaleString()
                        });
                    } else {
                        
                    }
                } catch (error) {
                    console.error(error);
                }
            })
    }

    const bonusValidation = () => {
        if (username !== "") { 
            randomNumber()
        } else {
            toast("Masukkan username dulu boss", {
                type: "info"
            })
        }

    }

    return (
        <Form>
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
                <Button size="lg"  onClick={ bonusValidation }>PUTAR BONUS</Button>
            </Form.Group>
        </Form>
    )
}

export default BonusForm
