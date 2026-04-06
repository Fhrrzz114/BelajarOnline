const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('resources/js/Pages/Admin');
let replacedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('stroke="currentColor font-bold"')) {
        content = content.replace(/stroke="currentColor font-bold"/g, 'stroke="currentColor"');
        fs.writeFileSync(file, content);
        replacedFiles++;
        console.log(`Fixed: ${file}`);
    }
});

console.log(`Replaced across ${replacedFiles} files!`);
