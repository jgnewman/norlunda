"use strict";(()=>{var S=["b","d","f","g","h","j","k","l","m","n","p","r","s","t","\xFE","w","z"],L=[...S,"v","x"],G=["j","l","r","w"],Ee=S.filter(t=>!G.includes(t)),Z=["b","d","g","k","p","t"],Ne=S.filter(t=>!Z.includes(t)),dt=["m","n"],Be=S.filter(t=>!dt.includes(t)),M=["f","h","s","\xFE","v","z"],Ue=S.filter(t=>!M.includes(t)),D=["m","p","b"],He=S.filter(t=>!D.includes(t)),J=["g","k","h"],Ge=S.filter(t=>!J.includes(t));var h=["a","\xE6","e","i","o","\xF8","u","y"],F=["\u0105","\u0119","\u012F","\u01EB","\u0173"],K=[...h,...F],W=new RegExp(`(${h.join("|")})`,"g"),Y=new RegExp(`(${F.join("|")})`,"g"),k=["\u0101","\u01E3","\u0113","\u012B","\u014D","\u0153","\u016B","\u0233","\u0254"],d=["\u01ED"],Tt=[...k,...d],tt=new RegExp(`(${d.join("|")})`,"g"),et=["\xE2","\xEA","\xEE","\xF4","\xFB","\u0177"],nt=new RegExp(`(${et.join("|")})`,"g"),rt=[...K,...Tt,...et],De=[...F,...d],st=["a","o","u"],ot=["i","\u012B","j"],it={a:"\xE6",o:"\xF8",u:"y"},g={a:["a","\u0105","\u0101","\xE2"],\u00E6:["\xE6","\u01E3"],e:["e","\u0119","\u0113","\xEA"],i:["i","\u012F","\u012B","\xEE"],o:["o","o\u0328","\u014D","\u01ED","\xF4"],\u00F8:["\xF8","\u0153"],u:["u","\u0173","\u016B","\xFB"],y:["y","\u0233","\u0177"]},at=[...g.a,...g.\u00E6,...g.o],lt=["\u014D","\xF4","\u01ED"],_=t=>t==="\u0254"?"o":g.a.includes(t)?"a":g.\u00E6.includes(t)?"\xE6":g.e.includes(t)?"e":g.i.includes(t)?"i":g.o.includes(t)?"o":g.\u00F8.includes(t)?"\xF8":g.u.includes(t)?"u":g.y.includes(t)?"y":"a",C=t=>g.a.includes(t)?"\u0101":g.\u00E6.includes(t)?"\u01E3":g.e.includes(t)?"\u0113":g.i.includes(t)?"\u012B":g.o.includes(t)?"\u014D":g.\u00F8.includes(t)?"\u0153":g.u.includes(t)?"\u016B":g.y.includes(t)?"y":"\u0101",I={shortVowels:["a","e","i","o","u"],longVowels:["aa","ee","ie","oe"],diphthongs:["au","ei"],longToShort:{aa:"o",ee:"e",ie:"i",oe:"e"}},f=t=>{switch(t){case"a":return"a";case"\xE6":return"e";case"e":return"e";case"i":return"i";case"o":return"o";case"\xF8":return"i";case"u":return"u";case"y":return"u";case"\u0101":return"ei";case"\u01E3":return"oe";case"\u0113":return"ee";case"\u012B":return"ie";case"\u014D":return"u";case"\u0153":return"oe";case"\u0254":return"aa";case"\u016B":return"au";case"\u0233":return"au"}return t},q=t=>`/'${t.replace(/aa/g,"\u0254\u02D0").replace(/au/g,"a\u028A").replace(/ee/g,"e\u02D0").replace(/ei/g,"a\u026A").replace(/ie/g,"i\u02D0").replace(/i([^ː])/g,"\u026A$1").replace(/(oe|œ)/g,"\xF8\u02D0").replace(/sh/g,"\u0283").replace(/[bcdfghjklmnpqrstvwxz]{2}/g,e=>e[0]===e[1]?e[0]+"\u02D0":e).replace(/([bcdfghjklmnpqrstvwxz])v/g,"$1\u028B").replace(/([aeiouy])g([aeiouy])/g,"$1\u0263$2")}/`;function i(t){return t[t.length-1]}function u(t){return typeof t=="string"?t[0]??"":t[0]}function $(t){return t.slice(0,-1)}var c=t=>rt.includes(t),l=t=>L.includes(t),m=t=>t.split("").some(c);var ct=t=>{if(l(u(t)))return["",t];let n="",e=t;for(;e.length&&c(u(e));)n+=u(e),e=e.slice(1);return[n,e]},j=t=>{if(l(i(t)))return[t,""];let n="",e=t;for(;e.length&&c(i(e));)n=i(e)+n,e=e.slice(0,-1);return[e,n]},x=t=>{if(c(u(t)))return["",t];let n="",e=t;for(;e.length&&l(u(e));)n+=u(e),e=e.slice(1);return[n,e]},b=t=>{if(c(i(t)))return[t,""];let n="",e=t;for(;e.length&&l(i(e));)n=i(e)+n,e=e.slice(0,-1);return[e,n]},R=t=>{let n=[],e=!1,r=0,s="";for(let o=0;o<t.length;o++){let a=t[o];c(a)?(e||(e=!0,r=o),s+=a):(e=!1,s&&n.push({position:r,vowel:s}),s="")}return s&&n.push({position:r,vowel:s}),n},ut=t=>t.split("").filter(l).join("");var vt=(t,n)=>t&&n&&t!==n&&!/^(d[st]|þ[st]|ft|g[dþs]|hs|ht|k[st]|l[bdþfgkmnpstvz]|mp|n[dþgkst]|ps|r[bdþfgkmnpstvz]|s[kpt]|ts)$/.test(t+n),Mt=t=>{let n=!1,e=!1;for(let r=0;r<t.length;r++){let s=t[r],o=t[r+1];if(l(s)?e||(e=!0):e=!1,e&&vt(s,o)){n=!0;break}}return n},P=t=>{let[n,e]=b(t);return Mt(e)},A=t=>$(t)+"a"+i(t),E=t=>{let n="";for(let e=0;e<t.length;e++){let r=t[e],s=t[e+1],o=t[e+2];l(r)&&l(s)&&l(o)&&(r===s||s===o)?(n+=r===s?r+o:r+s,e+=2):n+=r}return n},p=(t,n,e,r=!1)=>{let s=e.reduce((o,a)=>[...o,a(o.length?i(o):t,n)],[]);return r&&console.log(s.reduce((o,a,V)=>(o[`Phase ${V+1}`]=a,o),{}),n),i(s)},T=(t,n)=>t[n];var Pt=t=>{let[n,e]=ct(t),[r,s]=x(e);return r.length?r.length===1?m(s)?[n,r+s]:[n+r,s]:[n+r[0],r.slice(1)+s]:[n,e]},Ft=t=>{let[n,e]=x(t),[r,s]=Pt(e);return[n+r,s]},N=(t,n=[])=>{if(!t)return n;let[e,r]=Ft(t);return m(r)?N(r,[...n,e]):[...n,e+r]},y=N,It=t=>{let n=i(N(t)),[e]=b(n),[r,s]=j(e);return h.includes(s)},w=t=>{if(!It(t))return t;let n=N(t),e=i(n);return $(n).join("")+e.replace(W,(s,o)=>C(o))};var wt=t=>{let n=i(R(t));return!n||n.vowel.length>1||!st.includes(n.vowel)?-1:n.position},Lt=t=>{let[n,e]=x(t);return/j/.test(n)||ot.includes(u(e))},Wt=(t,n)=>{if(!Lt(n))return t;let e=wt(t);if(e===-1)return t;let r=t[e],s=T(it,r);return`${t.slice(0,e)}${s}${t.slice(e+1)}`},_t=t=>{let n=y(t);return n.map((e,r)=>{let s=n[r+1];return s?Wt(e,s):e}).join("")},pt=(t,n)=>p(t,n,[_t]);var X=t=>{let[n,e]=x(t);return at.includes(u(e))},Rt=t=>{let[n,e]=x(t);return lt.includes(u(e))},B=(t,n)=>{let e=i(R(n));return!e||e.vowel!==t?-1:e.position},At=(t,n)=>{if(!X(n))return t;let e=B("u",t);return e===-1?t:`${t.slice(0,e)}o${t.slice(e+1)}`},Et=(t,n)=>{let[e,r]=b(t),[s]=x(n);return/j/.test(r+s)},Nt=(t,n)=>{let[e,r]=b(t),[s]=x(n),o=r+s;return o.length>1&&/^(m|n)/.test(o)},Bt=(t,n)=>{if(!X(n))return t;let e=B("i",t);return e===-1||Et(t,n)?t:`${t.slice(0,e)}e${t.slice(e+1)}`},Ut=(t,n)=>{if(!X(n))return t;let e=B("e",t);return e===-1||!Nt(t,n)?t:`${t.slice(0,e)}i${t.slice(e+1)}`},Ht=(t,n)=>{if(!Rt(n))return t;let e=B("\u0113",t);return e===-1?t:`${t.slice(0,e)}\u0254${t.slice(e+1)}`},Gt=t=>{let n=y(t);return n.map((e,r)=>{let s=n[r+1];if(!s)return e;let o=At(e,s),a=Bt(o,s),V=Ut(a,s);return Ht(V,s)}).join("")},ft=(t,n)=>p(t,n,[Gt]);var Zt=t=>{let n=t.split("").reduce((e,r,s,o)=>{let a=o[s+1],V=r==="j",O=a==="j";if(V){let[U,H]=b(e),Q=i(H),kt=H[H.length-2];return l(Q)&&kt===Q?e:e+r}if(!l(r)||r==="w"||r==="z"||!O)return e+r;let[v,z]=j(e);return z.length>1||!K.includes(i(z))?e+r:e+r+r},"");return/nną$/.test(n)?n.replace(/nną$/,"nn"):n},Dt=t=>{let n="";for(let e=0;e<t.length;e++){let r=t[e],s=t[e+1],o=t[e+2];M.includes(r)&&l(s)&&D.includes(o)?(n+=r+r+o,e+=2):n+=r}return n},gt=(t,n)=>p(t,n,[Zt,Dt]);var Jt=t=>t.replace(nt,(n,e)=>C(e)),Kt=t=>{let n=t.replace(/aih?/g,"\u0101").replace(/anh/g,"\u0101").replace(/auh?/g,"\u0254").replace(/ouh?/g,"\u014D").replace(/[æe]nh/g,"\u0113").replace(/(i|ī)nh/g,"$1h").replace(/(ehu|euh|eu|ewu|ew)/g,"\u012B").replace(/ehw/g,"\u01E3").replace(/ēa/g,"\u0101").replace(/ēǭ/g,"\u0101").replace(/iuh?/g,"\u0233").replace(/jj/g,"j").replace(/ōu/g,"\u014D"),e=n.match(/iw/);return!e||e.index===void 0?n:l(n.charAt(e.index+2))?n.replace(/iw/,"\u0233"):n},qt=t=>{let n=[/wijaną$/,/ijaną$/,/janą$/,/hwaną$/,/waną$/,/āną$/,/aną$/,/ōną$/,/oną$/,/ną$/];for(let e of n){let r=t.replace(e,"");if(m(r)&&t!==r)return r+"an"}return t},Xt=(t,n)=>{if(n.isFalseVerb)return t;let e=qt(t);if(e===t)return e;let r=e.replace(/h?an$/,""),s=i(r);if(c(s)){let[o,a]=j(r);return h.includes(a)?$(r)+C(s)+"han":r+"han"}else return r+"an"},Qt=t=>/wij(ō|ǭ)$/.test(t)?t.replace(/wij(ō|ǭ)$/,c(t.slice(-5)[0])?"wa":"a"):/hij(ō|ǭ)$/.test(t)?t.replace(/hij(ō|ǭ)$/,"a"):/ij(ō|ǭ)$/.test(t)?t.replace(/ij(ō|ǭ)$/,m(t.slice(0,-3))?"":"\u012B"):/hw(ō|ǭ)$/.test(t)?t.replace(/hw(ō|ǭ)$/,"k"):/w(ō|ǭ)$/.test(t)?t.replace(/w(ō|ǭ)$/,c(t.slice(-3)[0])?"wa":""):/j(ō|ǭ)$/.test(t)?t.replace(/j(ō|ǭ)$/,""):/(ō|ǭ)$/.test(t)?t.replace(/(ō|ǭ)$/,J.includes(t.slice(-2)[0])?"a":""):/wij(o|ǫ)$/.test(t)?t.replace(/wij(o|ǫ)$/,c(t.slice(-5)[0])?"wa":"a"):/ij(o|ǫ)$/.test(t)?t.replace(/ij(o|ǫ)$/,""):/w(o|ǫ)$/.test(t)?t.replace(/w(o|ǫ)$/,""):/j(o|ǫ)$/.test(t)?t.replace(/j(o|ǫ)$/,""):/(ǫ|o)$/.test(t)?t.replace(/(ǫ|o)$/,""):/wijā$/.test(t)?t.replace(/wijā$/,c(t.slice(-5)[0])?"wa":"a"):/ijā$/.test(t)?t.replace(/ijā$/,m(t.slice(0,-3))?"":"\u012B"):/wā$/.test(t)?t.replace(/wā$/,m(t.slice(0,-2))?"":"v\u0101"):/jā$/.test(t)?t.replace(/jā$/,""):/ā$/.test(t)?t.replace(/ā$/,m(t.slice(0,-1))?"":"\u0101"):/wij(a|ą)$/.test(t)?t.replace(/wij(a|ą)$/,c(t.slice(-5)[0])?"wa":"a"):/ij(a|ą)$/.test(t)?t.replace(/ij(a|ą)$/,""):/w(a|ą)$/.test(t)?t.replace(/w(a|ą)$/,m(t.slice(0,-2))?"":"\u0101"):/j(a|ą)$/.test(t)?t.replace(/j(a|ą)$/,m(t.slice(0,-2))?"":"ja"):/(ą|a)$/.test(t)?t.replace(/(ą|a)$/,""):/ē$/.test(t)?t.replace(/ē$/,m(t.slice(0,-1))?"":"\u0113"):/(į|ī)$/.test(t)?t.replace(/(į|ī)$/,"a"):/i$/.test(t)?t.replace(/i$/,""):/u$/.test(t)?t.replace(/u$/,"a"):/hw$/.test(t)?l(t.slice(-3)[0])?t.replace(/hw$/,""):w(t.replace(/hw$/,"")):/w$/.test(t)&&c(t.slice(-2)[0])?w(t.replace(/w$/,"")):t,Yt=t=>t.replace(Y,(n,e)=>h[F.indexOf(e)]).replace(tt,(n,e)=>k[d.indexOf(e)]),te=t=>t.replace(/(lz|zl)/g,"ll"),ee=t=>t.replace(/.(mf|nf)$/,()=>{let n=i(t.slice(0,-2));return h.includes(n)?C(n)+"f":n+"f"}),ne=t=>t.replace(/mb$/,"m"),re=t=>P(t)?A(t):t,mt=(t,n)=>p(t,n,[Kt,Jt,Xt,Qt,Yt,te,ee,ne,re]);var se=t=>{let n=i(t),e=i($(t));return n==="s"&&e!=="s"&&e!=="h"&&l(e)?t.slice(0,-1):/iwaz$/.test(t)?t.replace(/iwaz$/,"a"):/ijaz$/.test(t)?t.replace(/ijaz$/,m(t.slice(0,-4))?"":"\u012B"):/haz$/.test(t)?c(t.slice(-4)[0])?"h":w(t.replace(/haz$/,"")):/waz$/.test(t)?t.replace(/waz$/,l(t.slice(-4)[0])?"a":""):/az$/.test(t)?t.replace(/az$/,m(t.slice(0,-2))?"":"az"):/iwiz$/.test(t)?t.replace(/iwiz$/,l(t.slice(-5)[0])?"a":""):/īz$/.test(t)?t.replace(/īz$/,"\u012B"):/iz$/.test(t)?t.replace(/iz$/,m(t.slice(0,-2))?"":"iz"):/ūz$/.test(t)?t.replace(/ūz$/,"\u016B"):/uz$/.test(t)?t.replace(/uz$/,m(t.slice(0,-2))?"":"uz"):t},oe=t=>t.replace(/hs/,"ks").replace(/[^z]?z/g,n=>{let[e]=n.split("");return h.includes(e)?C(e)+"r":e+"r"}),ie=t=>P(t)?A(t):t,ht=(t,n)=>p(t,n,[se,oe,ie]);var ae=t=>{let n=t.split(/dw/);return n.map((e,r)=>{let s=n[r+1];if(!s)return e;let o=i(e),a=u(s);return!c(o)||!c(a)?e:e+"w"}).join("")},xt=(t,n)=>p(t,n,[ae]);var le=t=>{let n="";for(let e=0;e<t.length;e++){let r=t[e];if(k.includes(r)||d.includes(r)){let[s,o]=x(t.slice(e+1)),a=s.length;if(a>=2){n+=_(r),n+=s,e+=a;continue}}n+=r}return n},ce=t=>{let[n,e]=t.endsWith("an")?[!0,t.slice(0,-2)]:[!1,t],r=y(e);if(r.length<3)return t;let s=u(r),o=r[1],a=i(r),V=u(o),[O,v]=j(a),z=i(O),U=s+V+z+v;return n?U+"an":U},ue=t=>{if(!/nan$/.test(t)||y(t).length<3)return t;let n=t.slice(0,-3);return h.includes(i(n))?$(n)+"nan":t},pe=t=>{let n=!1;return t.split("").reduce((e,r,s,o)=>{let a=o[s+1],V=c(a);if(n&&c(r))return V||(n=!1),e;if(r!=="w")return e+r;let O=i(e);if(!c(O)||!V)return e+r;n=!0;let[v,z]=j(e);return z.length>1?e:$(e)+C(z)},"")},fe=t=>{let n="";for(let e=0;e<t.length;e++){let r=t[e],s=t[e+1],o=t[e+2];r==="d"&&s==="g"&&!l(o)?(n+="gg",e++):r==="t"&&s==="g"&&!l(o)?(n+="kk",e++):n+=r}return n.replace(/ngt/g,"nt")},Ct=(t,n)=>p(t,n,[le,ce,ue,pe,fe]);var ge=t=>t.split("").reduce((n,e,r,s)=>{let o=i(n),a=s[r+1];return e==="b"&&a!=="b"&&c(o)?n+"v":n+e},""),me=t=>t.split("").reduce((n,e)=>{let r=i(n);return e==="b"&&l(r)&&r!=="b"?n+"f":n+e},""),he=t=>t.split("").reduce((n,e,r,s)=>{let o=s[r+1];return e==="d"&&M.includes(o)?n+"t":n+e},""),xe=t=>t.split("").reduce((n,e)=>{let r=i(n);return M.includes(e)&&r==="f"&&e!=="f"?n:n+e},""),Ce=t=>t.replace(/(g|k)s/g,"x"),$e=t=>u(t)==="h"&&l(t[1])?t.slice(1):t,Ve=t=>t.split("").reduce((n,e,r,s)=>{let o=s[r+1];return e==="h"&&l(o)&&!/[lr]/.test(o)?n+"k":n+e},""),ye=t=>t.replace(/þ/g,"d"),je=t=>t.split("").reduce((n,e,r,s)=>{let o=i(n),a=s[r+1];return o==="s"&&e==="k"&&(c(a)||Z.includes(a))?n+"h":n+e},"").replace(/tsk/g,"tsh"),be=t=>u(t)==="w"&&l(t[1])?t.slice(1):t,Oe=t=>t.replace(/w/g,"v"),$t=(t,n)=>p(t,n,[ge,me,he,xe,Ce,$e,Ve,ye,je,be,Oe]);var ze=new RegExp(`(${k.join("|")})w`,"g"),Se=t=>t.replace(/ǣw$/,"\u0153").replace(/æw/,"au"),ke=t=>{let n=t,e=c(i($(t)));if(/w$/.test(n)&&e){n=$(n);let[r,s]=j(n);s.length===1&&h.includes(s)&&(n=n.replace(W,(o,a)=>C(a)))}return n.replace(ze,(r,s)=>_(s)+"w")},de=t=>{let n=t.endsWith("an"),e=y(t.replace(/an$/,""));if(e.length<2)return t;let r=e[1],s=e[2]??"",[o,a]=b(r),[V,O]=x(s);if(!a.length&&!V.length)return t;let v=u(e)+ut(r)+e.slice(2).join("");return P(v)?t:v+(n?"an":"")},Te=t=>{let n=y(t);return u(n)+n.slice(1).map(e=>e.replace(/ā/g,"a").replace(/ē/g,"e").replace(/ī/g,"i").replace(/ō/g,"o").replace(/œ/g,"\xF8").replace(/ɔ/g,"a").replace(/ū/g,"u").replace(/ȳ/g,"y")).join("")},ve=t=>E(t),Me=t=>t.replace(/au/g,"au").replace(/j?a$/,(n,e,r)=>{let s=r.slice(0,-1);return i(s)==="j"?"ja":m(s)?f("a"):f("\u0254")}).replace(/a/g,f("a")).replace(/æ/g,f("\xE6")).replace(/e/g,f("e")).replace(/i/g,f("i")).replace(/o/g,f("o")).replace(/ø/g,f("\xF8")).replace(/y/g,f("y")).replace(/ā/g,(n,e,r)=>{let s=!r[e+1],o=r.slice(e+1)==="han";return s||o?f("\u0254"):f("\u0101")}).replace(/ǣ/g,f("\u01E3")).replace(/ē/g,f("\u0113")).replace(/ī/g,f("\u012B")).replace(/ō/g,(n,e,r)=>G.includes(r[e+1])?f("\u0153"):f("\u014D")).replace(/œ/g,f("\u0153")).replace(/ɔ/g,f("\u0254")).replace(/ū/g,f("\u016B")).replace(/ȳ/g,f("\u0233")),Pe=t=>t.replace(/([aeiouy])han$/,"$1n"),Fe=t=>t.replace(/eir$/,"eer"),Ie=t=>t.replace(/[aeioøuy]g[dtþ]/g,n=>{let e=n[0],r=i(n);return C(e)+r}),Vt=(t,n)=>p(t,n,[Se,ke,de,Ie,Te,$t,ve,Me,Pe,Fe]);var we={bagmaz:"baumaz",frawj\u00F4:"fr\u01E3j\xF4",kweman\u0105:"kuman\u0105",nur\u00FEr\u0105:"nur\xFE\u0105",sun\u00FEr\u0105:"s\u016B\xFE\u0105",sw\u014Dtuz:"s\u014Dtuz",trudan\u0105:"tredan\u0105",w\u014Ddanaz:"wudanaz"},Le=t=>T(we,t)??t,yt=(t,n)=>p(t,n,[Le]);var We=t=>t.replace(/ą̄/g,"\u0101").replace(/į̄/g,"\u012B").replace(/į̄/g,"\u012B").replace(/ǫ̂/g,"\u01ED").replace(/ų̄/g,"\u0173"),jt=(t,n)=>p(t,n,[We]);var bt=["akran\u0105","aljan\u0105","bain\u0105","barn\u0105","baukn\u0105","bragn\u0105","faikn\u0105","gaman\u0105","garn\u0105","herzn\u0105","h\u014Dn\u0105","hurn\u0105","\u012Bsarn\u0105","kitt\u012Bn\u0105","kurn\u0105","laihn\u0105","lakan\u0105","laun\u0105","l\u012Bn\u0105","magin\u0105","main\u0105","mulkn\u0105","ragin\u0105","rahn\u0105","razn\u0105","regn\u0105","skarn\u0105","streun\u0105","sw\u012Bn\u0105","taikn\u0105","teun\u0105","tin\u0105","t\u016Bn\u0105","w\u0113pn\u0105","w\u012Bn\u0105","wulkan\u0105","wulkn\u0105"];var _e=t=>{let n=y(t);return u(n)+n.slice(1).map(e=>I.longVowels.reduce((r,s)=>r.replace(s,T(I.longToShort,s)),e)).join("")},Re=t=>I.longVowels.reduce((n,e)=>{let r=new RegExp(`${e}[${L.join("")}]{2}`,"g");return n.replace(r,s=>{let o=s.slice(0,2),a=s.slice(2);return T(I.longToShort,o)+a})},t),Ae=t=>E(t),Ot=(t,n)=>p(t,n,[_e,Re,Ae]);var zt=t=>{let n=t.toLowerCase().replace(/^\*/,""),e={},r=[];return bt.includes(n)&&(e.isFalseVerb=!0),r.push({step:"Massage Known Outliers",result:yt(n,e)}),r.push({step:"Sanitize Phonology",result:jt(i(r).result,e)}),r.push({step:"I-Mutation",result:pt(i(r).result,e)}),r.push({step:"A-Mutation",result:ft(i(r).result,e)}),r.push({step:"Gemination",result:gt(i(r).result,e)}),r.push({step:"Vowel Laxing",result:mt(i(r).result,e)}),r.push({step:"Z-Loss",result:ht(i(r).result,e)}),r.push({step:"West-Germanic Hardening",result:xt(i(r).result,e)}),r.push({step:"Syllable Reduction",result:Ct(i(r).result,e)}),r.push({step:"Modernization",result:Vt(i(r).result,e)}),r},St=t=>{let n=t.split(":").map(o=>o.trim());if(n.length===1){let o=zt(n[0]),a=i(o).result;return{isCompound:!1,input:t,steps:o,output:a,outputComponents:null,outputIPA:q(a)}}let e=n.map(o=>i(zt(o)).result),r=e.join(""),s=Ot(r,{});return{isCompound:!0,input:n,steps:null,output:s,outputComponents:e,outputIPA:q(s)}},lr=St;typeof window<"u"&&(window.norlunda=St);})();
