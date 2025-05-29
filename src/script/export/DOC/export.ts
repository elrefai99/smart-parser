import fs from 'fs';
import path from 'path';
import { Document, Packer, Paragraph } from 'docx';

export const generateDocx = async (text: string): Promise<string> => {
     const doc = new Document({
          sections: [{ children: [new Paragraph(text)] }],
     });

     const filePath = path.join('exports', `output-${Date.now()}.docx`);
     const buffer = await Packer.toBuffer(doc);
     fs.writeFileSync(filePath, buffer);
     return filePath;
};
