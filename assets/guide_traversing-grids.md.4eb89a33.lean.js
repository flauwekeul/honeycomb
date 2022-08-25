var Os=Object.defineProperty;var Ws=(s,n,a)=>n in s?Os(s,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[n]=a;var rs=(s,n,a)=>(Ws(s,typeof n!="symbol"?n+"":n,a),a),ps=(s,n,a)=>{if(!n.has(s))throw TypeError("Cannot "+a)};var f=(s,n,a)=>(ps(s,n,"read from private field"),a?a.call(s):n.get(s)),O=(s,n,a)=>{if(n.has(s))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(s):n.set(s,a)},cs=(s,n,a,e)=>(ps(s,n,"write to private field"),e?e.call(s,a):n.set(s,a),a);var x=(s,n,a)=>(ps(s,n,"access private method"),a);import{e as os,o as E,c as H,_ as ls,f as ys,b as y,u as c,t as ms,n as Hs,r as gs,F as fs,g as vs,p as Rs,h as Vs,i as _s,j as F,w as Bs,a as h,d as b}from"./app.bc887c6d.js";const T=s=>Number.isFinite(s)&&!Number.isNaN(s),Z=s=>typeof s=="object"&&s!==null,Ms=s=>typeof s=="function",k=s=>Z(s)&&T(s.col)&&T(s.row),Ls=s=>Z(s)&&T(s.x)&&T(s.y),ss=s=>Array.isArray(s)&&T(s[0])&&T(s[1]),ts=(s,n)=>n+s*(n&1)>>1;function $s(s,n){return(s%n+n)%n}const ks=(s,n)=>$s(s+n,8),ns=([s,n,a=-s-n])=>({q:s,r:n,s:a});function Y({q:s,r:n,s:a}){const e=T(s),o=T(n),l=T(a);if(e&&o&&l)return{q:s,r:n,s:a};if(e&&o)return{q:s,r:n,s:-s-n};if(e&&l)return{q:s,r:-s-a,s:a};if(o&&l)return{q:-n-a,r:n,s:a};throw new TypeError(`Can't determine three cube coordinates from less than two coordinates. Received: { q: ${s}, r: ${n}, s: ${a} }.`)}var q=(s=>(s.FLAT="FLAT",s.POINTY="POINTY",s))(q||{});function Ys(s,n){if(Z(s)&&s.xRadius>0&&s.yRadius>0)return s;if(Z(s)&&s.width>0&&s.height>0){const{width:a,height:e}=s;return n===q.POINTY?{xRadius:a/Math.sqrt(3),yRadius:e/2}:{xRadius:a/2,yRadius:e/Math.sqrt(3)}}if(s>0)return{xRadius:s,yRadius:s};throw new TypeError(`Invalid dimensions: ${JSON.stringify(s)}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`)}function zs(s,n){if(Ls(s))return s;if(!n)throw new TypeError(`Supply a bounding box ({ width: number, height: number }). Received: ${JSON.stringify(n)}`);if(s==="topLeft")return{x:n.width*-.5,y:n.height*-.5};throw new TypeError(`Invalid origin: ${JSON.stringify(s)}. Origin must be expressed as a Point ({ x: number, y: number }) or the string 'topLeft'.`)}class bs{constructor(n=[0,0]){rs(this,"q");rs(this,"r");const{q:a,r:e}=z(this,n);this.q=a,this.r=e}get center(){const{width:n,height:a,x:e,y:o}=this;return{x:n/2-e,y:a/2-o}}get col(){return Cs(this).col}get corners(){const{orientation:n,width:a,height:e,x:o,y:l}=this;return n===q.POINTY?js(a,e,o,l):Js(a,e,o,l)}get dimensions(){return L.dimensions}get height(){const{orientation:n,dimensions:{yRadius:a}}=this;return n===q.POINTY?a*2:a*Math.sqrt(3)}get isFlat(){return this.orientation===q.FLAT}get isPointy(){return this.orientation===q.POINTY}get orientation(){return L.orientation}get origin(){return L.origin}get offset(){return L.offset}get row(){return Cs(this).row}get width(){const{orientation:n,dimensions:{xRadius:a}}=this;return n===q.POINTY?a*Math.sqrt(3):a*2}get x(){return xs(this).x}get y(){return xs(this).y}get s(){return-this.q-this.r}clone(n=this){return new this.constructor(n)}equals(n){return Ks(this,k(n)?Ps(this,n):n)}toString(){return`${this.constructor.name}(${this.q},${this.r})`}translate(n){return Xs(this,n)}}const L={dimensions:{xRadius:1,yRadius:1},orientation:q.POINTY,origin:{x:0,y:0},offset:-1},js=(s,n,a,e)=>[{x:a+s*.5,y:e-n*.25},{x:a+s*.5,y:e+n*.25},{x:a,y:e+n*.5},{x:a-s*.5,y:e+n*.25},{x:a-s*.5,y:e-n*.25},{x:a,y:e-n*.5}],Js=(s,n,a,e)=>[{x:a+s*.25,y:e-n*.5},{x:a+s*.5,y:e},{x:a+s*.25,y:e+n*.5},{x:a-s*.25,y:e+n*.5},{x:a-s*.5,y:e},{x:a-s*.25,y:e-n*.5}];function qs(s){const{dimensions:n,orientation:a,origin:e,offset:o}={...L,...s};return class extends bs{get dimensions(){return Ys(n,a)}get orientation(){return a}get origin(){return zs(e,this)}get offset(){return o}}}function Ks(s,n){if(k(s)&&k(n))return s.col===n.col&&s.row===n.row;if(Object.hasOwn(s,"col")||Object.hasOwn(n,"col"))throw new Error(`Can't compare coordinates where one are offset coordinates. Either pass two offset coordinates or two axial/cube coordinates. Received: ${JSON.stringify(s)} and ${JSON.stringify(n)}`);const a=ss(s)?ns(s):s,e=ss(n)?ns(n):n;return a.q===e.q&&a.r===e.r}const Qs=(s,n,a)=>({col:s+ts(a,n),row:n}),Us=(s,n,a)=>({col:s,row:n+ts(a,s)}),Cs=({q:s,r:n,offset:a,isPointy:e})=>e?Qs(s,n,a):Us(s,n,a),xs=({orientation:s,dimensions:{xRadius:n,yRadius:a},origin:{x:e,y:o},q:l,r:t})=>s===q.POINTY?{x:n*Math.sqrt(3)*(l+t/2)-e,y:a*3/2*t-o}:{x:n*3/2*l-e,y:a*Math.sqrt(3)*(t+l/2)-o},Is=(s,n,a)=>{const e=s-ts(a,n),o=n,l=-e-o;return{q:e,r:o,s:l}},Ns=(s,n,a)=>{const e=s,o=n-ts(a,s),l=-e-o;return{q:e,r:o,s:l}},Ps=({offset:s,isPointy:n},{col:a,row:e})=>n?Is(a,e,s):Ns(a,e,s),As=s=>{const{q:n,r:a,s:e}=Y(s);let o=Math.round(n),l=Math.round(a),t=Math.round(e);const r=Math.abs(n-o),p=Math.abs(a-l),C=Math.abs(e-t);return r>p&&r>C?o=-l-t:p>C?l=-o-t:t=-o-l,{q:o,r:l,s:t}},Gs=({dimensions:{xRadius:s,yRadius:n},origin:a,isPointy:e},{x:o,y:l})=>(o+=a.x,l+=a.y,As(e?{q:Math.sqrt(3)*o/(3*s)-l/(3*n),r:2/3*(l/n)}:{q:2/3*(o/s),r:Math.sqrt(3)*l/(3*n)-o/(3*s)}));function z(s,n){return ss(n)?ns(n):k(n)?Ps(s,n):Y(n)}function Xs(s,n){const{q:a,r:e,s:o}=Y(s),{q:l,r:t,s:r}=Y(n),p={q:a+l,r:e+t,s:o+r};return s instanceof bs?s.clone(p):p}function as(s,n,a){const{q:e,r:o,s:l}=z(s,n),{q:t,r,s:p}=z(s,a);return Math.max(Math.abs(e-t),Math.abs(o-r),Math.abs(l-p))}var Ds=(s=>(s.CLOCKWISE="CLOCKWISE",s.COUNTERCLOCKWISE="COUNTERCLOCKWISE",s))(Ds||{}),i=(s=>(s[s.N=0]="N",s[s.NE=1]="NE",s[s.E=2]="E",s[s.SE=3]="SE",s[s.S=4]="S",s[s.SW=5]="SW",s[s.W=6]="W",s[s.NW=7]="NW",s))(i||{});const Zs=[null,{q:1,r:-1},{q:1,r:0},{q:0,r:1},null,{q:-1,r:1},{q:-1,r:0},{q:0,r:-1}],sn=[{q:0,r:-1},{q:1,r:-1},null,{q:1,r:0},{q:0,r:1},{q:-1,r:1},null,{q:-1,r:0}],nn=({offset:s,q:n,r:a,col:e,row:o},l)=>{if(l===i.S||l===i.N){const r=l===i.S?o+1:o-1;return Is(e,r,s)}const t=Zs[l];return{q:n+t.q,r:a+t.r}},an=({offset:s,q:n,r:a,col:e,row:o},l)=>{if(l===i.E||l===i.W){const r=l===i.E?e+1:e-1;return Ns(r,o,s)}const t=sn[l];return{q:n+t.q,r:a+t.r}},j=(s,n)=>s.clone(s.isPointy?nn(s,n):an(s,n));function J(s){return Array.isArray(s)?function(a,e){const o=[];let l=e;for(const t of s)for(const r of t(a,l))o.push(l=r);return o}:s}const X=(...s)=>n=>s.map(n);function A(s){return en(s)?on(s):ln(s)}function en(s){return s.direction in i}function on({start:s,direction:n,length:a}){return function(o,l){const t=[];let p=o(s!=null?s:l);!s&&l&&(p=j(p,n));for(let C=0;C<a;C++)t.push(p),p=j(p,n);return t}}function ln({start:s,stop:n}){return function(e,o){const l=[],t=e(s!=null?s:o),r=Ts(t),p=Ts(z(t,n)),C=tn(r,p),u=as(t,t,n),_=1/Math.max(u,1);let m=!s&&o?1:0;for(m;m<=u;m++){const D=As(C(_*m));l.push(e(D))}return l}}function Ts({q:s,r:n,s:a}){return{q:s+1e-6,r:n+1e-6,s:a+-2e-6}}function tn(s,n){return a=>{const e=s.q*(1-a)+n.q*a,o=s.r*(1-a)+n.r*a;return{q:e,r:o}}}const B=s=>(n,a)=>[j(n(a),s)];function es(s,n,{includeSource:a=!0}={}){return function(o,l){const t=[];for(const r of J(s)(o,l)){a&&t.push(r);for(const p of J(n)(o,r))t.push(p)}return t}}function M(s,n){return function(e,o){const{width:l,height:t,start:r,direction:p=i.E}=n?rn(s,n,e()):s,C=e(r!=null?r:o),u=es(A({start:C,direction:ks(p,2),length:t}),A({direction:p,length:l-1}))(e,C);return!r&&o?u.slice(1):u}}function rn(s,n,{isPointy:a,offset:e}){const{col:o,row:l}=ws(s,a,e),{col:t,row:r}=ws(n,a,e),p=o<t?"A":"B",C=l<r?"A":"B",u=p+C,{swapWidthHeight:_,direction:m}=pn[u],D=Math.abs(o-t)+1,w=Math.abs(l-r)+1;return{width:_?w:D,height:_?D:w,start:s,direction:m}}function ws(s,n,a){if(k(s))return s;const{q:e,r:o}=ss(s)?ns(s):Y(s);return Cs({q:e,r:o,isPointy:n,offset:a})}const pn={AA:{swapWidthHeight:!1,direction:i.E},AB:{swapWidthHeight:!0,direction:i.N},BA:{swapWidthHeight:!0,direction:i.S},BB:{swapWidthHeight:!1,direction:i.W}};function Ss(s,n){return J(Array.from({length:s},()=>J(n)))}function cn(s){const{center:n,rotation:a=Ds.CLOCKWISE}=s;return function(o,l){var R;const t=a.toUpperCase(),r=[];let{radius:p}=s,C;T(p)?C=o(n).translate({q:p,s:-p}):(C=o((R=s.start)!=null?R:l),p=as(C,n,C));const{q:u,r:_,s:m}=z(C,n);let D=o({q:u,r:_-p,s:m+p});if(t===Ds.CLOCKWISE)for(let g=0;g<6;g++)for(let P=0;P<p;P++){const{q:V,r:G}=Es[g];D=o({q:D.q+V,r:D.r+G}),r.push(D)}else for(let g=5;g>=0;g--)for(let P=0;P<p;P++){const{q:V,r:G}=Es[g];D=o({q:D.q-V,r:D.r-G}),r.push(D)}const w=!s.start&&l,S=r.findIndex(g=>g.equals(C));return r.slice(S+(w?1:0)).concat(r.slice(0,S))}}const Es=[{q:1,r:0},{q:0,r:1},{q:-1,r:1},{q:-1,r:0},{q:0,r:-1},{q:1,r:-1}];function is({radius:s,start:n,rotation:a}){return function(o,l){const t=o(n!=null?n:l),r=!n&&l?s:s+1;return es(A({start:n,direction:i.N,length:r}),cn({center:t,rotation:a}))(o,l)}}var v,N,W,$,K,ds,Q,hs,U,us;const I=class{constructor(n,a=[]){O(this,W);O(this,K);O(this,Q);O(this,U);O(this,v,void 0);O(this,N,new Map);if(n instanceof I){cs(this,v,f(n,v)),this.setHexes(n);return}cs(this,v,n),this.setHexes(x(this,K,ds).call(this,a))}static fromIterable(n){const a=n[Symbol.iterator]().next().value;if(!a)throw new TypeError(`Can't create grid from empty iterable: ${JSON.stringify(n)}`);return new I(a.constructor,n)}static fromJSON({hexSettings:n,coordinates:a}){const e=qs(n);return new I(e,a.map(o=>new e(o)))}get size(){return f(this,N).size}get pixelWidth(){if(this.size===0)return 0;const{isPointy:n,width:a}=this.hexPrototype,e=this.toArray(),{0:o,length:l,[l-1]:t}=n?e.sort((r,p)=>p.s-r.s||r.q-p.q):e.sort((r,p)=>r.q-p.q);return t.x-o.x+a}get pixelHeight(){if(this.size===0)return 0;const{isPointy:n,height:a}=this.hexPrototype,e=this.toArray(),{0:o,length:l,[l-1]:t}=n?e.sort((r,p)=>r.r-p.r):e.sort((r,p)=>p.s-r.s||r.r-p.r);return t.y-o.y+a}[Symbol.iterator](){return f(this,N).values()}get hexPrototype(){return f(this,v).prototype}createHex(n){return new(f(this,v))(n)}getHex(n){const a=this.createHex(n);return f(this,N).get(a.toString())}hasHex(n){return f(this,N).has(n.toString())}setHexes(n){for(const a of n){const e=a instanceof bs?a:new(f(this,v))(a);x(this,W,$).call(this,e)}return this}filter(n){var e;const a=new I(f(this,v));for(const o of this)n(o)&&x(e=a,W,$).call(e,o);return a}map(n){var e;const a=new I(f(this,v));for(const o of this)x(e=a,W,$).call(e,n(o));return a}traverse(n,{bail:a=!1}={}){var o;const e=new I(f(this,v));for(const l of x(this,K,ds).call(this,n)){const t=this.getHex(l);if(t)x(o=e,W,$).call(o,t);else if(a)return e}return e}forEach(n){for(const a of this)n(a);return this}reduce(n,a){if(a===void 0){let o,l,t;for(const r of this)l=t,t=r,l&&(o=n(l,t));return o}let e=a;for(const o of this)e=n(e,o);return e}toArray(){return Array.from(this)}toJSON(){const{dimensions:n,orientation:a,origin:e,offset:o}=this.hexPrototype;return{hexSettings:{dimensions:n,orientation:a,origin:e,offset:o},coordinates:this.toArray()}}toString(){return`${this.constructor.name}(${this.size})`}pointToHex(n,{allowOutside:a=!0}={}){const e=Gs(this.hexPrototype,n);return a?this.createHex(e):this.getHex(e)}distance(n,a,{allowOutside:e=!0}={}){if(e)return as(this.hexPrototype,n,a);const o=this.getHex(n),l=this.getHex(a);if(!(!o||!l))return as(this.hexPrototype,o,l)}neighborOf(n,a,{allowOutside:e=!0}={}){if(e)return j(this.createHex(n),a);const o=this.getHex(n);if(!!o)return this.getHex(j(o,a))}};let Fs=I;v=new WeakMap,N=new WeakMap,W=new WeakSet,$=function(n){f(this,N).set(n.toString(),n)},K=new WeakSet,ds=function(n){return x(this,Q,hs).call(this,n)?x(this,U,us).call(this,n):Array.isArray(n)&&x(this,Q,hs).call(this,n[0])?x(this,U,us).call(this,J(n)):n},Q=new WeakSet,hs=function(n){return Ms(n)},U=new WeakSet,us=function(n){return n(this.createHex.bind(this))};const yn=["x1","y1","x2","y2"],Cn=os({__name:"Line",props:{from:null,to:null},setup(s){return(n,a)=>(E(),H("line",{x1:s.from.x,y1:s.from.y,x2:s.to.x,y2:s.to.y,class:"line"},null,8,yn))}});const An=ls(Cn,[["__scopeId","data-v-e86c9a25"]]),Dn=["x1","y1","x2","y2"],Fn=os({__name:"Arrow",props:{from:null,to:null},setup(s){return(n,a)=>(E(),H("line",{x1:s.from.x,y1:s.from.y,x2:s.to.x,y2:s.to.y,"marker-end":"url(#arrow-head)",class:"line"},null,8,Dn))}});const dn=ls(Fn,[["__scopeId","data-v-f6ab7da3"]]),hn=["points"],un=["x","y","font-size"],bn=os({__name:"Tile",props:{tile:null,isTraversed:{type:Boolean}},setup(s){const{tile:n,isTraversed:a}=s,e=n.corners.map(({x:l,y:t})=>`${l},${t}`).join(" "),o=ys(()=>n.height/4);return(l,t)=>(E(),H("g",{class:Hs({"is-traversed":s.isTraversed})},[y("polygon",{points:c(e),class:"polygon"},null,8,hn),y("text",{x:s.tile.x,y:s.tile.y,"font-size":c(o),class:"coordinates"},[y("tspan",null,ms(s.tile.q)+","+ms(s.tile.r),1)],8,un)],2))}});const mn=ls(bn,[["__scopeId","data-v-d238db27"]]),gn=s=>(Rs("data-v-549a522a"),s=s(),Vs(),s),fn=["width","height"],vn=gn(()=>y("defs",null,[y("marker",{id:"arrow-head",markerWidth:"10",markerHeight:"10",refX:"0",refY:"1.5",orient:"auto"},[y("path",{d:"M0,0 L0,3 L2.5,1.5 z",class:"arrow-head"})])],-1)),_n=["transform"],xn=os({__name:"TileGrid",props:{grid:null,traversal:null},setup(s){const{grid:n,traversal:a}=s,e=ys(()=>`translate(${n.hexPrototype.width/2},${n.hexPrototype.height/2})`),o=ys(()=>{var l;return((l=a==null?void 0:a.toArray())!=null?l:[]).reduce((t,r,p,C)=>{const u=C[p+1];if(!u)return t;const{x:_,y:m}=r,{x:D,y:w}=u,S=Math.atan2(w-m,D-_),R={x:_+Math.cos(S)*12,y:m+Math.sin(S)*12},g={x:D-Math.cos(S)*26,y:w-Math.sin(S)*26};return t.concat({from:R,to:g})},[])});return(l,t)=>(E(),H("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:s.grid.pixelWidth,height:s.grid.pixelHeight,class:"container"},[vn,y("g",{transform:c(e)},[gs(l.$slots,"before",{},void 0,!0),(E(!0),H(fs,null,vs(s.grid,r=>{var p;return E(),_s(mn,{key:r.toString(),tile:r,"is-traversed":(p=s.traversal)==null?void 0:p.hasHex(r)},null,8,["tile","is-traversed"])}),128)),(E(!0),H(fs,null,vs(c(o),({from:r,to:p})=>(E(),_s(dn,{from:r,to:p},null,8,["from","to"]))),256)),gs(l.$slots,"default",{},void 0,!0)],8,_n)],8,fn))}});const d=ls(xn,[["__scopeId","data-v-549a522a"]]),Tn=h("",9),wn=y("p",null,[b("When the radius is increased from "),y("code",null,"1"),b(" to "),y("code",null,"2"),b(" it becomes apparent that only the hexes present in "),y("code",null,"grid"),b(' are traversed. You see that the traversal "jumps" from '),y("code",null,"[-2, 4]"),b(" to "),y("code",null,"[0, 0]"),b(":")],-1),Sn=h("",4),En=h("",4),qn=h("",3),In=h("",8),Nn=y("h3",{id:"line",tabindex:"-1"},[y("a",{href:"/honeycomb/api/#line"},[y("code",null,"line()")]),b(),y("a",{class:"header-anchor",href:"#line","aria-hidden":"true"},"#")],-1),Pn=y("p",null,"A line traverser can be created in two ways:",-1),On=h("",2),Wn=y("p",null,[b("When the direction is ambiguous (North and South for pointy hexes, West and East for flat hexes), the next hex is chosen based on the "),y("a",{href:"/honeycomb/api/interfaces/HexSettings#offset"},"offset setting"),b(".")],-1),Hn=h("",2),Rn=y("p",null,"This uses interpolation to determine which hexes are on the line.",-1),Vn=h("",3),Bn=y("p",null,[b("It's equivalent to "),y("code",null,"line({ direction, length: 1 })"),b(" and can be used to make more complex traversers.")],-1),Mn=y("p",null,[b("When the direction is ambiguous (North and South for pointy hexes, West and East for flat hexes), the hex is chosen based on the "),y("a",{href:"/honeycomb/api/interfaces/HexSettings#offset"},"offset setting"),b(".")],-1),Ln=y("h3",{id:"rectangle",tabindex:"-1"},[y("a",{href:"/honeycomb/api/#rectangle"},[y("code",null,"rectangle()")]),b(),y("a",{class:"header-anchor",href:"#rectangle","aria-hidden":"true"},"#")],-1),$n=y("p",null,"A rectangle traverser can be created in two ways:",-1),kn=h("",2),Yn=h("",2),zn={class:"warning custom-block"},jn=h("",3),Jn=h("",2),Kn=h("",3),Qn=h("",2),Un=h("",3),Gn=h("",2),Xn=h("",3),ea=JSON.parse('{"title":"Traversing grids","description":"","frontmatter":{},"headers":[{"level":2,"title":"What is a traverser?","slug":"what-is-a-traverser"},{"level":2,"title":"Bail a traversal","slug":"bail-a-traversal"},{"level":2,"title":"Combining traversers","slug":"combining-traversers"},{"level":2,"title":"Built-in traversers","slug":"built-in-traversers"},{"level":3,"title":"concat()","slug":"concat"},{"level":3,"title":"fromCoordinates()","slug":"fromcoordinates"},{"level":3,"title":"line()","slug":"line"},{"level":3,"title":"move()","slug":"move"},{"level":3,"title":"rectangle()","slug":"rectangle"},{"level":3,"title":"repeat()","slug":"repeat"},{"level":3,"title":"repeatWith()","slug":"repeatwith"},{"level":3,"title":"ring()","slug":"ring"},{"level":3,"title":"spiral()","slug":"spiral"}],"relativePath":"guide/traversing-grids.md","lastUpdated":1661409830000}'),Zn={name:"guide/traversing-grids.md"},oa=Object.assign(Zn,{setup(s){const n=qs({dimensions:30}),a=new Fs(n,M({width:5,height:5})),e=a.traverse(is({start:[0,2],radius:1})),o=a.traverse(is({start:[0,2],radius:2})),l=a.traverse(is({start:[0,2],radius:2}),{bail:!0}),t=a.traverse([A({direction:i.E,length:4}),A({direction:i.S,length:3}),A({direction:i.W,length:3}),A({direction:i.N,length:3})]),r=a.traverse([A({start:[1,1],direction:i.E,length:4}),A({direction:i.S,length:3}),A({direction:i.W,length:3}),A({direction:i.N,length:3})]),p=a.traverse(X([1,3],{q:4,r:0},{col:0,row:2})),C=a.traverse(A({start:[1,0],direction:i.SE,length:4})),u=a.traverse(A({start:[2,0],stop:[1,4]})),_=a.traverse([X([1,1]),B(i.S),B(i.E)]),m=a.traverse(M({start:[1,1],width:3,height:3})),D=a.traverse(M({start:[0,3],width:3,height:3,direction:i.N})),w=a.traverse(M({start:[0,2],width:3,height:3,direction:i.NE})),S=a.traverse(M([-1,4],[3,1])),R=a.traverse([X([2,0]),Ss(3,B(i.SE))]),g=a.traverse([X([1,0]),Ss(2,[A({direction:i.E,length:2}),B(i.S),A({direction:i.W,length:2}),B(i.S)]),A({direction:i.E,length:2})]),P=a.traverse(es(A({start:[1,1],direction:i.S,length:3}),A({direction:i.E,length:2}))),V=a.traverse(es(A({start:[0,1],direction:i.S,length:3}),A({direction:i.E,length:3}),{includeSource:!1}));return(G,sa)=>(E(),H("div",null,[Tn,F(d,{grid:c(a),traversal:c(e)},null,8,["grid","traversal"]),wn,F(d,{grid:c(a),traversal:c(o)},null,8,["grid","traversal"]),Sn,F(d,{grid:c(a),traversal:c(l)},null,8,["grid","traversal"]),En,F(d,{grid:c(a),traversal:c(t)},null,8,["grid","traversal"]),qn,F(d,{grid:c(a),traversal:c(r)},null,8,["grid","traversal"]),In,F(d,{grid:c(a),traversal:c(p)},null,8,["grid","traversal"]),Nn,Pn,y("ul",null,[y("li",null,[On,F(d,{grid:c(a),traversal:c(C)},null,8,["grid","traversal"]),Wn]),y("li",null,[Hn,F(d,{grid:c(a),traversal:c(u)},{default:Bs(()=>[F(An,{from:c(u).getHex([2,0]),to:c(u).getHex([1,4])},null,8,["from","to"])]),_:1},8,["grid","traversal"]),Rn])]),Vn,F(d,{grid:c(a),traversal:c(_)},null,8,["grid","traversal"]),Bn,Mn,Ln,$n,y("ul",null,[y("li",null,[kn,F(d,{grid:c(a),traversal:c(m)},null,8,["grid","traversal"]),Yn,F(d,{grid:c(a),traversal:c(D)},null,8,["grid","traversal"]),y("div",zn,[jn,F(d,{grid:c(a),traversal:c(w)},null,8,["grid","traversal"])])]),y("li",null,[Jn,F(d,{grid:c(a),traversal:c(S)},null,8,["grid","traversal"])])]),Kn,F(d,{grid:c(a),traversal:c(R)},null,8,["grid","traversal"]),Qn,F(d,{grid:c(a),traversal:c(g)},null,8,["grid","traversal"]),Un,F(d,{grid:c(a),traversal:c(P)},null,8,["grid","traversal"]),Gn,F(d,{grid:c(a),traversal:c(V)},null,8,["grid","traversal"]),Xn]))}});export{ea as __pageData,oa as default};
