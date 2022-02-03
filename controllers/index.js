const fs = require('fs');
const path = require('path');

module.exports.uploadPage = (req, res) => {
    res.render('./index')
}

module.exports.upload = async (req, res) => {
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(`./upload/${req.file.filename}`);
    const sheet_name_list = workbook.SheetNames;
    // console.log(sheet_name_list); // getting as Sheet1
  
    sheet_name_list.forEach(function (y) {  // untuk memanggil fungsi disetiap element di array y adalah worksheetnya
        const worksheet = workbook.Sheets[y];
        //getting the complete sheet
        // console.log(worksheet);
  
        let headers = {};
        const data = XLSX.utils.sheet_to_json(worksheet); // isinta array dan ada objeknya
        const directory = 'upload';

        // untuk menghapus semua file dalam folder upload
        fs.readdir(directory, (err, files) => { // fs tolong read file yang ada di direktori ini(upload)
            if (err) throw err; // kalau error throw
            for (const file of files) { // kalau gk err bikin loop dari "files" di jabarkan menjadi "file"
                fs.unlink(path.join(directory, file), err => { // setiap "file" tolong di hapus/ unlink
                    if (err) throw err; // kalau error ya throw
                });
            }
        });
        res.send(data)
        //drop those first two rows which are empty
    });
}

    // untuk mengecek file bisa diupload apa enggak => res.send(req.file)
    // {
    //     "fieldname":"uploadfile",
    //     "originalname":"customer.xlsx",
    //     "encoding":"7bit",
    //     "mimetype":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //     "destination":"upload/",
    //     "filename":"29cfed9255747ea7da3cf11369b1639a",
    //     "path":"upload\\29cfed9255747ea7da3cf11369b1639a",
    //     "size":8389
    // }

