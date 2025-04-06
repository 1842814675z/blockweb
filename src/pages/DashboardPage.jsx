import React, { useState } from "react";
import { uploadToIPFS } from "../utils/ipfs";
import { uploadImage, getImagesByUsername } from "../utils/contract";
import "./DashboardPage.css"; // 引入样式文件

const DashboardPage = ({ loggedInUsername }) => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState("");
  const [queriedImages, setQueriedImages] = useState([]);
  const [queryUsername, setQueryUsername] = useState(""); // 查询的用户名
  const [isUploading, setIsUploading] = useState(false); // 上传状态
  const [isQuerying, setIsQuerying] = useState(false); // 查询状态

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 上传图像
  const handleUpload = async () => {
    if (!image || !metadata) {
      alert("请提供文件和元数据");
      return;
    }

    if (!loggedInUsername) {
      alert("请先登录");
      return;
    }

    setIsUploading(true); // 设置上传状态为 true
    try {
      console.log("开始上传到 IPFS...");
      const imageHash = await uploadToIPFS(image);
      console.log("上传到 IPFS 成功，哈希值：", imageHash);

      console.log("开始上传到区块链...");
      await uploadImage(imageHash, metadata);
      alert("图像上传成功");
    } catch (error) {
      console.error("图像上传失败：", error.message);
      alert(`图像上传失败：${error.message}`);
    } finally {
      setIsUploading(false); // 恢复上传状态
    }
  };

  // 查询用户上传的图像
  const handleQueryByUsername = async () => {
    if (!queryUsername) {
      alert("请输入用户名");
      return;
    }

    setIsQuerying(true); // 设置查询状态为 true
    try {
      const images = await getImagesByUsername(queryUsername);

      // 将时间戳转换为实际时间
      const formattedImages = images.map((image) => ({
        ...image,
        timestamp: new Date(image.timestamp).toLocaleString(), // 转换为本地时间
      }));

      setQueriedImages(formattedImages);
    } catch (error) {
      console.error("查询图像失败：", error.message);
      alert("查询图像失败，请稍后重试！");
    } finally {
      setIsQuerying(false); // 恢复查询状态
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>图像上传和查询</h1>
        <p>欢迎，<span className="username">{loggedInUsername}</span>！</p>
      </div>

      {/* 图像上传部分 */}
      <div className="upload-section">
        <h2>上传图像</h2>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <input
          type="text"
          placeholder="请输入图像描述"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="text-input"
        />
        <button onClick={handleUpload} disabled={isUploading} className="upload-button">
          {isUploading ? "上传中..." : "上传"}
        </button>
      </div>

      {/* 图像查询部分 */}
      <div className="query-section">
        <h2>查询用户上传的图像</h2>
        <input
          type="text"
          placeholder="请输入用户名"
          value={queryUsername}
          onChange={(e) => setQueryUsername(e.target.value)}
          className="text-input"
        />
        <button onClick={handleQueryByUsername} disabled={isQuerying} className="query-button">
          {isQuerying ? "查询中..." : "查询"}
        </button>

        {queriedImages && queriedImages.length > 0 && (
          <div className="query-results">
            <h3>查询结果：</h3>
            {queriedImages.map((image, index) => (
              <div key={index} className="image-card">
                <p><strong>图像哈希：</strong>{image.imageHash}</p>
                <p><strong>图像描述：</strong>{image.metadata}</p>
                <p><strong>上传时间：</strong>{image.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;