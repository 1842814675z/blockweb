import { create } from "ipfs-http-client";

// 配置 IPFS 客户端连接到本地 IPFS 节点
const ipfsClient = create({
  url: "http://127.0.0.1:5001/api/v0", // 本地 IPFS 节点的 API 地址
});

// 上传文件到 IPFS
export const uploadToIPFS = async (file) => {
  if (!file) {
    throw new Error("文件不能为空");
  }

  try {
    // 上传文件到 IPFS
    const added = await ipfsClient.add(file);
    console.log("IPFS File Hash:", added.path);
    return added.path; // 返回文件的 IPFS 哈希值
  } catch (error) {
    console.error("IPFS 上传失败:", error);
    throw new Error("IPFS 上传失败，请检查 IPFS 节点是否正常运行");
  }
};