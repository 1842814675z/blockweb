// src/pages/UploadPage.js
import React, { useState } from "react";
import { uploadToIPFS } from "../utils/ipfs";
import { uploadImage } from "../utils/contract";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image || !metadata) {
      alert("请提供文件和元数据");
      return;
    }

    // 将图像上传到 IPFS
    const imageHash = await uploadToIPFS(image);

    // 将 IPFS 哈希值和元数据上传到区块链
    await uploadImage(imageHash, metadata);
    alert("图像上传成功");
  };

  return (
    <div>
      <h1>上传图像</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="图像描述"
        value={metadata}
        onChange={(e) => setMetadata(e.target.value)}
      />
      <button onClick={handleUpload}>上传</button>
    </div>
  );
};

export default UploadPage;
