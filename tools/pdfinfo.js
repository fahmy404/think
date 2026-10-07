const mupdf=require('mupdf');const fs=require('fs');
const d=mupdf.Document.openDocument(fs.readFileSync('D:/think/assets-source/think-background.pdf'),'application/pdf');
console.log('pages',d.countPages());
for(let i=0;i<Math.min(3,d.countPages());i++){const p=d.loadPage(i);console.log(i,JSON.stringify(p.getBounds()));}
