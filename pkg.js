"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const chalk_1 = __importDefault(require("chalk"));
var distFolder = "./dist";
var files = [
    "package.json",
    "package-lock.json",
    ".gitignore",
    "presenceDev",
    "html/pages/popup/scss",
    "html/pages/tab/scss"
];
(async () => {
    console.log(chalk_1.default.blue("Packaging..."));
    await fs_extra_1.removeSync(`${distFolder}/chrome`);
    await fs_extra_1.ensureDirSync(`${distFolder}/chrome`);
    await fs_extra_1.copySync("./Extension", `${distFolder}/chrome`);
    await Promise.all(files.map(f => {
        fs_extra_1.removeSync(`${distFolder}/chrome/${f}`);
    }));
    var manifest = await fs_extra_1.readJSONSync(`${distFolder}/chrome/manifest.json`);
    delete manifest.applications;
    await fs_extra_1.writeJsonSync(`${distFolder}/chrome/manifest.json`, manifest, {
        spaces: 2
    });
    console.log(chalk_1.default.green("Done!"));
})();
