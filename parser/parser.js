const { create, convert } = require("xmlbuilder2");
const { readFileSync } = require("fs");
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
  parseXMLFile(fileName) {
    return readFileSync(`./data/${fileName}.xml`, {
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
    return doorData;
  }
  parseHTMLFile(fileName) {
    return readFileSync(`./data/${fileName}.html`, {
      encoding: "utf8",
      flag: "r",
    });
  }
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

console.log("!------HTMLParsing\n");
let htmlStr = parser.parseHTMLFile("HtmlData");
console.log(parser.parseHTMLString(htmlStr));
console.log("\n------\n\n");
