(()=>{var u=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var b=u((Nr,ne)=>{var m=["b","d","f","g","h","j","k","l","m","n","p","r","s","t","\xFE","w","z"],Vn=[...m,"v","x"],J=["j","l","r","w"],xn=m.filter(e=>!J.includes(e)),K=["b","d","g","k","p","t"],jn=m.filter(e=>!K.includes(e)),X=["m","n"],bn=m.filter(e=>!X.includes(e)),Q=["f","h","s","\xFE","v","z"],zn=m.filter(e=>!Q.includes(e)),Y=["m","p","b"],On=m.filter(e=>!Y.includes(e)),ee=["g","k","h"],Sn=m.filter(e=>!ee.includes(e));ne.exports={pgmcConsonants:m,allConsonants:Vn,pgmcApproximants:J,pgmcNonApproximants:xn,pgmcStops:K,pgmcNonStops:jn,pgmcNasals:X,pgmcNonNasals:bn,fricatives:Q,nonFricatives:zn,bilabials:Y,nonBilabials:On,pgmcVelars:ee,pgmcNonVelars:Sn}});var g=u((Ar,ae)=>{var te=["a","\xE6","e","i","o","\xF8","u","y"],F=["\u0105","\u0119","\u012F","\u01EB","\u0173"],se=[...te,...F],re=["\u0101","\u01E3","\u0113","\u012B","\u014D","\u0153","\u016B","\u0233","\u0254"],E=["\u01ED"],ie=[...re,...E],oe=["\xE2","\xEA","\xEE","\xF4","\xFB","\u0177"],qn=[...se,...ie,...oe],kn=[...F,...E],yn=["a","o","u"],vn=["i","\u012B","j"],In={a:"\xE6",o:"\xF8",u:"y"},a={a:["a","\u0105","\u0101","\xE2"],\u00E6:["\xE6","\u01E3"],e:["e","\u0119","\u0113","\xEA"],i:["i","\u012F","\u012B","\xEE"],o:["o","o\u0328","\u014D","\u01ED","\xF4"],\u00F8:["\xF8","\u0153"],u:["u","\u0173","\u016B","\xFB"],y:["y","\u0233","\u0177"]},Pn=[...a.a,...a.\u00E6,...a.o],Mn=["\u014D","\xF4","\u01ED"],dn=e=>e==="\u0254"?"o":a.a.includes(e)?"a":a.\u00E6.includes(e)?"\xE6":a.e.includes(e)?"e":a.i.includes(e)?"i":a.o.includes(e)?"o":a.\u00F8.includes(e)?"\xF8":a.u.includes(e)?"u":a.y.includes(e)?"y":"a",_n=e=>a.a.includes(e)?"\u0101":a.\u00E6.includes(e)?"\u01E3":a.e.includes(e)?"\u0113":a.i.includes(e)?"\u012B":a.o.includes(e)?"\u014D":a.\u00F8.includes(e)?"\u0153":a.u.includes(e)?"\u016B":a.y.includes(e)?"y":"\u0101",Tn={shortVowels:["a","e","i","o","u"],longVowels:["aa","ee","ie","oe"],diphthongs:["au","ei"],longToShort:{aa:"o",ee:"e",ie:"i",oe:"e"}},Wn=e=>{switch(e){case"a":return"a";case"\xE6":return"e";case"e":return"e";case"i":return"i";case"o":return"o";case"\xF8":return"i";case"u":return"u";case"y":return"u";case"\u0101":return"ei";case"\u01E3":return"oe";case"\u0113":return"ee";case"\u012B":return"ie";case"\u014D":return"u";case"\u0153":return"oe";case"\u0254":return"aa";case"\u016B":return"au";case"\u0233":return"au"}return e},Ln=e=>`/'${e.replace(/aa/g,"\u0254\u02D0").replace(/au/g,"a\u028A").replace(/ee/g,"e\u02D0").replace(/ei/g,"a\u026A").replace(/ie/g,"i\u02D0").replace(/i([^ː])/g,"\u026A$1").replace(/(oe|œ)/g,"\xF8\u02D0").replace(/[bcdfghjklmnpqrstvwxz]{2}/ig,n=>n[0]===n[1]?n[0]+"\u02D0":n)}/`;ae.exports={baseVowels:te,nasalVowels:F,allShortVowels:se,longVowels:re,longNasalVowels:E,allLongVowels:ie,overlongVowels:oe,singularVowels:qn,allNasalVowels:kn,shortBackVowels:yn,iMutators:vn,iMutationMap:In,variantMap:a,aMutators:Pn,longOMutators:Mn,shortVowelVariantOf:dn,longVowelVariantOf:_n,finalOrthography:Tn,finalSpellingOf:Wn,ipaifyFinalOrthography:Ln}});var p=u((Hr,ue)=>{var{allConsonants:N,pgmcApproximants:Rr,pgmcNonApproximants:Ur,pgmcStops:Br,pgmcNasals:Gr}=b(),{singularVowels:A}=g(),f=e=>e[e.length-1],C=e=>typeof e=="string"?e[0]??"":e[0],le=e=>e.slice(0,-1),wn=e=>typeof e=="string"?e.split("").reverse().join(""):e.reverse(),Fn=e=>A.includes(C(e)),En=e=>N.includes(C(e)),Nn=e=>A.includes(f(e)),An=e=>N.includes(f(e)),V=e=>A.includes(e),h=e=>N.includes(e),Rn=e=>e.split("").some(V),Un=e=>e.split("").some(h),Bn=e=>{if(h(C(e)))return["",e];let t="",n=e;for(;n.length&&V(C(n));)t+=C(n),n=n.slice(1);return[t,n]},Gn=e=>{if(h(f(e)))return[e,""];let t="",n=e;for(;n.length&&V(f(n));)t=f(n)+t,n=n.slice(0,-1);return[n,t]},Hn=e=>{if(V(C(e)))return["",e];let t="",n=e;for(;n.length&&h(C(n));)t+=C(n),n=n.slice(1);return[t,n]},ce=e=>{if(V(f(e)))return[e,""];let t="",n=e;for(;n.length&&h(f(n));)t=f(n)+t,n=n.slice(0,-1);return[n,t]},Zn=e=>{let t=[],n=!1,s=0,r="";for(let i=0;i<e.length;i++){let o=e[i];V(o)?(n||(n=!0,s=i),r+=o):(n=!1,r&&t.push({position:s,vowel:r}),r="")}return r&&t.push({position:s,vowel:r}),t},Dn=e=>e.split("").filter(h).join(""),Jn=e=>e.split("").filter(V).join(""),Kn=(e,t)=>e&&t&&e!==t&&!/^(d[st]|þ[st]|ft|g[dþs]|hs|ht|k[st]|l[bdþfgkmnpstvz]|mp|n[dþgkst]|ps|r[bdþfgkmnpstvz]|s[kpt]|ts)$/.test(e+t),Xn=e=>{let t=!1,n=!1;for(let s=0;s<e.length;s++){let r=e[s],i=e[s+1];if(h(r)?n||(n=!0):n=!1,n&&Kn(r,i)){t=!0;break}}return t},Qn=e=>{let[t,n]=ce(e);return Xn(n)},Yn=e=>le(e)+"a"+f(e),et=e=>{let t="";for(let n=0;n<e.length;n++){let s=e[n],r=e[n+1],i=e[n+2];h(s)&&h(r)&&h(i)&&(s===r||r===i)?(t+=s===r?s+i:s+r,n+=2):t+=s}return t},nt=(e,t,n,s=!1)=>{let r=n.reduce((i,o)=>[...i,o(i.length?f(i):e,t)],[]);return s&&console.log(r.reduce((i,o,c)=>(i[`Phase ${c+1}`]=o,i),{}),t),f(r)};ue.exports={lastOf:f,firstOf:C,allButLastOf:le,reverse:wn,beginsWithVowel:Fn,beginsWithConsonant:En,endsWithVowel:Nn,endsWithConsonant:An,isVowel:V,isConsonant:h,containsVowels:Rn,containsConsonants:Un,separateInitialVowels:Bn,separateFinalVowels:Gn,separateInitialConsonants:Hn,separateFinalConsonants:ce,getVowelGroups:Zn,removeVowels:Dn,removeConsonants:Jn,endsWithUncomfortableConsonantCluster:Qn,fixUncomfortableEndCluster:Yn,dedoubleConsonantsInCluster:et,runPhases:nt}});var z=u((Zr,he)=>{var{separateInitialVowels:tt,separateInitialConsonants:pe,containsVowels:fe}=p(),st=e=>{let[t,n]=tt(e),[s,r]=pe(n);return s.length?s.length===1?fe(r)?[t,s+r]:[t+s,r]:[t+s[0],s.slice(1)+r]:[t,n]},rt=e=>{let[t,n]=pe(e),[s,r]=st(n);return[t+s,r]},ge=(e,t=[])=>{if(!e)return t;let[n,s]=rt(e);return fe(s)?ge(s,[...t,n]):[...t,n+s]};he.exports=ge});var Ce=u((Dr,$e)=>{var it=z(),{separateInitialConsonants:ot,getVowelGroups:at,lastOf:lt,firstOf:ct,runPhases:ut}=p(),{shortBackVowels:pt,iMutators:ft,iMutationMap:gt}=g(),ht=e=>{let t=lt(at(e));return!t||t.vowel.length>1||!pt.includes(t.vowel)?-1:t.position},$t=e=>{let[t,n]=ot(e);return/j/.test(t)||ft.includes(ct(n))},Ct=(e,t)=>{if(!$t(t))return e;let n=ht(e);if(n===-1)return e;let s=e[n],r=gt[s];return`${e.slice(0,n)}${r}${e.slice(n+1)}`},mt=e=>{let t=it(e);return t.map((n,s)=>{let r=t[s+1];return r?Ct(n,r):n}).join("")};$e.exports=(e,t)=>ut(e,t,[mt])});var je=u((Jr,xe)=>{var{aMutators:Vt,longOMutators:xt}=g(),jt=z(),{separateInitialConsonants:v,firstOf:me,lastOf:bt,getVowelGroups:zt,separateFinalConsonants:Ve,runPhases:Ot}=p(),R=e=>{let[t,n]=v(e);return Vt.includes(me(n))},St=e=>{let[t,n]=v(e);return xt.includes(me(n))},I=(e,t)=>{let n=bt(zt(t));return!n||n.vowel!==e?-1:n.position},qt=(e,t)=>{if(!R(t))return e;let n=I("u",e);return n===-1?e:`${e.slice(0,n)}o${e.slice(n+1)}`},kt=(e,t)=>{let[n,s]=Ve(e),[r]=v(t);return/j/.test(s+r)},yt=(e,t)=>{let[n,s]=Ve(e),[r]=v(t),i=s+r;return i.length>1&&/^(m|n)/.test(i)},vt=(e,t)=>{if(!R(t))return e;let n=I("i",e);return n===-1||kt(e,t)?e:`${e.slice(0,n)}e${e.slice(n+1)}`},It=(e,t)=>{if(!R(t))return e;let n=I("e",e);return n===-1||!yt(e,t)?e:`${e.slice(0,n)}i${e.slice(n+1)}`},Pt=(e,t)=>{if(!St(t))return e;let n=I("\u0113",e);return n===-1?e:`${e.slice(0,n)}\u0254${e.slice(n+1)}`},Mt=e=>{let t=jt(e);return t.map((n,s)=>{let r=t[s+1];if(!r)return n;let i=qt(n,r),o=vt(i,r),c=It(o,r);return Pt(c,r)}).join("")};xe.exports=(e,t)=>Ot(e,t,[Mt])});var Oe=u((Kr,ze)=>{var{fricatives:dt,bilabials:_t}=b(),{lastOf:be,isConsonant:U,separateFinalVowels:Tt,separateFinalConsonants:Wt,runPhases:Lt}=p(),{allShortVowels:wt}=g(),Ft=e=>{let t=e.split("").reduce((n,s,r,i)=>{let o=i[r+1],c=s==="j",x=o==="j";if(c){let[L,w]=Wt(n),D=be(w),mn=w[w.length-2];return U(D)&&mn===D?n:n+s}if(!U(s)||s==="r"||s==="w"||s==="z"||!x)return n+s;let[q,j]=Tt(n);return j.length>1||!wt.includes(be(j))?n+s:n+s+s},"");return/nną$/.test(t)?t.replace(/nną$/,"nn"):t},Et=e=>{let t="";for(let n=0;n<e.length;n++){let s=e[n],r=e[n+1],i=e[n+2];dt.includes(s)&&U(r)&&_t.includes(i)?(t+=s+s+i,n+=2):t+=s}return t};ze.exports=(e,t)=>Lt(e,t,[Ft,Et])});var _e=u((Xr,de)=>{var{pgmcVelars:Nt}=b(),B=z(),{lastOf:y,allButLastOf:ke,endsWithUncomfortableConsonantCluster:At,isConsonant:ye,isVowel:O,fixUncomfortableEndCluster:Rt,containsVowels:S,separateFinalConsonants:Ut,separateFinalVowels:Bt,runPhases:Gt}=p(),{baseVowels:P,longVowels:Ht,nasalVowels:ve,longNasalVowels:Ie,overlongVowels:Zt,longVowelVariantOf:k}=g(),Pe=new RegExp(`(${P.join("|")})`,"g"),Se=new RegExp(`(${Zt.join("|")})`,"g"),Me=new RegExp(`(${ve.join("|")})`,"g"),Dt=new RegExp(`(${Ie.join("|")})`,"g"),Jt=e=>{let t=B(e);return t.map((n,s)=>{let r=t[s+1]??"",i=n;return Se.test(r)&&(i=n.replace(Pe,(o,c)=>k(c)).replace(Me,(o,c)=>k(c))),i.replace(Se,(o,c)=>k(c))}).join("")},Kt=e=>{let t=e.replace(/aih?/g,"\u0101").replace(/anh/g,"\u0101").replace(/auh?/g,"\u0254").replace(/ouh?/g,"\u014D").replace(/[æe]nh/,"\u0113").replace(/(ehu|euh|eu|ewu|ew)/g,"\u012B").replace(/ēa/g,"\u0101").replace(/ēǭ/g,"\u0101").replace(/iuh?/g,"\u0233").replace(/jj/g,"j").replace(/ōu/g,"\u014D"),n=t.match(/iw/);return n&&ye(t.charAt(n.index+2))?t.replace(/iw/,"\u0233"):t},Xt=e=>{let t=[/wijaną$/,/ijaną$/,/janą$/,/hwaną$/,/waną$/,/āną$/,/aną$/,/ōną$/,/oną$/,/ną$/];for(let n of t){let s=e.replace(n,"");if(S(s)&&e!==s)return s+"an"}return e},Qt=(e,t)=>{if(t.isFalseVerb)return e;let n=Xt(e);if(n===e)return n;let s=n.slice(0,-2);return O(y(s))?y(s)==="\u0101"?ke(s)+"ahan":s+"han":n},Yt=e=>{let t=y(B(e)),[n]=Ut(t),[s,r]=Bt(n);return P.includes(r)},qe=e=>{if(!Yt(e))return e;let t=B(e),n=y(t);return ke(t).join("")+n.replace(Pe,(r,i)=>k(i))},es=e=>/wij(ō|ǭ)$/.test(e)?e.replace(/wij(ō|ǭ)$/,O(e.slice(-5)[0])?"wa":"a"):/hij(ō|ǭ)$/.test(e)?e.replace(/hij(ō|ǭ)$/,"a"):/ij(ō|ǭ)$/.test(e)?e.replace(/ij(ō|ǭ)$/,S(e.slice(0,-3))?"":"\u012B"):/w(ō|ǭ)$/.test(e)?e.replace(/w(ō|ǭ)$/,O(e.slice(-3)[0])?"wa":""):/j(ō|ǭ)$/.test(e)?e.replace(/j(ō|ǭ)$/,""):/(ō|ǭ)$/.test(e)?e.replace(/(ō|ǭ)$/,Nt.includes(e.slice(-2)[0])?"a":""):/wij(o|ǫ)$/.test(e)?e.replace(/wij(o|ǫ)$/,O(e.slice(-5)[0])?"wa":"a"):/ij(o|ǫ)$/.test(e)?e.replace(/ij(o|ǫ)$/,""):/w(o|ǫ)$/.test(e)?e.replace(/w(o|ǫ)$/,""):/j(o|ǫ)$/.test(e)?e.replace(/j(o|ǫ)$/,""):/(ǫ|o)$/.test(e)?e.replace(/(ǫ|o)$/,""):/wijā$/.test(e)?e.replace(/wijā$/,O(e.slice(-5)[0])?"wa":"a"):/ijā$/.test(e)?e.replace(/ijā$/,S(e.slice(0,-3))?"":"\u012B"):/wā$/.test(e)?e.replace(/wā$/,S(e.slice(0,-2))?"":"v\u0101"):/jā$/.test(e)?e.replace(/jā$/,""):/ā$/.test(e)?e.replace(/ā$/,S(e.slice(0,-1))?"":"\u0101"):/wij(a|ą)$/.test(e)?e.replace(/wij(a|ą)$/,O(e.slice(-5)[0])?"wa":"a"):/ij(a|ą)$/.test(e)?e.replace(/ij(a|ą)$/,""):/w(a|ą)$/.test(e)?e.replace(/w(a|ą)$/,S(e.slice(0,-2))?"":"\u0101"):/j(a|ą)$/.test(e)?e.replace(/j(a|ą)$/,S(e.slice(0,-2))?"":"ja"):/(ą|a)$/.test(e)?e.replace(/(ą|a)$/,""):/į$/.test(e)?e.replace(/į$/,"a"):/i$/.test(e)?e.replace(/i$/,""):/u$/.test(e)?e.replace(/u$/,"a"):/hw$/.test(e)?ye(e.slice(-3)[0])?e.replace(/hw$/,""):qe(e.replace(/hw$/,"")):/w$/.test(e)&&O(e.slice(-2)[0])?qe(e.replace(/w$/,"")):e,ns=e=>e.replace(Me,(t,n)=>P[ve.indexOf(n)]).replace(Dt,(t,n)=>Ht[Ie.indexOf(n)]),ts=e=>e.replace(/(lz|zl)/g,"ll"),ss=e=>e.replace(/.(mf|nf)$/,()=>{let t=y(e.slice(0,-2));return P.includes(t)?k(t)+"f":t+"f"}),rs=e=>At(e)?Rt(e):e;de.exports=(e,t)=>Gt(e,t,[Kt,Jt,Qt,es,ns,ts,ss,rs])});var Le=u((Qr,We)=>{var{allButLastOf:is,lastOf:Te,isConsonant:G,endsWithUncomfortableConsonantCluster:os,fixUncomfortableEndCluster:as,runPhases:ls,containsVowels:M}=p(),{baseVowels:cs,longVowelVariantOf:us}=g(),ps=e=>{let t=Te(e),n=Te(is(e));return t==="s"&&n!=="s"&&n!=="h"&&G(n)?e.slice(0,-1):/iwaz$/.test(e)?e.replace(/iwaz$/,"a"):/ijaz$/.test(e)?e.replace(/ijaz$/,M(e.slice(0,-4))?"":"\u012B"):/waz$/.test(e)?e.replace(/waz$/,G(e.slice(-4)[0])?"a":""):/az$/.test(e)?e.replace(/az$/,M(e.slice(0,-2))?"":"az"):/iwiz$/.test(e)?e.replace(/iwiz$/,G(e.slice(-5)[0])?"a":""):/īz$/.test(e)?e.replace(/īz$/,"\u012B"):/iz$/.test(e)?e.replace(/iz$/,M(e.slice(0,-2))?"":"iz"):/ūz$/.test(e)?e.replace(/ūz$/,"\u016B"):/uz$/.test(e)?e.replace(/uz$/,M(e.slice(0,-2))?"":"uz"):e},fs=e=>e.replace(/hs/,"ks").replace(/[^z]?z/g,t=>{let[n]=t.split("");return cs.includes(n)?us(n)+"r":n+"r"}),gs=e=>os(e)?as(e):e;We.exports=(e,t)=>ls(e,t,[ps,fs,gs])});var Ee=u((Yr,Fe)=>{var{lastOf:hs,firstOf:$s,isVowel:we,runPhases:Cs}=p(),ms=e=>{let t=e.split(/dw/);return t.map((n,s)=>{let r=t[s+1];if(!r)return n;let i=hs(n),o=$s(r);return!we(i)||!we(o)?n:n+"w"}).join("")};Fe.exports=(e,t)=>Cs(e,t,[ms])});var Ge=u((ei,Be)=>{var Vs=z(),{firstOf:Ne,lastOf:d,isVowel:H,separateFinalVowels:Re,allButLastOf:Ue,isConsonant:Ae,runPhases:xs,separateInitialConsonants:js}=p(),{longVowelVariantOf:bs,shortVowelVariantOf:zs,baseVowels:Os,longVowels:Ss,longNasalVowels:qs}=g(),ks=e=>{let t="";for(let n=0;n<e.length;n++){let s=e[n];if(Ss.includes(s)||qs.includes(s)){let[r,i]=js(e.slice(n+1)),o=r.length;if(o>=2){t+=zs(s),t+=r,n+=o;continue}}t+=s}return t},ys=e=>{let[t,n]=e.endsWith("an")?[!0,e.slice(0,-2)]:[!1,e],s=Vs(n);if(s.length<3)return e;let r=Ne(s),i=s[1],o=d(s),c=Ne(i),[x,q]=Re(o),j=d(x),L=r+c+j+q;return t?L+"an":L},vs=e=>{if(!/nan$/.test(e))return e;let t=e.slice(0,-3);return Os.includes(d(t))?Ue(t)+"nan":e},Is=e=>{let t=!1;return e.split("").reduce((n,s,r,i)=>{let o=i[r+1],c=H(o);if(t&&H(s))return c||(t=!1),n;if(s!=="w")return n+s;let x=d(n);if(!H(x)||!c)return n+s;t=!0;let[q,j]=Re(n);return j.length>1?n:Ue(n)+bs(j)},"")},Ps=e=>{let t="";for(let n=0;n<e.length;n++){let s=e[n],r=e[n+1],i=e[n+2];s==="d"&&r==="g"&&!Ae(i)?(t+="gg",n++):s==="t"&&r==="g"&&!Ae(i)?(t+="kk",n++):t+=s}return t.replace(/ngt/g,"nt")};Be.exports=(e,t)=>xs(e,t,[ks,ys,vs,Is,Ps])});var Ke=u((ni,Je)=>{var{fricatives:He,pgmcStops:Ms}=b(),{firstOf:Ze,lastOf:_,isVowel:De,isConsonant:T,runPhases:ds}=p(),_s=e=>e.split("").reduce((t,n,s,r)=>{let i=_(t),o=r[s+1];return n==="b"&&o!=="b"&&De(i)?t+"v":t+n},""),Ts=e=>e.split("").reduce((t,n)=>{let s=_(t);return n==="b"&&T(s)&&s!=="b"?t+"f":t+n},""),Ws=e=>e.split("").reduce((t,n,s,r)=>{let i=r[s+1];return n==="d"&&He.includes(i)?t+"t":t+n},""),Ls=e=>e.split("").reduce((t,n)=>{let s=_(t);return He.includes(n)&&s==="f"&&n!=="f"?t:t+n},""),ws=e=>e.replace(/(g|k)s/g,"x"),Fs=e=>Ze(e)==="h"&&T(e[1])?e.slice(1):e,Es=e=>e.split("").reduce((t,n,s,r)=>{let i=r[s+1];return n==="h"&&T(i)&&!/[lr]/.test(i)?t+"k":t+n},""),Ns=e=>e.replace(/þ/g,"d"),As=e=>e.split("").reduce((t,n,s,r)=>{let i=_(t),o=r[s+1];return i==="s"&&n==="k"&&(De(o)||Ms.includes(o))?t+"h":t+n},"").replace(/tsk/g,"tsh"),Rs=e=>Ze(e)==="w"&&T(e[1])?e.slice(1):e,Us=e=>e.replace(/w/g,"v");Je.exports=(e,t)=>ds(e,t,[_s,Ts,Ws,Ls,ws,Fs,Es,Ns,As,Rs,Us])});var sn=u((ti,tn)=>{var Qe=z(),Bs=Ke(),{isVowel:Gs,firstOf:Ye,lastOf:Z,allButLastOf:Xe,removeVowels:Hs,separateFinalConsonants:Zs,separateInitialConsonants:Ds,separateFinalVowels:Js,endsWithUncomfortableConsonantCluster:Ks,containsVowels:Xs,runPhases:Qs,dedoubleConsonantsInCluster:Ys}=p(),{baseVowels:en,longVowels:er,longVowelVariantOf:nn,shortVowelVariantOf:nr,finalSpellingOf:l}=g(),{pgmcApproximants:tr}=b(),sr=new RegExp(`(${en.join("|")})`,"g"),rr=new RegExp(`(${er.join("|")})w`,"g"),ir=e=>e.replace(/ǣw$/,"\u0153").replace(/æw/,"au"),or=e=>{let t=e,n=Gs(Z(Xe(e)));if(/w$/.test(t)&&n){t=Xe(t);let[s,r]=Js(t);r.length===1&&en.includes(r)&&(t=t.replace(sr,(i,o)=>nn(o)))}return t.replace(rr,(s,r)=>nr(r)+"w")},ar=e=>{let t=e.endsWith("an"),n=Qe(e.replace(/an$/,""));if(n.length<2)return e;let s=n[1],r=n[2]??"",[i,o]=Zs(s),[c,x]=Ds(r);if(!o.length&&!c.length)return e;let q=Ye(n)+Hs(s)+n.slice(2).join("");return Ks(q)?e:q+(t?"an":"")},lr=e=>{let t=Qe(e);return Ye(t)+t.slice(1).map(n=>n.replace(/ā/g,"a").replace(/ē/g,"e").replace(/ī/g,"i").replace(/ō/g,"o").replace(/œ/g,"\xF8").replace(/ɔ/g,"a").replace(/ū/g,"u").replace(/ȳ/g,"y")).join("")},cr=e=>Ys(e),ur=e=>e.replace(/au/g,"au").replace(/j?a$/,(t,n,s)=>{let r=s.slice(0,-1);return Z(r)==="j"?"ja":Xs(r)?l("a"):l("\u0254")}).replace(/a/g,l("a")).replace(/æ/g,l("\xE6")).replace(/e/g,l("e")).replace(/i/g,l("i")).replace(/o/g,l("o")).replace(/ø/g,l("\xF8")).replace(/y/g,l("y")).replace(/ā/g,(t,n,s)=>s[n+1]?l("\u0101"):l("\u0254")).replace(/ǣ/g,l("\u01E3")).replace(/ē/g,l("\u0113")).replace(/ī/g,l("\u012B")).replace(/ō/g,(t,n,s)=>tr.includes(s[n+1])?l("\u0153"):l("\u014D")).replace(/œ/g,l("\u0153")).replace(/ɔ/g,l("\u0254")).replace(/ū/g,l("\u016B")).replace(/ȳ/g,l("\u0233")),pr=e=>e.replace(/eir$/,"eer"),fr=e=>e.replace(/[aeioøuy]g[dtþ]/g,t=>{let n=t[0],s=Z(t);return nn(n)+s});tn.exports=(e,t)=>Qs(e,t,[ir,or,ar,fr,lr,Bs,cr,ur,pr])});var on=u((si,rn)=>{var{runPhases:gr}=p(),hr={bagmaz:"baumaz",kweman\u0105:"kuman\u0105",nur\u00FEr\u0105:"nur\xFE\u0105",sun\u00FEr\u0105:"s\u016B\xFE\u0105",w\u014Ddanaz:"wudanaz"},$r=e=>hr[e]||e;rn.exports=(e,t)=>gr(e,t,[$r])});var ln=u((ri,an)=>{var{runPhases:Cr}=p(),mr=e=>e.replace(/ą̄/g,"\u0101").replace(/į̄/g,"\u012F").replace(/į̄/g,"\u012F").replace(/ǫ̂/g,"\u01ED").replace(/ų̄/g,"\u0173");an.exports=(e,t)=>Cr(e,t,[mr])});var un=u((ii,cn)=>{cn.exports=["akran\u0105","aljan\u0105","bain\u0105","barn\u0105","baukn\u0105","bragn\u0105","faikn\u0105","gaman\u0105","garn\u0105","herzn\u0105","h\u014Dn\u0105","hurn\u0105","\u012Bsarn\u0105","kitt\u012Bn\u0105","kurn\u0105","laihn\u0105","lakan\u0105","laun\u0105","l\u012Bn\u0105","magin\u0105","main\u0105","mulkn\u0105","ragin\u0105","rahn\u0105","razn\u0105","regn\u0105","skarn\u0105","streun\u0105","sw\u012Bn\u0105","taikn\u0105","teun\u0105","tin\u0105","t\u016Bn\u0105","w\u0113pn\u0105","w\u012Bn\u0105","wulkan\u0105","wulkn\u0105"]});var fn=u((oi,pn)=>{var Vr=z(),{runPhases:xr,firstOf:jr,dedoubleConsonantsInCluster:br}=p(),{finalOrthography:W}=g(),{allConsonants:zr}=b(),Or=e=>{let t=Vr(e);return jr(t)+t.slice(1).map(n=>W.longVowels.reduce((s,r)=>s.replace(r,W.longToShort[r]),n)).join("")},Sr=e=>W.longVowels.reduce((t,n)=>{let s=new RegExp(`${n}[${zr.join("")}]{2}`,"g");return t.replace(s,r=>{let i=r.slice(0,2),o=r.slice(2);return W.longToShort[i]+o})},e),qr=e=>br(e);pn.exports=(e,t)=>xr(e,t,[Or,Sr,qr])});var Fr=u((ai,Cn)=>{var{lastOf:$}=p(),kr=Ce(),yr=je(),vr=Oe(),Ir=_e(),Pr=Le(),Mr=Ee(),dr=Ge(),_r=sn(),Tr=on(),Wr=ln(),Lr=un(),wr=fn(),{ipaifyFinalOrthography:gn}=g(),hn=e=>{let t=e.toLowerCase().replace(/^\*/,""),n={},s=[];return Lr.includes(t)&&(n.isFalseVerb=!0),s.push({step:"Massage Known Outliers",result:Tr(t,n)}),s.push({step:"Sanitize Phonology",result:Wr($(s).result,n)}),s.push({step:"I-Mutation",result:kr($(s).result,n)}),s.push({step:"A-Mutation",result:yr($(s).result,n)}),s.push({step:"Gemination",result:vr($(s).result,n)}),s.push({step:"Vowel Laxing",result:Ir($(s).result,n)}),s.push({step:"Z-Loss",result:Pr($(s).result,n)}),s.push({step:"West-Germanic Hardening",result:Mr($(s).result,n)}),s.push({step:"Syllable Reduction",result:dr($(s).result,n)}),s.push({step:"Modernization",result:_r($(s).result,n)}),s},$n=e=>{let t=e.split(":").map(i=>i.trim());if(t.length===1){let i=hn(t[0]),o=$(i).result;return{isCompound:!1,input:e,steps:i,output:o,outputComponents:null,outputIPA:gn(o)}}let n=t.map(i=>$(hn(i)).result),s=n.join(""),r=wr(s);return{isCompound:!0,input:t,steps:null,output:r,outputComponents:n,outputIPA:gn(r)}};typeof window<"u"&&(window.norlunda=$n);Cn.exports=$n});Fr();})();
