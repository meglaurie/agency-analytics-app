import React, { useState, useEffect } from 'react';
import './App.css';
import Image from './componenets/Image/Image';
import Tabs from './componenets/Tabs/Tabs';
import Sidebar from './componenets/SideBar/Sidebar';
import { apiUrl } from "./Api.js";

function App() {
  const [imageData, setImageData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const favorited = imageData && imageData.filter(image => image.favorited === true ? image : '' );
  const recentDate =  imageData?.map(image => { return { ...image, createdAt: new Date(image.createdAt).toLocaleString()} }).sort((a, b) => b.createdAt - a.createdAt);
  const tabLabels = ['Recently Added', 'Favorited'];
  const [liked, setLiked] = useState(null);

  const handleClick = (image) => {
    setSelectedImage(image);
    setLiked(image.favorited);
  }
  
  const handleLike = () => {
    setLiked(!liked);
  }

  const deleteImage = (id) => {
    const updatedImages = imageData?.filter(image => image.id !== id);
    setImageData(updatedImages);
    setSelectedImage(null);
  }

  const close = () => {
    setSelectedImage(null);
  }

  const tabContent = [
    <Image imageData={recentDate} handleClick={handleClick} selectedImage={selectedImage}/>,
    <Image imageData={favorited} handleClick={handleClick}/>,
  ];

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setImageData(data))
      .catch(error => console.error(error));
  }, [apiUrl]);


  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
      <div className='mainContainer' style={{ width: selectedImage ? "68%" : "100%", backgroundColor: "#f7fafc", transition: "width 0.5s"}}>
        <h1>Photos</h1>
        <Tabs tabLabels={tabLabels} tabContent={tabContent}/>
      </div>
      <div >
        {selectedImage ? <Sidebar selectedImage={selectedImage} deleteImage={deleteImage} handleLike={handleLike} close={close} liked={liked}/> : " "}
      </div>
      </div>     
    </div>
  );
}

export default App;
