import React, { useState } from "react"
import db from "../resources/firebase.config"

import AnimatedNumber from "react-animated-numbers"
import { useToasts } from "react-toast-notifications"

const BonusForm = () => {
    const collection = db.collection("daftarBonus/")
    const { addToast } = useToasts()

    const [username, setUsername] = useState("");
    const [bonus, setBonus] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)
    var checkuser = false

    const insertBonus = async() => {
        const min = 1000
        const max = 24000
        const random = Math.floor(Math.random() * (max - min + 1) + min)
        setBonus(random)

        addToast("Selamat boss mendapatkan BONUS sebesar Rp." + random + " Harap konfirmasi melalui livechat untuk pengembilan bonus THRnya", { appearance: "success" })

        await collection.doc().set({
            username: username,
            bonus: random,
            created: Date().toLocaleString()
        })
    }

    const userValidation = async() => {
        setIsDisabled(true)
        var currentBonus

        await collection.where("username", "==", username).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.exists) {
                    currentBonus = doc.data().bonus
                    checkuser = true
                    setBonus(currentBonus)
                }
            })
        })

        if(checkuser === true) {
            addToast("Boss " + username + " sudah pernah mendapatkan BONUS sebesar Rp." + currentBonus, { appearance: "info" })

            checkuser = false
        } else {
            insertBonus()
        }
        
        setIsDisabled(false)
    }

    const bonusValidation = () => {

        if (username !== "") { 
            userValidation()
        } else {
            addToast("Masukkan username terlebih dahulu boss", { appearance: "error" })
        }
    }

    return (
        <div className="container-fluid">
            <div className="form-group mb-3">
                <div className="small text-danger text-center">Masukkan <strong>username</strong> dengan benar.</div>
                <div className="small text-danger text-center">Kami tidak bertanggung jawab atas kesalahan pegisian</div>
            </div>
            <div className="form-group">
                <input className="form-control form-control-lg" required type="text" value={username} onChange={e => setUsername(e.target.value)} name="username" placeholder="username" />
            </div>
            <div className="form-group flex-centered">
                <AnimatedNumber
                    fontStyle={{ fontFamily: "Nunito", fontSize: 56 }}
                    animateToNumber={ bonus }
                    animationType={ "random" }
                    config={{ mass: 1, tension: 280, friction: 120 }}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-primary btn-block" disabled={isDisabled} onClick={ bonusValidation }>Ambil THR</button>
            </div>
        </div>
    )
}

export default BonusForm
