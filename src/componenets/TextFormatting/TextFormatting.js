import React from "react";
import styles from './styles/textformatting.module.css'

function TextFormatting({label, data}) {

    return (
        <div className={styles.textContainer}>
            <h3 style={{color: '#64748b', fontSize: '16px'}}>{label}</h3>
            <p>{data}</p>
        </div>
        
    );
  }

  export default TextFormatting;