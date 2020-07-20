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

  getFiles() {
    return axios.get("/files");
  }
}

export default new UploadFilesService();
