import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import styles from "./index.module.css"

export default function InputPromotTextarea({handlePromtChange, clearTextarea}) {

    const [values, setValues] = useState({
        topic: null,
        isLimitedChar: true,
        generateImage: true,
    })

    useEffect(() => {
        handlePromtChange(values);
    }, [values])

    useEffect(() => {
        setValues({
            ...values,
            topic: null,
          });
    },[clearTextarea])

    return (
        <div className={styles.searchInputContainer}>
            <div className={styles.searchInput}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea"
                        placeholder='Type your post idea here | Examples:  Breakup quote, Motivational, Announce my new video on youtube etc'
                        rows={5}
                        className={styles.noFocusOutline}
                        value={values.topic || ''}
                        onChange={(e) => {
                            setValues({
                                ...values,
                                topic: e.target.value
                            })
                        }}
                    />
                </Form.Group>
            </div>
            <Form.Check
               onChange={(e) => {
                setValues({
                    ...values,
                    isLimitedChar: !values.isLimitedChar
                })
               }}
               type="checkbox"
               label="Generate within 149 characters"
               id="char"
               checked={values.isLimitedChar} 
            />
            <Form.Check
               onChange={(e) => {
                setValues({
                    ...values,
                    generateImage: !values.generateImage
                })
               }}
               type="checkbox"
               label="Generate Image"
               id="img"
               checked={values.generateImage} 
            />
        </div>
    )
}
