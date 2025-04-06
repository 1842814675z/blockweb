import { ethers } from "ethers";
import contractABI from "./contractABI.json";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const contractAddress = "0x1293Ac947Df0Bd26F1227060F755c1C73d1CD02a"; // 实际的合约地址

// 静态私钥
const STATIC_PRIVATE_KEY = "0xb8927b115399cacc1af3d02afe36e89f928e7daee3e6a5a1a07d77df8656a5d2";  //实际的私钥

// 创建 Signer
const getSigner = () => {
  try {
    return new ethers.Wallet(STATIC_PRIVATE_KEY, provider);
  } catch (error) {
    console.error("创建 Signer 失败：", error.message);
    throw new Error("无效的私钥，请检查私钥格式是否正确");
  }
};

// 创建合约实例
const getContract = () => {
  const signer = getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
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

// 上传图像
export const uploadImage = async (imageHash, metadata) => {
  try {
    const contract = getContract();
    const tx = await contract.uploadImage(imageHash, metadata);
    await tx.wait(); // 等待交易完成
    console.log("图像上传成功！");
  } catch (error) {
    console.error("上传图像失败：", error.message);
    if (error.transaction) {
      console.error("交易数据：", error.transaction);
    }
    throw new Error("图像上传失败，请检查输入参数或账户状态");
  }
};

// 获取图像
export const getImage = async (imageId) => {
  try {
    const contract = getContract();
    const result = await contract.getImage(imageId);
    return result; // 返回图像的元数据
  } catch (error) {
    console.error("获取图像失败：", error.message);
    throw new Error("获取图像失败，请检查图像 ID 或账户状态");
  }
};
