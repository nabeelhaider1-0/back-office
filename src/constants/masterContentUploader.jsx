import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadFileMasterContentHotel = async (selectedFile) => {
  if (!selectedFile) {
    return { success: false, error: "No file selected" };
  }

  try {
    const s3 = new S3Client({
      region: import.meta.env.VITE_AWS_REGION || "eu-west-1",
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });

    const region = import.meta.env.VITE_AWS_REGION || "eu-west-1";
    const bucket = import.meta.env.VITE_S3_BUCKET || "escapra-assets"; // s3://escapra-assets/extranet/
    const rawPrefix =
      import.meta.env.VITE_S3_MASTERCONTENTHOTELIMAGES || "hotelContentImages/";
    const prefix = `${rawPrefix}`.replace(/^\/+/, "").replace(/\/+$/, "") + "/";
    const safeName = `${Date.now()}-${selectedFile.name}`.replace(/\s+/g, "-");
    const key = `${prefix}${safeName}`;

    const arrayBuffer = await selectedFile.arrayBuffer();
    const bodyBytes = new Uint8Array(arrayBuffer);

    const params = {
      Bucket: bucket,
      Key: key,
      Body: bodyBytes,
      ContentType: selectedFile.type,
      ContentLength: bodyBytes.byteLength,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return { success: true, imagelink: fileUrl };
  } catch (error) {
    const err = error || {};
    // Log helpful AWS SDK v3 error details for debugging
    // Note: $metadata is present on many AWS errors and includes status code and request ids

    console.error("[S3 Upload Error]", {
      name: err?.name,
      message: err?.message,
      code: err?.code,
      httpStatusCode: err?.$metadata?.httpStatusCode,
      requestId: err?.$metadata?.requestId,
      extendedRequestId: err?.$metadata?.extendedRequestId,
      cfId: err?.$metadata?.cfId,
    });
    return {
      success: false,
      error: err?.message || "S3 upload failed",
      httpStatusCode: err?.$metadata?.httpStatusCode,
      requestId: err?.$metadata?.requestId,
    };
  }
};

export default uploadFileMasterContentHotel;
