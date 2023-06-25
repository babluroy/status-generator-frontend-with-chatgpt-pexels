import React from 'react'
import styles from "./index.module.css"

export default function Header() {
  return (
    <div className={styles.header}>
      <span> 
        <span className={styles.wsText}>WhatsApp</span> | 
        <span className={styles.insText}> Instagram </span>
        Status
      </span> Generator
     </div>
  )
}
