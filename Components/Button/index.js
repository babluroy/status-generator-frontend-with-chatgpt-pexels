import React,{useState,useEffect} from 'react'
import styles from "./index.module.css"

export default function Button( { onClick, label, color, disabled = false } ) {

    const [showLoadingText, setShowLoadingText] = useState(false) 

    useEffect(() => {
        if(disabled){
            setTimeout(() => {
                setShowLoadingText(true)
            },3500);
        } else {
            setShowLoadingText(false)
        }
    },[disabled])

    return (
        <div className={styles.buttonContainer}>
            <button className={styles.customButton} style={{backgroundColor:color}} onClick={onClick} disabled={disabled}>
                {!disabled ? label : ''}
                {disabled ?  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> : ''}
                {showLoadingText ? ' Almost done...' : ''}
            </button>
        </div>
    )
}
