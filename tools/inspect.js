const sharp=require('sharp');
(async()=>{
const f='D:/think/assets-source/think-logo..png';
const s=sharp(f,{limitInputPixels:false});
const m=await s.metadata();
console.log(JSON.stringify({w:m.width,h:m.height,ch:m.channels,alpha:m.hasAlpha,space:m.space,depth:m.depth}));
const st=await sharp(f,{limitInputPixels:false}).stats();
console.log(JSON.stringify(st.channels.map(c=>({min:c.min,max:c.max,mean:Math.round(c.mean)}))));
const t=await sharp(f,{limitInputPixels:false}).trim({threshold:10}).toBuffer({resolveWithObject:true});
console.log('trim',JSON.stringify(t.info));
await sharp(f,{limitInputPixels:false}).resize(1600).flatten({background:'#0c0c0c'}).png().toFile('D:/think/tools/preview/logo-on-dark.png');
})();
