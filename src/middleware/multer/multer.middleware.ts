import { Request } from "express";
import path from "path";
import multer from "multer"

function destination(req: Request, _file: any, callback: any) {
     const { baseUrl } = req;

     const isPDF = baseUrl === "/api/pdf"

     const folderPath = path.join(__dirname, "../../../cdn",
          isPDF ? "PDF" : ""
     )

     callback(null, folderPath)
}

function fileName(_req: Request, file: any, callback: any) {
     callback(null,
          parseInt(
               Math.ceil(Math.random() * Date.now()).toPrecision(16)
                    .toString()
                    .replace(".", "")
          ) + path.extname(file.originalname)
     )
}

const multerStorage = multer.diskStorage({
     destination: destination,
     filename: fileName,
});

export const uploadPDF: any = multer({
     storage: multerStorage,
     limits: {
          fileSize: 75 * 1024 * 1024,
     },
}).single("pdf")
