const fs = require('fs');
const csvjson = require('csvjson');
const writeFile = fs.writeFile;
let arr = [];

fs.readFile('msisdn.json', 'utf8', (err, json_string) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    jsonString =  JSON.parse(json_string);
    let first_bucket = jsonString.hits.hits;
     
    first_bucket.forEach(value => {
        let source = value._source;
                arr.push(source);
                
            })

            const csvData = csvjson.toCSV(arr, {
                headers: 'key'
            });
            console.log(csvData)
            writeFile('msisdn.csv', csvData, (err) => {
                if(err) {
                    console.log(err); // Do something to handle the error or just throw it
                    throw new Error(err);
                }
                console.log('Success!');
            });
           
            
 
    
})

