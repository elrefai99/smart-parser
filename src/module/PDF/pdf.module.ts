import { Router } from "express";
import { uploadPDF } from "../../middleware/multer/multer.middleware";
import { addConteroller } from "./pdf.controller";

const router: Router = Router()

router.post('/', uploadPDF, addConteroller)

export default router
