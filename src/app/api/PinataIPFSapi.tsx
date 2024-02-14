import axios from "axios";
// require('dotenv').config()
const pinFileToIPFS = async (file: File) => {
  console.log(process.env.NEXT_PUBLIC_PINATA_IPFS_JWT);
  if (!file.type.startsWith("image/")) {
    console.error("Only images are supported for Upload");
    return "Error File Type";
  }
  const formData = new FormData();
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: file.name,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);
  try {
    const formDataAny: any = formData;
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formDataAny._boundary}`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_IPFS_JWT}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default pinFileToIPFS;
