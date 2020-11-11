//

const XLSX = require('xlsx');
const def = x => typeof x !== 'undefined';
const emptyArray = x => Array.isArray(x) && !x.length;
// COMPOSED FUNCTIONS
const pluck = (key, object) => object[key];
const compose = (...fns) => fns.reduceRight((f, g) => (...args) => g(f(...args)));
const applyDelimeter = (el, delimter = ',') => el.join(delimter);
const newLigne = tab => tab.join('\n');
const header = ([head, ...tail]) => head;

const processData = (data, fields = []) =>
  data.reduce((acc, el) => {
    const item = [...fields.map(field => pluck(field, el))];
    return [...acc, item];
  }, []);

const exprotXlsx = (data, fields, fileName, sheetName) => {
  const headerField = fields ?? Object.keys(header(data));
  fileName = fileName ?? 'new_file.xlsx';
  sheetName = sheetName ?? 'Sheet1';

  const result = processData(data, headerField);
  const ws = XLSX.utils.aoa_to_sheet([headerField, ...result]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
};

module.exports = {
  def,
  pluck,
  compose,
  applyDelimeter,
  newLigne,
  processData,
  header,
  emptyArray,
};
