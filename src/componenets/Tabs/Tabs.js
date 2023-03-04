import React, { useState } from "react";
import styles from './styles/tabs.module.css'

function Tabs({ tabLabels, tabContent }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
      <div data-testid="tabs">
      <div className={styles.tabContainer}>
        <ul className={styles.flexContainer}>
          {tabLabels.map((label, index) => (
            <li
              key={index}
              className={`${styles.tab} ${activeTab === index ? `${styles.active}` : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {label}
            </li>
          ))}
        </ul>
        <hr/>
        </div>
        <div className={styles.tabContent}>
          {tabContent[activeTab]}
        </div>
      </div>
    );
  }

  export default Tabs;