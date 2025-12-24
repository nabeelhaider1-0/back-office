import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadFile = async (selectedFile) => {
  if (!selectedFile) {
    return { success: false, error: "No file selected" };
  }

  try {
    const s3 = new S3Client({
      region: "ap-south-1", // 🔹 set your region here
      credentials: {
        accessKeyId: "AKIATGJZPMTWPOGQ4SJP",
        secretAccessKey: "AJuPzMtJ6j5BNhOGNDqBnAoLnYJhsC1097/1hSpV",
      },
    });

    const params = {
      Bucket: "tdo-upload-files-to-s3",
      Key: selectedFile.name,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${params.Bucket}.s3.${"ap-south-1"}.amazonaws.com/${params.Key}`;

    return { success: true, imagelink: fileUrl };
  } catch (error) {
    return { success: false, error };
  }
};

export default uploadFile;
