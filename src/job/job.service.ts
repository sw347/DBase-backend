import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { url } from 'inspector';

@Injectable()
export class JobService {
  uploadFileURL(fileName: string): string {
    return `http://localhost:4433/uploads/${fileName}`;
  }

  async sendFile(fileName: string) {
    try {
      const res = await axios.post('http://localhost:3000/api/process-pdf', {
        fileName,
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error sending file:', error);
    }
  }

  async findAll() {
    const uploadFilePath = 'uploads';

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
