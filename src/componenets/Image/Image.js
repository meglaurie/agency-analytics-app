import React from 'react';
import styles from './styles/image.module.css';

const Image = ({imageData, handleClick, selectedImage}) => {
  return (
    <div data-testid="image" className={styles.grid} >
      {imageData ? (
        <>
        {imageData.map(image => (
        <div key={image.id} className={styles.container} onClick={((e) => handleClick(image))}>
          <img src={image.url} alt={image.description} className={`${styles.image} ${selectedImage && selectedImage.id === image.id ? `${styles.active}` : ''} `}/>
          <p className={styles.text}>{image.filename}</p>
          <p>{((image.sizeInBytes/1024)/1000).toFixed(2) + "MB"}</p>
        </div>
        ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Image;