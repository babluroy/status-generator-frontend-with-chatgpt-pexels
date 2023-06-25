import React from 'react'
import styles from "./index.module.css"

export default function Status({status}) {
  return (
    <div className={styles.statusContainer}>
        <div className={styles.heading}>Your generated status</div>
        <div className={styles.generatedStatusContainer}>
           {status}
        </div>
    </div>
  )
}
