import{_ as s,c as a,o as n,U as e}from"./chunks/framework.fb79f17b.js";const F=JSON.parse('{"title":"Other grid methods","description":"","frontmatter":{},"headers":[],"relativePath":"guide/other-grid-methods.md","filePath":"guide/other-grid-methods.md","lastUpdated":1665689863000}'),l={name:"guide/other-grid-methods.md"},o=e(`<h1 id="other-grid-methods" tabindex="-1">Other grid methods <a class="header-anchor" href="#other-grid-methods" aria-label="Permalink to &quot;Other grid methods&quot;">​</a></h1><p>This page lists some properties/methods of a grid instance that can be very convenient. For all properties of grids, see the <a href="/honeycomb/api/classes/Grid.html">API docs</a>.</p><h2 id="gethex" tabindex="-1"><a href="/honeycomb/api/classes/Grid.html#getHex"><code>getHex()</code></a> <a class="header-anchor" href="#gethex" aria-label="Permalink to &quot;[\`getHex()\`](/api/classes/Grid#getHex)&quot;">​</a></h2><p>It returns the hex in the grid from the passed hex coordinates or <code>undefined</code> if the hex doesn&#39;t exist in the grid.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> grid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Grid</span><span style="color:#A6ACCD;">(Hex</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rectangle</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHex</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">])             </span><span style="color:#676E95;font-style:italic;">// Hex {q: 0, r: 0}</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHex</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">col</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">row</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// Hex {q: 2, r: 4}</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHex</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">])           </span><span style="color:#676E95;font-style:italic;">// undefined</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="sethexes" tabindex="-1"><a href="/honeycomb/api/classes/Grid.html#setHexes"><code>setHexes()</code></a> <a class="header-anchor" href="#sethexes" aria-label="Permalink to &quot;[\`setHexes()\`](/api/classes/Grid#setHexes)&quot;">​</a></h2><p>This can be used to update (the hexes in) a grid. It accepts an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol" target="_blank" rel="noreferrer">iterable</a> of hex coordinates or hexes, and sets those hexes. Hexes that weren&#39;t present in the grid before are added.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Tile</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineHex</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">dimensions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">terrain</span><span style="color:#89DDFF;">!:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Terrain</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> grid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Grid</span><span style="color:#A6ACCD;">(Tile</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rectangle</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> tilesWithTerrain </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">tile</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">tile</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> terrain</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createTerrain</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">tile</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Tile</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHexes</span><span style="color:#A6ACCD;">(tilesWithTerrain)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Lines 7-11 above could be simplified (at the expense of mutating <code>grid</code> in-place) with <code>forEach()</code>:</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">tile</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">tile</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">terrain</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">createTerrain</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">tile</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="pointtohex" tabindex="-1"><a href="/honeycomb/api/classes/Grid.html#pointToHex"><code>pointToHex()</code></a> <a class="header-anchor" href="#pointtohex" aria-label="Permalink to &quot;[\`pointToHex()\`](/api/classes/Grid#pointToHex)&quot;">​</a></h2><p>When you need to map a point to a hex in a grid, <code>pointToHex()</code> is what you should use. See <a href="/honeycomb/guide/point-to-hex.html">Point → hex</a> for an example.</p><h2 id="distance" tabindex="-1"><a href="/honeycomb/api/classes/Grid.html#distance"><code>distance()</code></a> <a class="header-anchor" href="#distance" aria-label="Permalink to &quot;[\`distance()\`](/api/classes/Grid#distance)&quot;">​</a></h2><p>The <code>distance()</code> method returns the distance (in hexes) between the two passed hex coordinates (excluding the first hex, including the last hex). Just like <code>pointToHex()</code>, it accepts a third argument to indicate if only hexes in the grid are allowed (defaults to <code>false</code>).</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> grid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Grid</span><span style="color:#A6ACCD;">(Hex</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rectangle</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">distance</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">])   </span><span style="color:#676E95;font-style:italic;">// 4</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">distance</span><span style="color:#A6ACCD;">([</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]) </span><span style="color:#676E95;font-style:italic;">// 11</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">distance</span><span style="color:#A6ACCD;">([</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">allowOutside</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// undefined</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="neighborof" tabindex="-1"><a href="/honeycomb/api/classes/Grid.html#neighborOf"><code>neighborOf()</code></a> <a class="header-anchor" href="#neighborof" aria-label="Permalink to &quot;[\`neighborOf()\`](/api/classes/Grid#neighborOf)&quot;">​</a></h2><p>This method returns the adjacent hex from hex coordinates in a particular direction. When the direction is ambiguous (North and South for pointy hexes, West and East for flat hexes), the neighboring hex is chosen based on the <a href="/honeycomb/api/interfaces/HexSettings.html#offset">offset setting</a>. It accepts an optional <code>{ allowOutside }</code> option to limit the result to hexes in the grid. By default <code>allowOutside</code> is <code>true</code> and when the neighboring hex isn&#39;t present in the grid, a new hex is created and returned. When <code>allowOutside</code> is <code>false</code> and the neighboring hex isn&#39;t present in the grid, <code>undefined</code> is returned instead.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> grid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Grid</span><span style="color:#A6ACCD;">(Hex</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rectangle</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">neighborOf</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Direction</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">SW) </span><span style="color:#676E95;font-style:italic;">// Hex {q: 0, r: 3}</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">neighborOf</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Direction</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">N)  </span><span style="color:#676E95;font-style:italic;">// Hex {q: 2, r: 1}</span></span>
<span class="line"><span style="color:#A6ACCD;">grid</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">neighborOf</span><span style="color:#A6ACCD;">([</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Direction</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">E</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">allowOutside</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// undefined</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,18),p=[o];function t(r,c,i,y,C,D){return n(),a("div",null,p)}const d=s(l,[["render",t]]);export{F as __pageData,d as default};
