const {XMLParser} = require('fast-xml-parser')
const fs = require('fs');

const openhtml = require('open-html');

const args = process.argv

const parseOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
}

const HTMLTemplate = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Google Vault File View</title><link href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css' rel='stylesheet'/><link href='https://cdn.datatables.net/v/bs4-4.6.0/jq-3.6.0/dt-1.13.4/datatables.min.css' rel='stylesheet'/><script src='https://cdn.datatables.net/v/bs4-4.6.0/jq-3.6.0/dt-1.13.4/datatables.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js'></script></head><body><table id='datatable'></table><script>const JSONData = `%DATAGOESHERE%`;$('#datatable').DataTable({data: JSON.parse(JSONData),columns: [{ data: 'fileID', title:'File ID' },{ data: 'owner', title: 'Owner' },{ data: 'title', title: 'Title' },{ data: 'filesize', title: 'File size' },]});</script></body></html>"

async function _main() {

    const XMLData = fs.readFileSync(args[2]);

    const parser = new XMLParser(parseOptions);
    let jObj = parser.parse(XMLData)

    let fileArray = [];

    for (let file of jObj.Root.Batch.Documents.Document) {
        fileArray.push({
            fileID: file["@_DocID"],
            owner: file.Tags.Tag[0]["@_TagValue"],
            collaborators: file.Tags.Tag[1]["@_TagValue"],
            viewers: file.Tags.Tag[2]["@_TagValue"],
            created: file.Tags.Tag[3]["@_TagValue"],
            modified: file.Tags.Tag[4]["@_TagValue"],
            title: file.Tags.Tag[5]["@_TagValue"],
            filesize: file.Files.File.ExternalFile["@_FileSize"]
        })
    }

    let HTMLOutput = HTMLTemplate.toString().replace('%DATAGOESHERE%',JSON.stringify(fileArray));


    openhtml(HTMLOutput);

}


module.exports = async function() {
        await _main()
}