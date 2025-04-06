import React, { useState } from "react";
import { uploadToIPFS } from "../utils/ipfs";
import { uploadImage, getImage } from "../utils/contract";

const DashboardPage = () => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState("");
  const [imageId, setImageId] = useState("");
  const [queriedImage, setQueriedImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image || !metadata) {
      alert("请提供文件和元数据");
      return;
    }

    try {
      // 将图像上传到 IPFS
      const imageHash = await uploadToIPFS(image);

      // 将 IPFS 哈希值和元数据上传到区块链
      await uploadImage(imageHash, metadata);
      alert("图像上传成功");
    } catch (error) {
      console.error("图像上传失败：", error.message);
      alert("图像上传失败，请稍后重试！");
    }
  };

  const handleQuery = async () => {
    if (!imageId) {
      alert("请输入图像 ID");
      return;
    }

    try {
      const imageData = await getImage(imageId);
      setQueriedImage(imageData);
    } catch (error) {
      console.error("查询图像失败：", error.message);
      alert("查询图像失败，请稍后重试！");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* 图像上传部分 */}
      <div>
        <h2>上传图像</h2>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="图像描述"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
        />
        <button onClick={handleUpload}>上传</button>
      </div>

      {/* 图像查询部分 */}
      <div>
        <h2>查询图像</h2>
        <input
          type="text"
          placeholder="用户名"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
        />
        <button onClick={handleQuery}>查询</button>

        {queriedImage && (
          <div>
            <h3>查询结果：</h3>
            <p>图像哈希：{queriedImage[0]}</p>
            <p>元数据：{queriedImage[1]}</p>
            <p>上传者地址：{queriedImage[2]}</p>
            <p>时间戳：{queriedImage[3]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;