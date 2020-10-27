const { create, convert } = require("xmlbuilder2");
const { readFileSync, writeFile} = require("fs");
const { Door } = require("../models/door");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Parser {
  _globalPublicKey = "RW5jb2RlIGEgc3RyaW5n";
  _globalDoorName = "door1";
  _globalDoorId = 1;

  constructor() {}

  parseXMLString(xmlString) {
    const doc = create(xmlString);
    const serializedXML = doc.end({ format: "json", prettyPrint: true });
    return serializedXML;
  }
  readXMLFile(fileName) {
    return readFileSync(`./data/generated/${fileName}.xml`, {
      encoding: "utf8",
      flag: "r",
    });
  }
  parseHTMLString(htmlString) {
    let doorData = [];
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;
    let allDivs = document.getElementsByTagName("div");
    for (let div of allDivs) {
        let doorChunk = new Door();
        for (let input of div.getElementsByTagName("input")) {
            doorChunk[`${input.name}`] = input.value;
        }
        doorData.push(doorChunk)
    }
    return JSON.stringify(doorData);
  }
  readHTMLFile(fileName) {
    return readFileSync(`./data/generated/${fileName}.html`, {
      encoding: "utf8",
      flag: "r",
    });
  }
  parseJSONString(jsonString) {
    // return JSON.parse(jsonString);
    return jsonString;
  }
  readJSONFile(fileName) {
    return readFileSync(`./data/generated/${fileName}.json`, {
      encoding: "utf8",
      flag: "r",
    });
  }
  saveFile(fileName, data) {
    writeFile(`./data/parsed/${fileName}`, data, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log(`./data/parsed/${fileName} saved!`);
    });
  }
  runTests(){
      console.log("!------XMLParsing\n");
      let xmlStr = this.readXMLFile("xmlData");
      this.saveFile("xmlData.json",this.parseXMLString(xmlStr));
      console.log("\n------\n\n");
      
      console.log("!------JSONParsing\n");
      let jsonStr = this.readJSONFile("JSONData");
      this.saveFile("JSONData.json",this.parseJSONString(jsonStr));
      console.log("\n------\n\n");
      
      console.log("!------HTMLParsing\n");
      let htmlStr = this.readHTMLFile("HtmlData");
      this.saveFile("HtmlData.json",this.parseHTMLString(htmlStr));
      console.log("\n------\n\n");

  }
}

const parser = new Parser();
parser.runTests();

