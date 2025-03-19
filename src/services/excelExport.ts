import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Exports table data to an Excel file.
 */
export const exportToExcel = (data: any, fileName: string = "export.xlsx") => {
  if (!Array.isArray(data)) {
    console.error("Export Error: Data is not an array", data);
    return;
  }

  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(dataBlob, fileName);
  } catch (error) {
    console.error("Export Error:", error);
  }
};
