// import datas from '../data/index.json';
// import * as XLSX from 'xlsx';
const XLSX = require('xlsx');
const data = require('../data');
const { processData, header } = require('./index');

function exprotXlsx(data, fields, fileName, sheetName) {
  fileName = fileName ?? 'new_file.xlsx';
  sheetName = sheetName ?? 'Sheet1';
  const headerField = fields ?? Object.keys(header(data));
  const result = processData(data, headerField);
  const ws = XLSX.utils.aoa_to_sheet([headerField, ...result]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
}
