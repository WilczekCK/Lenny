import axios from "axios";

class UploadFilesService {
  async upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return await axios.post("/api/meme/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    });
  }
}

export default new UploadFilesService();
