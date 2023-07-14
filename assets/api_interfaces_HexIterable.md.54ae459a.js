import{_ as e,c as t,o as a,U as r}from"./chunks/framework.fb79f17b.js";const m=JSON.parse('{"title":"Interface: HexIterable<T>","description":"","frontmatter":{},"headers":[],"relativePath":"api/interfaces/HexIterable.md","filePath":"api/interfaces/HexIterable.md","lastUpdated":1689322025000}'),o={name:"api/interfaces/HexIterable.md"},d=r('<h1 id="interface-hexiterable-t" tabindex="-1">Interface: HexIterable&lt;T&gt; <a class="header-anchor" href="#interface-hexiterable-t" aria-label="Permalink to &quot;Interface: HexIterable&lt;T\\&gt;&quot;">​</a></h1><h2 id="type-parameters" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h2><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>T</code></td><td style="text-align:left;">extends <a href="./../classes/Hex.html"><code>Hex</code></a></td></tr></tbody></table><h2 id="hierarchy" tabindex="-1">Hierarchy <a class="header-anchor" href="#hierarchy" aria-label="Permalink to &quot;Hierarchy&quot;">​</a></h2><ul><li><p><code>Iterable</code>&lt;<code>T</code>&gt;</p></li><li><p><a href="./HexStore.html"><code>HexStore</code></a>&lt;<code>T</code>&gt;</p><p>↳ <strong><code>HexIterable</code></strong></p></li></ul><h2 id="implemented-by" tabindex="-1">Implemented by <a class="header-anchor" href="#implemented-by" aria-label="Permalink to &quot;Implemented by&quot;">​</a></h2><ul><li><a href="./../classes/Grid.html"><code>Grid</code></a></li></ul><h2 id="table-of-contents" tabindex="-1">Table of contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of contents&quot;">​</a></h2><h3 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h3><ul><li><a href="./HexIterable.html#size">size</a></li></ul><h3 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h3><ul><li><a href="./HexIterable.html#[iterator]">[iterator]</a></li><li><a href="./HexIterable.html#filter">filter</a></li><li><a href="./HexIterable.html#forEach">forEach</a></li><li><a href="./HexIterable.html#getHex">getHex</a></li><li><a href="./HexIterable.html#hasHex">hasHex</a></li><li><a href="./HexIterable.html#map">map</a></li><li><a href="./HexIterable.html#reduce">reduce</a></li><li><a href="./HexIterable.html#setHexes">setHexes</a></li><li><a href="./HexIterable.html#toArray">toArray</a></li></ul><h2 id="properties-1" tabindex="-1">Properties <a class="header-anchor" href="#properties-1" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><h3 id="size" tabindex="-1"><a id="size" name="size"></a> size <a class="header-anchor" href="#size" aria-label="Permalink to &quot;&lt;a id=&quot;size&quot; name=&quot;size&quot;&gt;&lt;/a&gt; size&quot;">​</a></h3><p><code>Readonly</code> <strong>size</strong>: <code>number</code></p><h4 id="inherited-from" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./HexStore.html">HexStore</a>.<a href="./HexStore.html#size">size</a></p><h4 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L45" target="_blank" rel="noreferrer">grid/types.ts:45</a></p><h2 id="methods-1" tabindex="-1">Methods <a class="header-anchor" href="#methods-1" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="iterator" tabindex="-1"><a id="[iterator]" name="[iterator]"></a> [iterator] <a class="header-anchor" href="#iterator" aria-label="Permalink to &quot;&lt;a id=&quot;[iterator]&quot; name=&quot;[iterator]&quot;&gt;&lt;/a&gt; [iterator]&quot;">​</a></h3><p><strong>[iterator]</strong>(): <code>IterableIterator</code>&lt;<code>T</code>&gt;</p><h4 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>IterableIterator</code>&lt;<code>T</code>&gt;</p><h4 id="overrides" tabindex="-1">Overrides <a class="header-anchor" href="#overrides" aria-label="Permalink to &quot;Overrides&quot;">​</a></h4><p>Iterable.[iterator]</p><h4 id="defined-in-1" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-1" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L55" target="_blank" rel="noreferrer">grid/types.ts:55</a></p><hr><h3 id="filter" tabindex="-1"><a id="filter" name="filter"></a> filter <a class="header-anchor" href="#filter" aria-label="Permalink to &quot;&lt;a id=&quot;filter&quot; name=&quot;filter&quot;&gt;&lt;/a&gt; filter&quot;">​</a></h3><p><strong>filter</strong>(<code>predicate</code>): <a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>predicate</code></td><td style="text-align:left;">(<code>hex</code>: <code>T</code>) =&gt; <code>boolean</code></td></tr></tbody></table><h4 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="defined-in-2" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-2" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L56" target="_blank" rel="noreferrer">grid/types.ts:56</a></p><hr><h3 id="foreach" tabindex="-1"><a id="forEach" name="forEach"></a> forEach <a class="header-anchor" href="#foreach" aria-label="Permalink to &quot;&lt;a id=&quot;forEach&quot; name=&quot;forEach&quot;&gt;&lt;/a&gt; forEach&quot;">​</a></h3><p><strong>forEach</strong>(<code>fn</code>): <a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>fn</code></td><td style="text-align:left;">(<code>hex</code>: <code>T</code>) =&gt; <code>void</code></td></tr></tbody></table><h4 id="returns-2" tabindex="-1">Returns <a class="header-anchor" href="#returns-2" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="defined-in-3" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-3" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L58" target="_blank" rel="noreferrer">grid/types.ts:58</a></p><hr><h3 id="gethex" tabindex="-1"><a id="getHex" name="getHex"></a> getHex <a class="header-anchor" href="#gethex" aria-label="Permalink to &quot;&lt;a id=&quot;getHex&quot; name=&quot;getHex&quot;&gt;&lt;/a&gt; getHex&quot;">​</a></h3><p><strong>getHex</strong>(<code>coordinates</code>): <code>undefined</code> | <code>T</code></p><h4 id="parameters-2" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-2" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>coordinates</code></td><td style="text-align:left;"><a href="./../#HexCoordinates"><code>HexCoordinates</code></a></td></tr></tbody></table><h4 id="returns-3" tabindex="-1">Returns <a class="header-anchor" href="#returns-3" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>undefined</code> | <code>T</code></p><h4 id="inherited-from-1" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-1" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./HexStore.html">HexStore</a>.<a href="./HexStore.html#getHex">getHex</a></p><h4 id="defined-in-4" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-4" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L46" target="_blank" rel="noreferrer">grid/types.ts:46</a></p><hr><h3 id="hashex" tabindex="-1"><a id="hasHex" name="hasHex"></a> hasHex <a class="header-anchor" href="#hashex" aria-label="Permalink to &quot;&lt;a id=&quot;hasHex&quot; name=&quot;hasHex&quot;&gt;&lt;/a&gt; hasHex&quot;">​</a></h3><p><strong>hasHex</strong>(<code>hex</code>): <code>boolean</code></p><h4 id="parameters-3" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-3" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>hex</code></td><td style="text-align:left;"><code>T</code></td></tr></tbody></table><h4 id="returns-4" tabindex="-1">Returns <a class="header-anchor" href="#returns-4" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>boolean</code></p><h4 id="inherited-from-2" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-2" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./HexStore.html">HexStore</a>.<a href="./HexStore.html#hasHex">hasHex</a></p><h4 id="defined-in-5" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-5" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L47" target="_blank" rel="noreferrer">grid/types.ts:47</a></p><hr><h3 id="map" tabindex="-1"><a id="map" name="map"></a> map <a class="header-anchor" href="#map" aria-label="Permalink to &quot;&lt;a id=&quot;map&quot; name=&quot;map&quot;&gt;&lt;/a&gt; map&quot;">​</a></h3><p><strong>map</strong>(<code>fn</code>): <a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="parameters-4" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-4" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>fn</code></td><td style="text-align:left;">(<code>hex</code>: <code>T</code>) =&gt; <code>T</code></td></tr></tbody></table><h4 id="returns-5" tabindex="-1">Returns <a class="header-anchor" href="#returns-5" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="defined-in-6" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-6" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L57" target="_blank" rel="noreferrer">grid/types.ts:57</a></p><hr><h3 id="reduce" tabindex="-1"><a id="reduce" name="reduce"></a> reduce <a class="header-anchor" href="#reduce" aria-label="Permalink to &quot;&lt;a id=&quot;reduce&quot; name=&quot;reduce&quot;&gt;&lt;/a&gt; reduce&quot;">​</a></h3><p><strong>reduce</strong>(<code>reducer</code>): <code>T</code></p><h4 id="parameters-5" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-5" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>reducer</code></td><td style="text-align:left;">(<code>previousHex</code>: <code>T</code>, <code>currentHex</code>: <code>T</code>) =&gt; <code>T</code></td></tr></tbody></table><h4 id="returns-6" tabindex="-1">Returns <a class="header-anchor" href="#returns-6" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>T</code></p><h4 id="defined-in-7" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-7" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L59" target="_blank" rel="noreferrer">grid/types.ts:59</a></p><p><strong>reduce</strong>(<code>reducer</code>, <code>initialValue</code>): <code>T</code></p><h4 id="parameters-6" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-6" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>reducer</code></td><td style="text-align:left;">(<code>previousHex</code>: <code>T</code>, <code>currentHex</code>: <code>T</code>) =&gt; <code>T</code></td></tr><tr><td style="text-align:left;"><code>initialValue</code></td><td style="text-align:left;"><code>T</code></td></tr></tbody></table><h4 id="returns-7" tabindex="-1">Returns <a class="header-anchor" href="#returns-7" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>T</code></p><h4 id="defined-in-8" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-8" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L60" target="_blank" rel="noreferrer">grid/types.ts:60</a></p><p><strong>reduce</strong>&lt;<code>R</code>&gt;(<code>reducer</code>, <code>initialValue</code>): <code>R</code></p><h4 id="type-parameters-1" tabindex="-1">Type parameters <a class="header-anchor" href="#type-parameters-1" aria-label="Permalink to &quot;Type parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th></tr></thead><tbody><tr><td style="text-align:left;"><code>R</code></td></tr></tbody></table><h4 id="parameters-7" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-7" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>reducer</code></td><td style="text-align:left;">(<code>result</code>: <code>R</code>, <code>hex</code>: <code>T</code>) =&gt; <code>R</code></td></tr><tr><td style="text-align:left;"><code>initialValue</code></td><td style="text-align:left;"><code>R</code></td></tr></tbody></table><h4 id="returns-8" tabindex="-1">Returns <a class="header-anchor" href="#returns-8" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>R</code></p><h4 id="defined-in-9" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-9" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L61" target="_blank" rel="noreferrer">grid/types.ts:61</a></p><hr><h3 id="sethexes" tabindex="-1"><a id="setHexes" name="setHexes"></a> setHexes <a class="header-anchor" href="#sethexes" aria-label="Permalink to &quot;&lt;a id=&quot;setHexes&quot; name=&quot;setHexes&quot;&gt;&lt;/a&gt; setHexes&quot;">​</a></h3><p><strong>setHexes</strong>(<code>hexesOrCoordinates</code>): <a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="parameters-8" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-8" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>hexesOrCoordinates</code></td><td style="text-align:left;"><code>Iterable</code>&lt;<a href="./../#HexCoordinates"><code>HexCoordinates</code></a> | <code>T</code>&gt;</td></tr></tbody></table><h4 id="returns-9" tabindex="-1">Returns <a class="header-anchor" href="#returns-9" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><a href="./HexIterable.html"><code>HexIterable</code></a>&lt;<code>T</code>&gt;</p><h4 id="inherited-from-3" tabindex="-1">Inherited from <a class="header-anchor" href="#inherited-from-3" aria-label="Permalink to &quot;Inherited from&quot;">​</a></h4><p><a href="./HexStore.html">HexStore</a>.<a href="./HexStore.html#setHexes">setHexes</a></p><h4 id="defined-in-10" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-10" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L48" target="_blank" rel="noreferrer">grid/types.ts:48</a></p><hr><h3 id="toarray" tabindex="-1"><a id="toArray" name="toArray"></a> toArray <a class="header-anchor" href="#toarray" aria-label="Permalink to &quot;&lt;a id=&quot;toArray&quot; name=&quot;toArray&quot;&gt;&lt;/a&gt; toArray&quot;">​</a></h3><p><strong>toArray</strong>(): <code>T</code>[]</p><h4 id="returns-10" tabindex="-1">Returns <a class="header-anchor" href="#returns-10" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>T</code>[]</p><h4 id="defined-in-11" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-11" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/flauwekeul/honeycomb/blob/master/src/grid/types.ts#L62" target="_blank" rel="noreferrer">grid/types.ts:62</a></p>',120),l=[d];function i(h,n,s,c,f,u){return a(),t("div",null,l)}const x=e(o,[["render",i]]);export{m as __pageData,x as default};
