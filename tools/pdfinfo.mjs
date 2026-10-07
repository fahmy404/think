import * as mupdf from 'mupdf';import fs from 'fs';
const d=mupdf.Document.openDocument(fs.readFileSync('D:/think/assets-source/think-background.pdf'),'application/pdf');
const n=d.countPages();console.log('pages',n);
for(let i=0;i<Math.min(3,n);i++){const p=d.loadPage(i);const b=p.getBounds();console.log(i,JSON.stringify(b));
const w=b[2]-b[0];const s=Math.min(1,1600/w);
const pix=p.toPixmap(mupdf.Matrix.scale(s,s),mupdf.ColorSpace.DeviceRGB,false,true);
fs.writeFileSync('D:/think/tools/preview/pdf-p'+i+'.png',pix.asPNG());console.log('wrote',i);}
