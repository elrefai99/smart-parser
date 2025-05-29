import { Router } from "express";
import { uploadDOCS } from "../../middleware/multer/multer.middleware";
import { addConteroller } from "./docs.controller";

const router: Router = Router()

router.post('/', uploadDOCS, addConteroller)

export default router
