import{e as S,A as n,T as d,g as C,h as I,i as M,j as E,N,k as l}from"./index-CcOgn_VS.js";import{C as O}from"./command-b8KknBM2.js";const T=new O().setManual({purpose:"Fetch system information"}).setExecute(async function(x,A){var u;const{username:s,hostname:r,settingsManager:w}=A,m=E.split(`
`),c=((s==null?void 0:s.length)??0)+((r==null?void 0:r.length)??0)+1,g=await w.getSettings(S.VIRTUAL_PATHS.theme).get("theme");let f=l[0];g!=null&&parseInt(g)&&(f=l[g??0]??l[0]);const i=navigator.userAgent;let a;i.match(/Firefox\//)?a="Mozilla Firefox":i.match(/Edg\//)?a="Microsoft Edge":i.match(/Chrome\//)?a="Google Chrome":i.match(/Safari\//)?a="Apple Safari":a="Unknown";const e=(t,o)=>n.fg.cyan+t.toUpperCase()+n.reset+": "+o,h=[`${n.fg.cyan+s+n.reset}@${n.fg.cyan+r+n.reset}`,"-".repeat(c),e("os",N),e("uptime",d.getUptime(2)),e("resolution",window.innerWidth+"x"+window.innerHeight),e("theme",f),e("icons","Font Awesome"),e("terminal",((u=C.getAppById(I.TERMINAL))==null?void 0:u.name)??"Unknown"),e("browser",a),e("platform",navigator.platform),e("language",navigator.language),"",Object.values(n.fg).map(t=>t+"███").join("")+n.reset],p=[];for(let t=1;t<m.length;t++){let o=`${M+m[t]+n.reset}  `;t<=h.length?o+=h[t-1]:o+=" ".repeat(c),p.push(o)}return p.join(`
`)});export{T as neofetch};