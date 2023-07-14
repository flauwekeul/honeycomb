import{_ as e,c as a,o as t,U as r}from"./chunks/framework.fb79f17b.js";const b=JSON.parse('{"title":"Class: Hex","description":"","frontmatter":{},"headers":[],"relativePath":"api/classes/Hex.md","filePath":"api/classes/Hex.md","lastUpdated":1689322025000}'),o={name:"api/classes/Hex.md"},n=r('<h1 id="class-hex" tabindex="-1">Class: Hex <a class="header-anchor" href="#class-hex" aria-label="Permalink to &quot;Class: Hex&quot;">​</a></h1><h2 id="implements" tabindex="-1">Implements <a class="header-anchor" href="#implements" aria-label="Permalink to &quot;Implements&quot;">​</a></h2><ul><li><code>Readonly</code>&lt;<a href="./../interfaces/CubeCoordinates.html"><code>CubeCoordinates</code></a>&gt;</li><li><code>Readonly</code>&lt;<a href="./../interfaces/OffsetCoordinates.html"><code>OffsetCoordinates</code></a>&gt;</li><li><code>Readonly</code>&lt;<a href="./../interfaces/Point.html"><code>Point</code></a>&gt;</li><li><code>Readonly</code>&lt;<a href="./../interfaces/BoundingBox.html"><code>BoundingBox</code></a>&gt;</li></ul><h2 id="table-of-contents" tabindex="-1">Table of contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of contents&quot;">​</a></h2><h3 id="constructors" tabindex="-1">Constructors <a class="header-anchor" href="#constructors" aria-label="Permalink to &quot;Constructors&quot;">​</a></h3><ul><li><a href="./Hex.html#constructor">constructor</a></li></ul><h3 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h3><ul><li><a href="./Hex.html#q">q</a></li><li><a href="./Hex.html#r">r</a></li></ul><h3 id="accessors" tabindex="-1">Accessors <a class="header-anchor" href="#accessors" aria-label="Permalink to &quot;Accessors&quot;">​</a></h3><ul><li><a href="./Hex.html#center">center</a></li><li><a href="./Hex.html#col">col</a></li><li><a href="./Hex.html#corners">corners</a></li><li><a href="./Hex.html#dimensions">dimensions</a></li><li><a href="./Hex.html#height">height</a></li><li><a href="./Hex.html#isFlat">isFlat</a></li><li><a href="./Hex.html#isPointy">isPointy</a></li><li><a href="./Hex.html#offset">offset</a></li><li><a href="./Hex.html#orientation">orientation</a></li><li><a href="./Hex.html#origin">origin</a></li><li><a href="./Hex.html#row">row</a></li><li><a href="./Hex.html#s">s</a></li><li><a href="./Hex.html#settings">settings</a></li><li><a href="./Hex.html#width">width</a></li><li><a href="./Hex.html#x">x</a></li><li><a href="./Hex.html#y">y</a></li></ul><h3 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h3><ul><li><a href="./Hex.html#clone">clone</a></li><li><a href="./Hex.html#equals">equals</a></li><li><a href="./Hex.html#toString">toString</a></li><li><a href="./Hex.html#translate">translate</a></li></ul><h2 id="constructors-1" tabindex="-1">Constructors <a class="header-anchor" href="#constructors-1" aria-label="Permalink to &quot;Constructors&quot;">​</a></h2><h3 id="constructor" tabindex="-1"><a id="constructor" name="constructor"></a> constructor <a class="header-anchor" href="#constructor" aria-label="Permalink to &quot;&lt;a id=&quot;constructor&quot; name=&quot;constructor&quot;&gt;&lt;/a&gt; constructor&quot;">​</a></h3><p><strong>new Hex</strong>(<code>coordinates?</code>)</p><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>coordinates</code></td><td style="text-align:left;"><a href="./../#HexCoordinates"><code>HexCoordinates</code></a></td></tr></tbody></table><h4 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L103" target="_blank" rel="noreferrer">hex/hex.ts:103</a></p><h2 id="properties-1" tabindex="-1">Properties <a class="header-anchor" href="#properties-1" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="q" tabindex="-1"><a id="q" name="q"></a> q <a class="header-anchor" href="#q" aria-label="Permalink to &quot;&lt;a id=&quot;q&quot; name=&quot;q&quot;&gt;&lt;/a&gt; q&quot;">​</a></h3><p><code>Readonly</code> <strong>q</strong>: <code>number</code></p><h4 id="implementation-of" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.q</p><h4 id="defined-in-1" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-1" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L100" target="_blank" rel="noreferrer">hex/hex.ts:100</a></p><hr><h3 id="r" tabindex="-1"><a id="r" name="r"></a> r <a class="header-anchor" href="#r" aria-label="Permalink to &quot;&lt;a id=&quot;r&quot; name=&quot;r&quot;&gt;&lt;/a&gt; r&quot;">​</a></h3><p><code>Readonly</code> <strong>r</strong>: <code>number</code></p><h4 id="implementation-of-1" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-1" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.r</p><h4 id="defined-in-2" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-2" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L101" target="_blank" rel="noreferrer">hex/hex.ts:101</a></p><h2 id="accessors-1" tabindex="-1">Accessors <a class="header-anchor" href="#accessors-1" aria-label="Permalink to &quot;Accessors&quot;">​</a></h2><h3 id="center" tabindex="-1"><a id="center" name="center"></a> center <a class="header-anchor" href="#center" aria-label="Permalink to &quot;&lt;a id=&quot;center&quot; name=&quot;center&quot;&gt;&lt;/a&gt; center&quot;">​</a></h3><p><code>get</code> <strong>center</strong>(): <a href="./../interfaces/Point.html"><code>Point</code></a></p><h4 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./../interfaces/Point.html"><code>Point</code></a></p><h4 id="defined-in-3" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-3" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L29" target="_blank" rel="noreferrer">hex/hex.ts:29</a></p><hr><h3 id="col" tabindex="-1"><a id="col" name="col"></a> col <a class="header-anchor" href="#col" aria-label="Permalink to &quot;&lt;a id=&quot;col&quot; name=&quot;col&quot;&gt;&lt;/a&gt; col&quot;">​</a></h3><p><code>get</code> <strong>col</strong>(): <code>number</code></p><h4 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>number</code></p><h4 id="implementation-of-2" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-2" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.col</p><h4 id="defined-in-4" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-4" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L34" target="_blank" rel="noreferrer">hex/hex.ts:34</a></p><hr><h3 id="corners" tabindex="-1"><a id="corners" name="corners"></a> corners <a class="header-anchor" href="#corners" aria-label="Permalink to &quot;&lt;a id=&quot;corners&quot; name=&quot;corners&quot;&gt;&lt;/a&gt; corners&quot;">​</a></h3><p><code>get</code> <strong>corners</strong>(): <a href="./../interfaces/Point.html"><code>Point</code></a>[]</p><h4 id="returns-2" tabindex="-1">Returns <a class="header-anchor" href="#returns-2" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./../interfaces/Point.html"><code>Point</code></a>[]</p><h4 id="defined-in-5" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-5" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L39" target="_blank" rel="noreferrer">hex/hex.ts:39</a></p><hr><h3 id="dimensions" tabindex="-1"><a id="dimensions" name="dimensions"></a> dimensions <a class="header-anchor" href="#dimensions" aria-label="Permalink to &quot;&lt;a id=&quot;dimensions&quot; name=&quot;dimensions&quot;&gt;&lt;/a&gt; dimensions&quot;">​</a></h3><p><code>get</code> <strong>dimensions</strong>(): <a href="./../interfaces/Ellipse.html"><code>Ellipse</code></a></p><h4 id="returns-3" tabindex="-1">Returns <a class="header-anchor" href="#returns-3" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./../interfaces/Ellipse.html"><code>Ellipse</code></a></p><h4 id="defined-in-6" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-6" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L44" target="_blank" rel="noreferrer">hex/hex.ts:44</a></p><hr><h3 id="height" tabindex="-1"><a id="height" name="height"></a> height <a class="header-anchor" href="#height" aria-label="Permalink to &quot;&lt;a id=&quot;height&quot; name=&quot;height&quot;&gt;&lt;/a&gt; height&quot;">​</a></h3><p><code>get</code> <strong>height</strong>(): <code>number</code></p><h4 id="returns-4" tabindex="-1">Returns <a class="header-anchor" href="#returns-4" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>number</code></p><h4 id="implementation-of-3" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-3" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.height</p><h4 id="defined-in-7" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-7" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L48" target="_blank" rel="noreferrer">hex/hex.ts:48</a></p><hr><h3 id="isflat" tabindex="-1"><a id="isFlat" name="isFlat"></a> isFlat <a class="header-anchor" href="#isflat" aria-label="Permalink to &quot;&lt;a id=&quot;isFlat&quot; name=&quot;isFlat&quot;&gt;&lt;/a&gt; isFlat&quot;">​</a></h3><p><code>get</code> <strong>isFlat</strong>(): <code>boolean</code></p><h4 id="returns-5" tabindex="-1">Returns <a class="header-anchor" href="#returns-5" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>boolean</code></p><h4 id="defined-in-8" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-8" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L56" target="_blank" rel="noreferrer">hex/hex.ts:56</a></p><hr><h3 id="ispointy" tabindex="-1"><a id="isPointy" name="isPointy"></a> isPointy <a class="header-anchor" href="#ispointy" aria-label="Permalink to &quot;&lt;a id=&quot;isPointy&quot; name=&quot;isPointy&quot;&gt;&lt;/a&gt; isPointy&quot;">​</a></h3><p><code>get</code> <strong>isPointy</strong>(): <code>boolean</code></p><h4 id="returns-6" tabindex="-1">Returns <a class="header-anchor" href="#returns-6" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>boolean</code></p><h4 id="defined-in-9" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-9" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L60" target="_blank" rel="noreferrer">hex/hex.ts:60</a></p><hr><h3 id="offset" tabindex="-1"><a id="offset" name="offset"></a> offset <a class="header-anchor" href="#offset" aria-label="Permalink to &quot;&lt;a id=&quot;offset&quot; name=&quot;offset&quot;&gt;&lt;/a&gt; offset&quot;">​</a></h3><p><code>get</code> <strong>offset</strong>(): <a href="./../#HexOffset"><code>HexOffset</code></a></p><h4 id="returns-7" tabindex="-1">Returns <a class="header-anchor" href="#returns-7" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./../#HexOffset"><code>HexOffset</code></a></p><h4 id="defined-in-10" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-10" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L72" target="_blank" rel="noreferrer">hex/hex.ts:72</a></p><hr><h3 id="orientation" tabindex="-1"><a id="orientation" name="orientation"></a> orientation <a class="header-anchor" href="#orientation" aria-label="Permalink to &quot;&lt;a id=&quot;orientation&quot; name=&quot;orientation&quot;&gt;&lt;/a&gt; orientation&quot;">​</a></h3><p><code>get</code> <strong>orientation</strong>(): <a href="./../enums/Orientation.html"><code>Orientation</code></a></p><h4 id="returns-8" tabindex="-1">Returns <a class="header-anchor" href="#returns-8" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./../enums/Orientation.html"><code>Orientation</code></a></p><h4 id="defined-in-11" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-11" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L64" target="_blank" rel="noreferrer">hex/hex.ts:64</a></p><hr><h3 id="origin" tabindex="-1"><a id="origin" name="origin"></a> origin <a class="header-anchor" href="#origin" aria-label="Permalink to &quot;&lt;a id=&quot;origin&quot; name=&quot;origin&quot;&gt;&lt;/a&gt; origin&quot;">​</a></h3><p><code>get</code> <strong>origin</strong>(): <a href="./../interfaces/Point.html"><code>Point</code></a></p><h4 id="returns-9" tabindex="-1">Returns <a class="header-anchor" href="#returns-9" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./../interfaces/Point.html"><code>Point</code></a></p><h4 id="defined-in-12" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-12" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L68" target="_blank" rel="noreferrer">hex/hex.ts:68</a></p><hr><h3 id="row" tabindex="-1"><a id="row" name="row"></a> row <a class="header-anchor" href="#row" aria-label="Permalink to &quot;&lt;a id=&quot;row&quot; name=&quot;row&quot;&gt;&lt;/a&gt; row&quot;">​</a></h3><p><code>get</code> <strong>row</strong>(): <code>number</code></p><h4 id="returns-10" tabindex="-1">Returns <a class="header-anchor" href="#returns-10" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>number</code></p><h4 id="implementation-of-4" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-4" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.row</p><h4 id="defined-in-13" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-13" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L76" target="_blank" rel="noreferrer">hex/hex.ts:76</a></p><hr><h3 id="s" tabindex="-1"><a id="s" name="s"></a> s <a class="header-anchor" href="#s" aria-label="Permalink to &quot;&lt;a id=&quot;s&quot; name=&quot;s&quot;&gt;&lt;/a&gt; s&quot;">​</a></h3><p><code>get</code> <strong>s</strong>(): <code>number</code></p><h4 id="returns-11" tabindex="-1">Returns <a class="header-anchor" href="#returns-11" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>number</code></p><h4 id="implementation-of-5" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-5" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.s</p><h4 id="defined-in-14" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-14" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L96" target="_blank" rel="noreferrer">hex/hex.ts:96</a></p><hr><h3 id="settings" tabindex="-1"><a id="settings" name="settings"></a> settings <a class="header-anchor" href="#settings" aria-label="Permalink to &quot;&lt;a id=&quot;settings&quot; name=&quot;settings&quot;&gt;&lt;/a&gt; settings&quot;">​</a></h3><p><code>Static</code> <code>get</code> <strong>settings</strong>(): <a href="./../interfaces/HexSettings.html"><code>HexSettings</code></a></p><h4 id="returns-12" tabindex="-1">Returns <a class="header-anchor" href="#returns-12" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./../interfaces/HexSettings.html"><code>HexSettings</code></a></p><h4 id="defined-in-15" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-15" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L22" target="_blank" rel="noreferrer">hex/hex.ts:22</a></p><hr><h3 id="width" tabindex="-1"><a id="width" name="width"></a> width <a class="header-anchor" href="#width" aria-label="Permalink to &quot;&lt;a id=&quot;width&quot; name=&quot;width&quot;&gt;&lt;/a&gt; width&quot;">​</a></h3><p><code>get</code> <strong>width</strong>(): <code>number</code></p><h4 id="returns-13" tabindex="-1">Returns <a class="header-anchor" href="#returns-13" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>number</code></p><h4 id="implementation-of-6" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-6" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.width</p><h4 id="defined-in-16" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-16" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L80" target="_blank" rel="noreferrer">hex/hex.ts:80</a></p><hr><h3 id="x" tabindex="-1"><a id="x" name="x"></a> x <a class="header-anchor" href="#x" aria-label="Permalink to &quot;&lt;a id=&quot;x&quot; name=&quot;x&quot;&gt;&lt;/a&gt; x&quot;">​</a></h3><p><code>get</code> <strong>x</strong>(): <code>number</code></p><h4 id="returns-14" tabindex="-1">Returns <a class="header-anchor" href="#returns-14" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>number</code></p><h4 id="implementation-of-7" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-7" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.x</p><h4 id="defined-in-17" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-17" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L88" target="_blank" rel="noreferrer">hex/hex.ts:88</a></p><hr><h3 id="y" tabindex="-1"><a id="y" name="y"></a> y <a class="header-anchor" href="#y" aria-label="Permalink to &quot;&lt;a id=&quot;y&quot; name=&quot;y&quot;&gt;&lt;/a&gt; y&quot;">​</a></h3><p><code>get</code> <strong>y</strong>(): <code>number</code></p><h4 id="returns-15" tabindex="-1">Returns <a class="header-anchor" href="#returns-15" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>number</code></p><h4 id="implementation-of-8" tabindex="-1">Implementation of <a class="header-anchor" href="#implementation-of-8" aria-label="Permalink to &quot;Implementation of&quot;">​</a></h4><p>Readonly.y</p><h4 id="defined-in-18" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-18" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L92" target="_blank" rel="noreferrer">hex/hex.ts:92</a></p><h2 id="methods-1" tabindex="-1">Methods <a class="header-anchor" href="#methods-1" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="clone" tabindex="-1"><a id="clone" name="clone"></a> clone <a class="header-anchor" href="#clone" aria-label="Permalink to &quot;&lt;a id=&quot;clone&quot; name=&quot;clone&quot;&gt;&lt;/a&gt; clone&quot;">​</a></h3><p><strong>clone</strong>&lt;<code>T</code>&gt;(<code>newProps?</code>): <code>T</code></p><h4 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>T</code></td><td style="text-align:left;">extends <a href="./Hex.html"><code>Hex</code></a></td></tr></tbody></table><h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>newProps</code></td><td style="text-align:left;"><a href="./../#HexCoordinates"><code>HexCoordinates</code></a></td></tr></tbody></table><h4 id="returns-16" tabindex="-1">Returns <a class="header-anchor" href="#returns-16" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>T</code></p><h4 id="defined-in-19" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-19" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L109" target="_blank" rel="noreferrer">hex/hex.ts:109</a></p><hr><h3 id="equals" tabindex="-1"><a id="equals" name="equals"></a> equals <a class="header-anchor" href="#equals" aria-label="Permalink to &quot;&lt;a id=&quot;equals&quot; name=&quot;equals&quot;&gt;&lt;/a&gt; equals&quot;">​</a></h3><p><strong>equals</strong>(<code>coordinates</code>): <code>boolean</code></p><h4 id="parameters-2" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-2" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>coordinates</code></td><td style="text-align:left;"><a href="./../#HexCoordinates"><code>HexCoordinates</code></a></td></tr></tbody></table><h4 id="returns-17" tabindex="-1">Returns <a class="header-anchor" href="#returns-17" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>boolean</code></p><h4 id="defined-in-20" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-20" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L113" target="_blank" rel="noreferrer">hex/hex.ts:113</a></p><hr><h3 id="tostring" tabindex="-1"><a id="toString" name="toString"></a> toString <a class="header-anchor" href="#tostring" aria-label="Permalink to &quot;&lt;a id=&quot;toString&quot; name=&quot;toString&quot;&gt;&lt;/a&gt; toString&quot;">​</a></h3><p><strong>toString</strong>(): <code>string</code></p><h4 id="returns-18" tabindex="-1">Returns <a class="header-anchor" href="#returns-18" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>string</code></p><h4 id="defined-in-21" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-21" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L117" target="_blank" rel="noreferrer">hex/hex.ts:117</a></p><hr><h3 id="translate" tabindex="-1"><a id="translate" name="translate"></a> translate <a class="header-anchor" href="#translate" aria-label="Permalink to &quot;&lt;a id=&quot;translate&quot; name=&quot;translate&quot;&gt;&lt;/a&gt; translate&quot;">​</a></h3><p><strong>translate</strong>(<code>delta</code>): <a href="./Hex.html"><code>Hex</code></a></p><h4 id="parameters-3" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-3" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>delta</code></td><td style="text-align:left;"><a href="./../#PartialCubeCoordinates"><code>PartialCubeCoordinates</code></a></td></tr></tbody></table><h4 id="returns-19" tabindex="-1">Returns <a class="header-anchor" href="#returns-19" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./Hex.html"><code>Hex</code></a></p><h4 id="defined-in-22" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-22" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/hex/hex.ts#L121" target="_blank" rel="noreferrer">hex/hex.ts:121</a></p>',195),i=[n];function l(h,s,d,c,u,f){return t(),a("div",null,i)}const q=e(o,[["render",l]]);export{b as __pageData,q as default};
