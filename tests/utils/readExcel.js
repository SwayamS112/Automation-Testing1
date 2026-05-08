import xlsx from "xlsx";

export function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[1]; 
  const sheet = workbook.Sheets[sheetName]; 

  const data = xlsx.utils.sheet_to_json(sheet); 

  return data;
}