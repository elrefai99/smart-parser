import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { parseDOCX_Function } from "../../../script/parse/DOC/parse";

export const addConteroller = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const file = req.file
          const data = await parseDOCX_Function(file?.path)

          res.status(200).json({ code: 200, status: "OK", data })
     }
)
