import ExcelJS from 'exceljs';
import path from 'path';

export const generateExcel = async (text: string): Promise<string> => {
     const workbook = new ExcelJS.Workbook();
     const sheet = workbook.addWorksheet('Parsed PDF');

     const lines = text.split('\n').filter((line) => line.trim() !== '');
     lines.forEach((line, i) => sheet.addRow([i + 1, line]));

     const filePath = path.join('exports', `output-${Date.now()}.xlsx`);
     await workbook.xlsx.writeFile(filePath);
     return filePath;
};
