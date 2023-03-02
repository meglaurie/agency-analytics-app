import React from "react";
import styles from './styles/textformatting.module.css'

function TextFormatting({label, data}) {

    return (
        <div className={styles.textContainer}>
            <p style={{color: '#64748b'}}>{label}</p>
            <p>{data}</p>
        </div>
        
    );
  }

  export default TextFormatting;