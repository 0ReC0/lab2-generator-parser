const { create, convert } = require("xmlbuilder2");
const { writeFile } = require("fs");
const htmlCreator = require("html-creator");
const { Door } = require("../models/door");

class Generator {
  _globalPublicKey = "RW5jb2RlIGEgc3RyaW5n";
  _globalDoorName = "door1";
  _globalDoorId = 1;

  constructor() {}

  generateXMLString(
    countOfChunks,
    doorId = this._globalDoorId,
    doorName = this._globalDoorName,
    publicKey = this._globalPublicKey
  ) {
    const root = create().ele("doorData");
    for (let i = 0; i < countOfChunks; i++) {
      const item = root.ele("data");

      item.att("id", doorId);

      item.att("doorState", this.getRandomStateBool());

      item.att("dateTime", this.getDateTimeNowString());

      item.att("name", doorName);

      item.att("publicKey", publicKey);
    }

    const xml = root.end({ prettyPrint: true });
    return xml;
  }
  createXMLFile(fileName, xmlString) {
    writeFile(`./data/generated/${fileName}.xml`, xmlString, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log(`./data/generated/${fileName}.xml saved!`);
    });
  }
  generateHTMLString(
    countOfChunks,
    doorId = this._globalDoorId,
    doorName = this._globalDoorName,
    publicKey = this._globalPublicKey
  ) {
    const html = new htmlCreator().withBoilerplate();

    for (let i = 0; i < countOfChunks; i++) {
      html.document.addElementToType("body", {
        type: "div",
        content: [
          {
            type: "input",
            attributes: { name: "id", value: `${doorId}` },
          },
          {
            type: "input",
            attributes: {
              name: "doorState",
              value: `${this.getRandomStateBool()}`,
            },
          },
          {
            type: "input",
            attributes: {
              name: "dateTime",
              value: `${this.getDateTimeNowString()}`,
            },
          },
          {
            type: "input",
            attributes: { name: "name", value: `${doorName}` },
          },
          {
            type: "input",
            attributes: { name: "publicKey", value: `${publicKey}` },
          },
        ],
      });
    }

    return html.renderHTML();
  }
  createHTMLFile(fileName, htmlString) {
    writeFile(`./data/generated/${fileName}.html`, htmlString, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log(`./data/generated/${fileName}.html saved!`);
    });
  }
  generateJSONString(
    countOfChunks,
    doorId = this._globalDoorId,
    doorName = this._globalDoorName,
    publicKey = this._globalPublicKeyÎ
  ) {
    let doorData = { data: [] };
    for (let i = 0; i < countOfChunks; i++) {
      doorData.data.push(
        new Door(
          doorId,
          this.getRandomStateBool(),
          this.getDateTimeNowString(),
          doorName,
          publicKey
        )
      );
    }
    return JSON.stringify(doorData);
  }
  createJSONFile(fileName, jsonString) {
    writeFile(`./data/generated/${fileName}.json`, jsonString, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log(`./data/generated/${fileName}.json saved!`);
    });
  }
  getRandomStateBool() {
    return Boolean(Math.round(Math.random()));
  }
  getDateTimeNowString() {
    return Date.now().toString();
  }
  runTests(countXMLChuncks, countJSONChuncks, countHTMLChuncks) {
    let xmlStr = this.generateXMLString(countXMLChuncks);
    this.createXMLFile("xmlData", xmlStr);

    let jsonStr = this.generateJSONString(countJSONChuncks);
    this.createJSONFile("JSONData", jsonStr);

    let htmlStr = this.generateHTMLString(countHTMLChuncks);
    this.createHTMLFile("HtmlData", htmlStr);
  }
}

const generator = new Generator();
generator.runTests(3, 3, 3);
