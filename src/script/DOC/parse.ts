import mammoth from 'mammoth'

export async function parseDOCX_Function(file: any) {
     const result = await mammoth.extractRawText({ path: file })

     return result.value
}
