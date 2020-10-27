const { create, convert } = require("xmlbuilder2");
const { readFileSync } = require("fs");
const { Door } = require("../models/door");

class Parser {
  _globalPublicKey = "RW5jb2RlIGEgc3RyaW5n";
  _globalDoorName = "door1";
  _globalDoorId = 1;

  constructor() {}

  parseXMLString(xmlString) {
    const doc = create(xmlString);
    const serializedXML = doc.end({ format: "xml", prettyPrint: true });
    return serializedXML;
  }
  parseXMLFile(fileName) {
    return readFileSync(`./data/${fileName}.xml`, {
      encoding: "utf8",
      flag: "r",
    });
  }
  generateHTMLObject(params) {}
  createHTMLFile() {}
  parseJSONStringIntoObject(jsonString) {
    return JSON.parse(jsonString);
  }
  parseJSONFile(fileName) {
    return readFileSync(`./data/${fileName}.json`, {
      encoding: "utf8",
      flag: "r",
    });
  }
}

const parser = new Parser();

console.log("!------XMLParsing\n");
let xmlStr = parser.parseXMLFile("xmlData");
console.log(parser.parseXMLString(xmlStr));
console.log("\n------\n\n");

console.log("!------JSONParsing\n");
let jsonStr = parser.parseJSONFile("JSONData");
console.log(parser.parseJSONStringIntoObject(jsonStr));
console.log("\n------\n\n");
