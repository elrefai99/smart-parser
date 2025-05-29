import fs from 'fs-extra'
import pdf from 'pdf-parse'

export async function parsePDF_Function(file: any) {
     const data = fs.readFileSync(file)
     const result = await pdf(data)

     return result.text
}
