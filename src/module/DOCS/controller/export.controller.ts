import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import fs from 'fs-extra'
import path from "path";
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

export const exportDocsController = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const filePath = await generateDocx(cachedText);
  res.download(filePath);
}
)
