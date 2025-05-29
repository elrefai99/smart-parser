import xlsx from 'xlsx'

export async function parseExcel_Function(file: any) {
     const workbook = xlsx.readFile(file);
     const sheet = workbook.Sheets[workbook.SheetNames[0]];
     return xlsx.utils.sheet_to_json(sheet);
}
