// src/pages/ImageQueryPage.js
import React, { useState } from "react";
import { getImage } from "../utils/contract";

const ImageQueryPage = () => {
  const [imageId, setImageId] = useState("");
  const [imageData, setImageData] = useState(null);

  const handleQuery = async () => {
    if (!imageId) {
      alert("请输入图像ID");
      return;
    }

    const data = await getImage(imageId);
    setImageData(data);
  };

  return (
    <div>
      <h1>查询图像</h1>
      <input
        type="number"
        placeholder="图像ID"
        value={imageId}
        onChange={(e) => setImageId(e.target.value)}
      />
      <button onClick={handleQuery}>查询</button>
      {imageData && (
        <div>
          <p>图像哈希: {imageData[0]}</p>
          <p>图像元数据: {imageData[1]}</p>
          <p>上传者: {imageData[2]}</p>
          <p>上传时间: {new Date(imageData[3] * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ImageQueryPage;

