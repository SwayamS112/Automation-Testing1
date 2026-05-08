import { parse } from 'csv-parse/sync';
export function readCSV(filePath){
    
    const fileContent= fs.readFileSync(filePath)
        const records = parse(fileContent,{
        columns:true,
        skip_empty_lines:true
    });

    return records;
}