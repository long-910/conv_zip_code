import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import * as iconv from 'iconv-lite';

interface ZipCodeData {
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
}

const convertCsvToJson = async () => {
  try {
    // Shift-JISでファイルを読み込む
    const csvBuffer = fs.readFileSync('KEN_ALL.CSV');
    const csvContent = iconv.decode(csvBuffer, 'Shift_JIS');
    
    const records = parse(csvContent, {
      columns: false,
      skip_empty_lines: true
    });

    const zipCodeData: ZipCodeData[] = records.map((record: string[]) => ({
      zipCode: record[2].replace(/[^\d]/g, ''),
      prefecture: record[6],
      city: record[7],
      street: record[8]
    }));

    fs.writeFileSync(
      'zipcode-data.json',
      JSON.stringify(zipCodeData, null, 2),
      'utf-8'
    );

    console.log('変換が完了しました。');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
};

convertCsvToJson(); 
