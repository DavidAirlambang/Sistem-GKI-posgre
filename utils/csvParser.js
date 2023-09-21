import fs from 'fs'
import csvParser from 'csv-parser'

export function convertCSVtoJSON (csvFilePath, rowFormat) {
  return new Promise((resolve, reject) => {
    const jsonData = []

    fs.createReadStream(csvFilePath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', row => {
        const formattedRow = rowFormat(row)
        jsonData.push(formattedRow)
      })
      .on('end', () => {
        resolve(jsonData)
      })
      .on('error', error => {
        reject(error)
      })
  })
}
