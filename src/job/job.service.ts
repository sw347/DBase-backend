import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JobService {
  uploadFileURL(fileName: string): string {
    return `http://localhost:4433/uploads/jobInformation/${fileName}`;
  }

  async receivedFile(): Promise<void> {}

  async sendFile(fileName: string) {
    // const folderId = fs.readdirSync('uploads/jobInformation').length;
    const folderId = path.basename(path.dirname(fileName));

    try {
      // 폴더 이름 저장하기 folderId
      const res = await axios
        .post('http://localhost:3000/api/process-pdf', {
          folderId,
          fileName,
        })
        .then((response) => {
          if (response.data.status == 'success') {
            return { success: true };
          } else {
            return { error: false, message: response.data.message };
          }
        }) // success: true or error: false
        .catch((error) => {
          console.error('Error processing PDF:', error);
        });
    } catch (error) {
      console.error('Error sending file:', error);
    }
  }

  async findAll() {
    const uploadFilePath = 'uploads/jobInformation';

    if (!fs.existsSync(uploadFilePath)) {
      return [];
    }

    const files = fs.readdirSync(uploadFilePath);

    return files.map((filename) => ({
      filename,
      url: this.uploadFileURL(filename),
    }));
  }
}
