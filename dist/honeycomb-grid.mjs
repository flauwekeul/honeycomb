const l = (r) => Number.isFinite(r) && !Number.isNaN(r), T = (r) => typeof r == "object" && r !== null, Ot = (r) => T(r) && l(r.q) && l(r.r), k = (r) => typeof r == "function", S = (r) => T(r) && l(r.col) && l(r.row), V = (r) => T(r) && l(r.x) && l(r.y), E = (r) => Array.isArray(r) && l(r[0]) && l(r[1]), A = (r, t) => t + r * (t & 1) >> 1;
function Z(r, t) {
  return (r % t + t) % t;
}
const X = (r, t) => Z(r + t, 8), R = ([r, t, e = -r - t]) => ({ q: r, r: t, s: e });
function b({ q: r, r: t, s: e }) {
  const n = l(r), s = l(t), o = l(e);
  if (n && s && o)
    return { q: r, r: t, s: e };
  if (n && s)
    return { q: r, r: t, s: -r - t };
  if (n && o)
    return { q: r, r: -r - e, s: e };
  if (s && o)
    return { q: -t - e, r: t, s: e };
  throw new TypeError(
    `Can't determine three cube coordinates from less than two coordinates. Received: { q: ${r}, r: ${t}, s: ${e} }.`
  );
}
var d = /* @__PURE__ */ ((r) => (r.FLAT = "FLAT", r.POINTY = "POINTY", r))(d || {});
function G(r, t) {
  if (T(r) && r.xRadius > 0 && r.yRadius > 0)
    return r;
  if (T(r) && r.width > 0 && r.height > 0) {
    const { width: e, height: n } = r;
    return t === d.POINTY ? { xRadius: e / Math.sqrt(3), yRadius: n / 2 } : { xRadius: e / 2, yRadius: n / Math.sqrt(3) };
  }
  if (r > 0)
    return { xRadius: r, yRadius: r };
  throw new TypeError(
    `Invalid dimensions: ${JSON.stringify(
      r
    )}. Dimensions must be expressed as an Ellipse ({ xRadius: number, yRadius: number }), a Rectangle ({ width: number, height: number }) or a number.`
  );
}
function D(r, t) {
  if (V(r))
    return r;
  if (!t)
    throw new TypeError(
      `Supply a bounding box ({ width: number, height: number }). Received: ${JSON.stringify(t)}`
    );
  if (r === "topLeft")
    return { x: t.width * -0.5, y: t.height * -0.5 };
  throw new TypeError(
    `Invalid origin: ${JSON.stringify(
      r
    )}. Origin must be expressed as a Point ({ x: number, y: number }) or the string 'topLeft'.`
  );
}
class Q {
  get center() {
    const { width: t, height: e, x: n, y: s } = this;
    return { x: t / 2 - n, y: e / 2 - s };
  }
  get col() {
    return P(this).col;
  }
  get corners() {
    const { orientation: t, width: e, height: n, x: s, y: o } = this;
    return t === d.POINTY ? tt(e, n, s, o) : rt(e, n, s, o);
  }
  get dimensions() {
    return w.dimensions;
  }
  get height() {
    const {
      orientation: t,
      dimensions: { yRadius: e }
    } = this;
    return t === d.POINTY ? e * 2 : e * Math.sqrt(3);
  }
  get isFlat() {
    return this.orientation === d.FLAT;
  }
  get isPointy() {
    return this.orientation === d.POINTY;
  }
  get orientation() {
    return w.orientation;
  }
  get origin() {
    return w.origin;
  }
  get offset() {
    return w.offset;
  }
  get row() {
    return P(this).row;
  }
  get width() {
    const {
      orientation: t,
      dimensions: { xRadius: e }
    } = this;
    return t === d.POINTY ? e * Math.sqrt(3) : e * 2;
  }
  get x() {
    return Y(this).x;
  }
  get y() {
    return Y(this).y;
  }
  get s() {
    return -this.q - this.r;
  }
  q;
  r;
  constructor(t = [0, 0]) {
    const { q: e, r: n } = C(this, t);
    this.q = e, this.r = n;
  }
  clone(t = this) {
    return new this.constructor(t);
  }
  equals(t) {
    return nt(this, S(t) ? j(this, t) : t);
  }
  toString() {
    return `${this.constructor.name}(${this.q},${this.r})`;
  }
  translate(t) {
    return ct(this, t);
  }
}
const w = {
  dimensions: { xRadius: 1, yRadius: 1 },
  orientation: d.POINTY,
  origin: { x: 0, y: 0 },
  offset: -1
}, tt = (r, t, e, n) => [
  { x: e + r * 0.5, y: n - t * 0.25 },
  { x: e + r * 0.5, y: n + t * 0.25 },
  { x: e, y: n + t * 0.5 },
  { x: e - r * 0.5, y: n + t * 0.25 },
  { x: e - r * 0.5, y: n - t * 0.25 },
  { x: e, y: n - t * 0.5 }
], rt = (r, t, e, n) => [
  { x: e + r * 0.25, y: n - t * 0.5 },
  { x: e + r * 0.5, y: n },
  { x: e + r * 0.25, y: n + t * 0.5 },
  { x: e - r * 0.25, y: n + t * 0.5 },
  { x: e - r * 0.5, y: n },
  { x: e - r * 0.25, y: n - t * 0.5 }
];
function et(r) {
  const { dimensions: t, orientation: e, origin: n, offset: s } = { ...w, ...r };
  return class extends Q {
    get dimensions() {
      return G(t, e);
    }
    get orientation() {
      return e;
    }
    get origin() {
      return D(n, this);
    }
    get offset() {
      return s;
    }
  };
}
function nt(r, t) {
  if (S(r) && S(t))
    return r.col === t.col && r.row === t.row;
  if (Object.hasOwn(r, "col") || Object.hasOwn(t, "col"))
    throw new Error(
      `Can't compare coordinates where one are offset coordinates. Either pass two offset coordinates or two axial/cube coordinates. Received: ${JSON.stringify(
        r
      )} and ${JSON.stringify(t)}`
    );
  const e = E(r) ? R(r) : r, n = E(t) ? R(t) : t;
  return e.q === n.q && e.r === n.r;
}
const st = (r, t, e) => ({
  col: r + A(e, t),
  row: t
}), ot = (r, t, e) => ({
  col: r,
  row: t + A(e, r)
}), P = ({ q: r, r: t, offset: e, isPointy: n }) => n ? st(r, t, e) : ot(r, t, e), Y = ({ orientation: r, dimensions: { xRadius: t, yRadius: e }, origin: { x: n, y: s }, q: o, r: i }) => r === d.POINTY ? {
  x: t * Math.sqrt(3) * (o + i / 2) - n,
  y: e * 3 / 2 * i - s
} : {
  x: t * 3 / 2 * o - n,
  y: e * Math.sqrt(3) * (i + o / 2) - s
}, z = (r, t, e) => {
  const n = r - A(e, t), s = t, o = -n - s;
  return { q: n, r: s, s: o };
}, _ = (r, t, e) => {
  const n = r, s = t - A(e, r), o = -n - s;
  return { q: n, r: s, s: o };
}, j = ({ offset: r, isPointy: t }, { col: e, row: n }) => t ? z(e, n, r) : _(e, n, r), F = (r) => {
  const { q: t, r: e, s: n } = b(r);
  let s = Math.round(t), o = Math.round(e), i = Math.round(n);
  const c = Math.abs(t - s), u = Math.abs(e - o), h = Math.abs(n - i);
  return c > u && c > h ? s = -o - i : u > h ? o = -s - i : i = -s - o, { q: s, r: o, s: i };
}, it = ({ dimensions: { xRadius: r, yRadius: t }, origin: e, isPointy: n }, { x: s, y: o }) => (s += e.x, o += e.y, F(n ? { q: Math.sqrt(3) * s / (3 * r) - o / (3 * t), r: 2 / 3 * (o / t) } : { q: 2 / 3 * (s / r), r: Math.sqrt(3) * o / (3 * t) - s / (3 * r) }));
function C(r, t) {
  return E(t) ? R(t) : S(t) ? j(r, t) : b(t);
}
function ct(r, t) {
  const { q: e, r: n, s } = b(r), { q: o, r: i, s: c } = b(t), u = { q: e + o, r: n + i, s: s + c };
  return r instanceof Q ? r.clone(u) : u;
}
function I(r, t, e) {
  const { q: n, r: s, s: o } = C(r, t), { q: i, r: c, s: u } = C(r, e);
  return Math.max(Math.abs(n - i), Math.abs(s - c), Math.abs(o - u));
}
var L = /* @__PURE__ */ ((r) => (r.CLOCKWISE = "CLOCKWISE", r.COUNTERCLOCKWISE = "COUNTERCLOCKWISE", r))(L || {}), f = /* @__PURE__ */ ((r) => (r[r.N = 0] = "N", r[r.NE = 1] = "NE", r[r.E = 2] = "E", r[r.SE = 3] = "SE", r[r.S = 4] = "S", r[r.SW = 5] = "SW", r[r.W = 6] = "W", r[r.NW = 7] = "NW", r))(f || {});
const ut = [
  null,
  { q: 1, r: -1 },
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  null,
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 }
], ht = [
  { q: 0, r: -1 },
  { q: 1, r: -1 },
  null,
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  null,
  { q: -1, r: 0 }
], ft = ({ offset: r, q: t, r: e, col: n, row: s }, o) => {
  if (o === f.S || o === f.N) {
    const c = o === f.S ? s + 1 : s - 1;
    return z(n, c, r);
  }
  const i = ut[o];
  return { q: t + i.q, r: e + i.r };
}, at = ({ offset: r, q: t, r: e, col: n, row: s }, o) => {
  if (o === f.E || o === f.W) {
    const c = o === f.E ? n + 1 : n - 1;
    return _(c, s, r);
  }
  const i = ht[o];
  return { q: t + i.q, r: e + i.r };
}, N = (r, t) => r.clone(r.isPointy ? ft(r, t) : at(r, t));
function p(r) {
  return Array.isArray(r) ? function(e, n) {
    const s = [];
    let o = n;
    for (const i of r)
      for (const c of i(e, o))
        s.push(o = c);
    return s;
  } : r;
}
const wt = (...r) => (t) => r.map(t);
function v(r) {
  return lt(r) ? gt(r) : xt(r);
}
function lt(r) {
  return r.direction in f;
}
function gt({ start: r, direction: t, length: e }) {
  return function(s, o) {
    const i = [];
    let u = s(r ?? o);
    !r && o && (u = N(u, t));
    for (let h = 0; h < e; h++)
      i.push(u), u = N(u, t);
    return i;
  };
}
function xt({ start: r, stop: t }) {
  return function(n, s) {
    const o = [], i = n(r ?? s), c = J(i), u = J(C(i, t)), h = dt(c, u), g = I(i, i, t), y = 1 / Math.max(g, 1);
    let m = !r && s ? 1 : 0;
    for (m; m <= g; m++) {
      const a = F(h(y * m));
      o.push(n(a));
    }
    return o;
  };
}
function J({ q: r, r: t, s: e }) {
  return { q: r + 1e-6, r: t + 1e-6, s: e + -2e-6 };
}
function dt(r, t) {
  return (e) => {
    const n = r.q * (1 - e) + t.q * e, s = r.r * (1 - e) + t.r * e;
    return { q: n, r: s };
  };
}
const Tt = (r) => (t, e) => [N(t(e), r)];
function U(r, t, { includeSource: e = !0 } = {}) {
  return function(s, o) {
    const i = [];
    for (const c of p(r)(s, o)) {
      e && i.push(c);
      for (const u of p(t)(s, c))
        i.push(u);
    }
    return i;
  };
}
function St(r, t) {
  return function(n, s) {
    const {
      width: o,
      height: i,
      start: c,
      direction: u = f.E
    } = t ? mt(r, t, n()) : r, h = n(c ?? s), g = U(
      v({ start: h, direction: X(u, 2), length: i }),
      v({ direction: u, length: o - 1 })
    )(n, h);
    return !c && s ? g.slice(1) : g;
  };
}
function mt(r, t, { isPointy: e, offset: n }) {
  const { col: s, row: o } = B(r, e, n), { col: i, row: c } = B(t, e, n), u = s < i ? "A" : "B", h = o < c ? "A" : "B", g = u + h, { swapWidthHeight: y, direction: m } = qt[g], a = Math.abs(s - i) + 1, H = Math.abs(o - c) + 1;
  return {
    width: y ? H : a,
    height: y ? a : H,
    start: r,
    direction: m
  };
}
function B(r, t, e) {
  if (S(r))
    return r;
  const { q: n, r: s } = E(r) ? R(r) : b(r);
  return P({ q: n, r: s, isPointy: t, offset: e });
}
const qt = {
  AA: {
    swapWidthHeight: !1,
    direction: f.E
  },
  AB: {
    swapWidthHeight: !0,
    direction: f.N
  },
  BA: {
    swapWidthHeight: !0,
    direction: f.S
  },
  BB: {
    swapWidthHeight: !1,
    direction: f.W
  }
};
function bt(r, t) {
  return p(Array.from({ length: r }, () => p(t)));
}
function yt(r) {
  const { center: t, rotation: e = L.CLOCKWISE } = r;
  return function(s, o) {
    const i = e.toUpperCase(), c = [];
    let { radius: u } = r, h;
    l(u) ? h = s(t).translate({ q: u, s: -u }) : (h = s(r.start ?? o), u = I(h, t, h));
    const { q: g, r: y, s: m } = C(h, t);
    let a = s({ q: g, r: y - u, s: m + u });
    if (i === L.CLOCKWISE)
      for (let x = 0; x < 6; x++)
        for (let O = 0; O < u; O++) {
          const { q: M, r: W } = K[x];
          a = s({ q: a.q + M, r: a.r + W }), c.push(a);
        }
    else
      for (let x = 5; x >= 0; x--)
        for (let O = 0; O < u; O++) {
          const { q: M, r: W } = K[x];
          a = s({ q: a.q - M, r: a.r - W }), c.push(a);
        }
    const H = !r.start && o, $ = c.findIndex((x) => x.equals(h));
    return c.slice($ + (H ? 1 : 0)).concat(c.slice(0, $));
  };
}
const K = [
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 }
];
function Ct({ radius: r, start: t, rotation: e }) {
  return function(s, o) {
    const i = s(t ?? o);
    return U(v({ start: t, direction: f.N, length: r }), yt({ center: i, rotation: e }))(
      s,
      o
    );
  };
}
class q {
  static fromIterable(t) {
    const e = t[Symbol.iterator]().next().value;
    if (!e)
      throw new TypeError(`Can't create grid from empty iterable: ${JSON.stringify(t)}`);
    return new q(e.constructor, t);
  }
  static fromJSON({ hexSettings: t, coordinates: e }) {
    const n = et(t);
    return new q(
      n,
      e.map((s) => new n(s))
    );
  }
  get size() {
    return this.#e.size;
  }
  get pixelWidth() {
    if (this.size === 0)
      return 0;
    const { isPointy: t, width: e } = this.#r, n = this.toArray(), {
      0: s,
      length: o,
      [o - 1]: i
    } = t ? n.sort((c, u) => u.s - c.s || c.q - u.q) : n.sort((c, u) => c.q - u.q);
    return i.x - s.x + e;
  }
  get pixelHeight() {
    if (this.size === 0)
      return 0;
    const { isPointy: t, height: e } = this.#r, n = this.toArray(), {
      0: s,
      length: o,
      [o - 1]: i
    } = t ? n.sort((c, u) => c.r - u.r) : n.sort((c, u) => u.s - c.s || c.r - u.r);
    return i.y - s.y + e;
  }
  [Symbol.iterator]() {
    return this.#e.values();
  }
  get #r() {
    return this.#t.prototype;
  }
  #t;
  #e = /* @__PURE__ */ new Map();
  constructor(t, e = []) {
    if (t instanceof q) {
      this.#t = t.#t, this.setHexes(t);
      return;
    }
    this.#t = t, this.setHexes(this.#s(e));
  }
  createHex(t) {
    return new this.#t(t);
  }
  getHex(t) {
    const e = this.createHex(t);
    return this.#e.get(e.toString());
  }
  hasHex(t) {
    return this.#e.has(t.toString());
  }
  setHexes(t) {
    for (const e of t)
      this.#n(e);
    return this;
  }
  filter(t) {
    const e = new q(this.#t);
    for (const n of this)
      t(n) && e.#n(n);
    return e;
  }
  map(t) {
    const e = new q(this.#t);
    for (const n of this)
      e.#n(t(n));
    return e;
  }
  traverse(t, { bail: e = !1 } = {}) {
    const n = new q(this.#t);
    for (const s of this.#s(t)) {
      const o = this.getHex(s);
      if (o)
        n.#n(o);
      else if (e)
        return n;
    }
    return n;
  }
  forEach(t) {
    for (const e of this)
      t(e);
    return this;
  }
  reduce(t, e) {
    if (e === void 0) {
      let s, o, i;
      for (const c of this)
        o = i, i = c, o && (s = t(o, i));
      return s;
    }
    let n = e;
    for (const s of this)
      n = t(n, s);
    return n;
  }
  toArray() {
    return Array.from(this);
  }
  toJSON() {
    const { dimensions: t, orientation: e, origin: n, offset: s } = this.#r;
    return { hexSettings: { dimensions: t, orientation: e, origin: n, offset: s }, coordinates: this.toArray() };
  }
  toString() {
    return `${this.constructor.name}(${this.size})`;
  }
  pointToHex(t, { allowOutside: e = !0 } = {}) {
    const n = it(this.#r, t);
    return e ? this.createHex(n) : this.getHex(n);
  }
  distance(t, e, { allowOutside: n = !0 } = {}) {
    if (n)
      return I(this.#r, t, e);
    const s = this.getHex(t), o = this.getHex(e);
    if (!(!s || !o))
      return I(this.#r, s, o);
  }
  neighborOf(t, e, { allowOutside: n = !0 } = {}) {
    if (n)
      return N(this.createHex(t), e);
    const s = this.getHex(t);
    if (!!s)
      return this.getHex(N(s, e));
  }
  #n(t) {
    this.#e.set(t.toString(), t);
  }
  #s(t) {
    return this.#o(t) ? this.#i(t) : Array.isArray(t) && this.#o(t[0]) ? this.#i(p(t)) : t;
  }
  #o(t) {
    return k(t);
  }
  #i(t) {
    return t(this.createHex.bind(this));
  }
}
export {
  f as Direction,
  q as Grid,
  Q as Hex,
  d as Orientation,
  L as Rotation,
  b as completeCube,
  p as concat,
  G as createHexDimensions,
  D as createHexOrigin,
  w as defaultHexSettings,
  et as defineHex,
  I as distance,
  nt as equals,
  wt as fromCoordinates,
  P as hexToOffset,
  Y as hexToPoint,
  Ot as isAxial,
  S as isOffset,
  V as isPoint,
  E as isTuple,
  v as line,
  Tt as move,
  N as neighborOf,
  A as offsetFromZero,
  j as offsetToCube,
  _ as offsetToCubeFlat,
  z as offsetToCubePointy,
  it as pointToCube,
  St as rectangle,
  bt as repeat,
  U as repeatWith,
  yt as ring,
  F as round,
  Ct as spiral,
  C as toCube,
  ct as translate,
  R as tupleToCube
};
