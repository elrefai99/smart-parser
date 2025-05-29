import { Router } from "express";
import { uploadXLSX } from "../../middleware/multer/multer.middleware";
import { addConteroller } from "./excel.controller";

const router: Router = Router()

router.post('/', uploadXLSX, addConteroller)

export default router
