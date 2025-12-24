import * as XLSX from 'xlsx';

const excelfilereader = async (fileContent) => {
    try {
        const response = await fetch(fileContent);
        const buffer = await response.arrayBuffer();
        const wb = XLSX.read(buffer, { type: "buffer" });
        const sheetData = {};

        wb.SheetNames.forEach((sheetName) => {
            // Remove spaces from the sheet name
            const sanitizedSheetName = sheetName.replace(/\s+/g, '');
            const ws = wb.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(ws);
            sheetData[sanitizedSheetName] = json;
        });

        return sheetData;
    } catch (error) {
        throw new Error('Error reading Excel file:', error);
    }
};

export default excelfilereader;
