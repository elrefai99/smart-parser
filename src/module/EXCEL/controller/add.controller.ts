import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { parseExcel_Function } from "../../../script/parse/excel/parse";

export const addConteroller = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const file = req.file
          const data = await parseExcel_Function(file?.path)

          res.status(200).json({ code: 200, status: "OK", data })
     }
)
