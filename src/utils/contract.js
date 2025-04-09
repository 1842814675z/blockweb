import { ethers } from "ethers";
import contractABI from "./contractABI.json"; // 确保 ABI 文件路径正确

// 智能合约地址
const contractAddress = "0x8626c30E9d75505f84f94D2eD6059Dd42E4D2b34";

// Ganache 本地区块链的 RPC URL
const ganacheRpcUrl = "http://127.0.0.1:7545"; // 替换为您的 Ganache RPC 地址

// 使用私钥初始化钱包（替换为您的 Ganache 私钥）
const privateKey = "0xd837d5e437346fbb390f45c0531b4087148fc9ea82c0d77c3bc6f597b4cb936c"; // 替换为您的私钥
const provider = new ethers.JsonRpcProvider(ganacheRpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// 创建合约实例
const getContract = () => {
  return new ethers.Contract(contractAddress, contractABI, wallet);
};

// 上传图像到区块链
export const uploadImage = async (imageHash, metadata) => {
  try {
    if (!imageHash || !metadata) {
      throw new Error("图像哈希或元数据不能为空");
    }

    const contract = getContract();
    const tx = await contract.uploadImage(imageHash, metadata);
    await tx.wait(); // 等待交易完成
    console.log("图像上传成功！");
  } catch (error) {
    console.error("上传图像失败：", error.message);
    throw new Error("上传图像失败，请检查输入参数或账户状态");
  }
};

// 查询用户上传的所有图像
export const getImagesByUsername = async (username) => {
  try {
    if (!username) {
      throw new Error("用户名不能为空");
    }

    const contract = getContract();
    const images = await contract.getImagesByUsername(username);

    // 格式化返回的图像数据
    const formattedImages = images.map((image) => ({
      imageHash: image.imageHash,
      metadata: image.metadata,
      uploader: image.uploader,
      timestamp: new Date(Number(image.timestamp) * 1000).toLocaleString(), // 转换时间戳为本地时间
    }));

    console.log("查询到的图像：", formattedImages);
    return formattedImages;
  } catch (error) {
    console.error("查询图像失败：", error.message);
    throw new Error("查询图像失败，请检查用户名或账户状态");
  }
};

// 用户注册
export const register = async (username, email) => {
  try {
    if (!username || !email) {
      throw new Error("用户名或邮箱不能为空");
    }

    const contract = getContract();
    const tx = await contract.register(username, email);
    await tx.wait(); // 等待交易完成
    console.log("注册成功！");
  } catch (error) {
    console.error("注册失败：", error.message);
    throw new Error("注册失败，请检查输入参数或账户状态");
  }
};

// 用户登录认证
export const authenticate = async (username, email) => {
  try {
    if (!username || !email) {
      throw new Error("用户名或邮箱不能为空");
    }

    const contract = getContract();
    const result = await contract.authenticate(username, email);
    return result;
  } catch (error) {
    console.error("登录认证失败：", error.message);
    throw new Error("登录认证失败，请检查用户名、邮箱或账户状态");
  }
};

export default getContract;