const mt = (t, r) => t === r, kt = Symbol("solid-track"), V = {
  equals: mt
};
let vt = pt;
const S = 1, M = 2, st = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, Z = {};
var g = null;
let G = null, yt = null, u = null, m = null, z = null, q = 0;
function R(t, r) {
  const e = u, o = g, a = t.length === 0, i = r === void 0 ? o : r, l = a ? st : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, n = a ? t : () => t(() => P(() => U(l)));
  g = l, u = null;
  try {
    return $(n, !0);
  } finally {
    u = e, g = o;
  }
}
function A(t, r) {
  r = r ? Object.assign({}, V, r) : V;
  const e = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: r.equals || void 0
  }, o = (a) => (typeof a == "function" && (a = a(e.value)), bt(e, a));
  return [dt.bind(e), o];
}
function et(t, r, e) {
  const o = W(t, r, !0, S);
  L(o);
}
function N(t, r, e) {
  const o = W(t, r, !1, S);
  L(o);
}
function ct(t, r, e) {
  e = e ? Object.assign({}, V, e) : V;
  const o = W(t, r, !0, 0);
  return o.observers = null, o.observerSlots = null, o.comparator = e.equals || void 0, L(o), dt.bind(o);
}
function xt(t) {
  return t && typeof t == "object" && "then" in t;
}
function Ct(t, r, e) {
  let o, a, i;
  arguments.length === 2 && typeof r == "object" || arguments.length === 1 ? (o = !0, a = t, i = {}) : (o = t, a = r, i = {});
  let l = null, n = Z, c = !1, b = "initialValue" in i, d = typeof o == "function" && ct(o);
  const s = /* @__PURE__ */ new Set(), [x, k] = (i.storage || A)(i.initialValue), [C, _] = A(void 0), [j, B] = A(void 0, {
    equals: !1
  }), [v, y] = A(b ? "ready" : "unresolved");
  function w(p, f, h, T) {
    return l === p && (l = null, T !== void 0 && (b = !0), (p === n || f === n) && i.onHydrated && queueMicrotask(
      () => i.onHydrated(T, {
        value: f
      })
    ), n = Z, E(f, h)), f;
  }
  function E(p, f) {
    $(() => {
      f === void 0 && k(() => p), y(f !== void 0 ? "errored" : b ? "ready" : "unresolved"), _(f);
      for (const h of s.keys()) h.decrement();
      s.clear();
    }, !1);
  }
  function K() {
    const p = Et, f = x(), h = C();
    if (h !== void 0 && !l) throw h;
    return u && !u.user && p && et(() => {
      j(), l && (p.resolved || s.has(p) || (p.increment(), s.add(p)));
    }), f;
  }
  function H(p = !0) {
    if (p !== !1 && c) return;
    c = !1;
    const f = d ? d() : o;
    if (f == null || f === !1) {
      w(l, P(x));
      return;
    }
    const h = n !== Z ? n : P(
      () => a(f, {
        value: x(),
        refetching: p
      })
    );
    return xt(h) ? (l = h, "value" in h ? (h.status === "success" ? w(l, h.value, void 0, f) : w(l, void 0, J(h.value), f), h) : (c = !0, queueMicrotask(() => c = !1), $(() => {
      y(b ? "refreshing" : "pending"), B();
    }, !1), h.then(
      (T) => w(h, T, void 0, f),
      (T) => w(h, void 0, J(T), f)
    ))) : (w(l, h, void 0, f), h);
  }
  return Object.defineProperties(K, {
    state: {
      get: () => v()
    },
    error: {
      get: () => C()
    },
    loading: {
      get() {
        const p = v();
        return p === "pending" || p === "refreshing";
      }
    },
    latest: {
      get() {
        if (!b) return K();
        const p = C();
        if (p && !l) throw p;
        return x();
      }
    }
  }), d ? et(() => H(!1)) : H(!1), [
    K,
    {
      refetch: H,
      mutate: k
    }
  ];
}
function P(t) {
  if (u === null) return t();
  const r = u;
  u = null;
  try {
    return t();
  } finally {
    u = r;
  }
}
function _t(t) {
  return g === null || (g.cleanups === null ? g.cleanups = [t] : g.cleanups.push(t)), t;
}
let Et;
function dt() {
  if (this.sources && this.state)
    if (this.state === S) L(this);
    else {
      const t = m;
      m = null, $(() => I(this), !1), m = t;
    }
  if (u) {
    const t = this.observers ? this.observers.length : 0;
    u.sources ? (u.sources.push(this), u.sourceSlots.push(t)) : (u.sources = [this], u.sourceSlots = [t]), this.observers ? (this.observers.push(u), this.observerSlots.push(u.sources.length - 1)) : (this.observers = [u], this.observerSlots = [u.sources.length - 1]);
  }
  return this.value;
}
function bt(t, r, e) {
  let o = t.value;
  return (!t.comparator || !t.comparator(o, r)) && (t.value = r, t.observers && t.observers.length && $(() => {
    for (let a = 0; a < t.observers.length; a += 1) {
      const i = t.observers[a], l = G && G.running;
      l && G.disposed.has(i), (l ? !i.tState : !i.state) && (i.pure ? m.push(i) : z.push(i), i.observers && ft(i)), l || (i.state = S);
    }
    if (m.length > 1e6)
      throw m = [], new Error();
  }, !1)), r;
}
function L(t) {
  if (!t.fn) return;
  U(t);
  const r = q;
  St(
    t,
    t.value,
    r
  );
}
function St(t, r, e) {
  let o;
  const a = g, i = u;
  u = g = t;
  try {
    o = t.fn(r);
  } catch (l) {
    return t.pure && (t.state = S, t.owned && t.owned.forEach(U), t.owned = null), t.updatedAt = e + 1, ht(l);
  } finally {
    u = i, g = a;
  }
  (!t.updatedAt || t.updatedAt <= e) && (t.updatedAt != null && "observers" in t ? bt(t, o) : t.value = o, t.updatedAt = e);
}
function W(t, r, e, o = S, a) {
  const i = {
    fn: t,
    state: o,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: r,
    owner: g,
    context: g ? g.context : null,
    pure: e
  };
  return g === null || g !== st && (g.owned ? g.owned.push(i) : g.owned = [i]), i;
}
function ut(t) {
  if (t.state === 0) return;
  if (t.state === M) return I(t);
  if (t.suspense && P(t.suspense.inFallback)) return t.suspense.effects.push(t);
  const r = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < q); )
    t.state && r.push(t);
  for (let e = r.length - 1; e >= 0; e--)
    if (t = r[e], t.state === S)
      L(t);
    else if (t.state === M) {
      const o = m;
      m = null, $(() => I(t, r[0]), !1), m = o;
    }
}
function $(t, r) {
  if (m) return t();
  let e = !1;
  r || (m = []), z ? e = !0 : z = [], q++;
  try {
    const o = t();
    return At(e), o;
  } catch (o) {
    e || (z = null), m = null, ht(o);
  }
}
function At(t) {
  if (m && (pt(m), m = null), t) return;
  const r = z;
  z = null, r.length && $(() => vt(r), !1);
}
function pt(t) {
  for (let r = 0; r < t.length; r++) ut(t[r]);
}
function I(t, r) {
  t.state = 0;
  for (let e = 0; e < t.sources.length; e += 1) {
    const o = t.sources[e];
    if (o.sources) {
      const a = o.state;
      a === S ? o !== r && (!o.updatedAt || o.updatedAt < q) && ut(o) : a === M && I(o, r);
    }
  }
}
function ft(t) {
  for (let r = 0; r < t.observers.length; r += 1) {
    const e = t.observers[r];
    e.state || (e.state = M, e.pure ? m.push(e) : z.push(e), e.observers && ft(e));
  }
}
function U(t) {
  let r;
  if (t.sources)
    for (; t.sources.length; ) {
      const e = t.sources.pop(), o = t.sourceSlots.pop(), a = e.observers;
      if (a && a.length) {
        const i = a.pop(), l = e.observerSlots.pop();
        o < a.length && (i.sourceSlots[l] = o, a[o] = i, e.observerSlots[o] = l);
      }
    }
  if (t.owned) {
    for (r = t.owned.length - 1; r >= 0; r--) U(t.owned[r]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (r = t.cleanups.length - 1; r >= 0; r--) t.cleanups[r]();
    t.cleanups = null;
  }
  t.state = 0;
}
function J(t) {
  return t instanceof Error ? t : new Error(typeof t == "string" ? t : "Unknown error", {
    cause: t
  });
}
function ht(t, r = g) {
  throw J(t);
}
const zt = Symbol("fallback");
function rt(t) {
  for (let r = 0; r < t.length; r++) t[r]();
}
function $t(t, r, e = {}) {
  let o = [], a = [], i = [], l = 0, n = r.length > 1 ? [] : null;
  return _t(() => rt(i)), () => {
    let c = t() || [], b = c.length, d, s;
    return c[kt], P(() => {
      let k, C, _, j, B, v, y, w, E;
      if (b === 0)
        l !== 0 && (rt(i), i = [], o = [], a = [], l = 0, n && (n = [])), e.fallback && (o = [zt], a[0] = R((K) => (i[0] = K, e.fallback())), l = 1);
      else if (l === 0) {
        for (a = new Array(b), s = 0; s < b; s++)
          o[s] = c[s], a[s] = R(x);
        l = b;
      } else {
        for (_ = new Array(b), j = new Array(b), n && (B = new Array(b)), v = 0, y = Math.min(l, b); v < y && o[v] === c[v]; v++) ;
        for (y = l - 1, w = b - 1; y >= v && w >= v && o[y] === c[w]; y--, w--)
          _[w] = a[y], j[w] = i[y], n && (B[w] = n[y]);
        for (k = /* @__PURE__ */ new Map(), C = new Array(w + 1), s = w; s >= v; s--)
          E = c[s], d = k.get(E), C[s] = d === void 0 ? -1 : d, k.set(E, s);
        for (d = v; d <= y; d++)
          E = o[d], s = k.get(E), s !== void 0 && s !== -1 ? (_[s] = a[d], j[s] = i[d], n && (B[s] = n[d]), s = C[s], k.set(E, s)) : i[d]();
        for (s = v; s < b; s++)
          s in _ ? (a[s] = _[s], i[s] = j[s], n && (n[s] = B[s], n[s](s))) : a[s] = R(x);
        a = a.slice(0, l = b), o = c.slice(0);
      }
      return a;
    });
    function x(k) {
      if (i[s] = k, n) {
        const [C, _] = A(s);
        return n[s] = _, r(c[s], C);
      }
      return r(c[s]);
    }
  };
}
let jt = !1;
function tt(t, r) {
  return P(() => t(r || {}));
}
function Bt(t) {
  const r = "fallback" in t && {
    fallback: () => t.fallback
  };
  return ct($t(() => t.each, t.children, r || void 0));
}
function Tt(t, r, e) {
  let o = e.length, a = r.length, i = o, l = 0, n = 0, c = r[a - 1].nextSibling, b = null;
  for (; l < a || n < i; ) {
    if (r[l] === e[n]) {
      l++, n++;
      continue;
    }
    for (; r[a - 1] === e[i - 1]; )
      a--, i--;
    if (a === l) {
      const d = i < o ? n ? e[n - 1].nextSibling : e[i - n] : c;
      for (; n < i; ) t.insertBefore(e[n++], d);
    } else if (i === n)
      for (; l < a; )
        (!b || !b.has(r[l])) && r[l].remove(), l++;
    else if (r[l] === e[i - 1] && e[n] === r[a - 1]) {
      const d = r[--a].nextSibling;
      t.insertBefore(e[n++], r[l++].nextSibling), t.insertBefore(e[--i], d), r[a] = e[i];
    } else {
      if (!b) {
        b = /* @__PURE__ */ new Map();
        let s = n;
        for (; s < i; ) b.set(e[s], s++);
      }
      const d = b.get(r[l]);
      if (d != null)
        if (n < d && d < i) {
          let s = l, x = 1, k;
          for (; ++s < a && s < i && !((k = b.get(r[s])) == null || k !== d + x); )
            x++;
          if (x > d - n) {
            const C = r[l];
            for (; n < d; ) t.insertBefore(e[n++], C);
          } else t.replaceChild(e[n++], r[l++]);
        } else l++;
      else r[l++].remove();
    }
  }
}
const at = "_$DX_DELEGATE";
function F(t, r, e) {
  let o;
  const a = () => {
    const l = document.createElement("template");
    return l.innerHTML = t, l.content.firstChild;
  }, i = () => (o || (o = a())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function Ot(t, r = window.document) {
  const e = r[at] || (r[at] = /* @__PURE__ */ new Set());
  for (let o = 0, a = t.length; o < a; o++) {
    const i = t[o];
    e.has(i) || (e.add(i), r.addEventListener(i, Dt));
  }
}
function ot(t, r, e) {
  e == null ? t.removeAttribute(r) : t.setAttribute(r, e);
}
function Pt(t, r, e = {}) {
  const o = Object.keys(r || {}), a = Object.keys(e);
  let i, l;
  for (i = 0, l = a.length; i < l; i++) {
    const n = a[i];
    !n || n === "undefined" || r[n] || (it(t, n, !1), delete e[n]);
  }
  for (i = 0, l = o.length; i < l; i++) {
    const n = o[i], c = !!r[n];
    !n || n === "undefined" || e[n] === c || !c || (it(t, n, !0), e[n] = c);
  }
  return e;
}
function D(t, r, e, o) {
  if (e !== void 0 && !o && (o = []), typeof r != "function") return Y(t, r, o, e);
  N((a) => Y(t, r(), a, e), o);
}
function it(t, r, e) {
  const o = r.trim().split(/\s+/);
  for (let a = 0, i = o.length; a < i; a++)
    t.classList.toggle(o[a], e);
}
function Dt(t) {
  const r = `$$${t.type}`;
  let e = t.composedPath && t.composedPath()[0] || t.target;
  for (t.target !== e && Object.defineProperty(t, "target", {
    configurable: !0,
    value: e
  }), Object.defineProperty(t, "currentTarget", {
    configurable: !0,
    get() {
      return e || document;
    }
  }); e; ) {
    const o = e[r];
    if (o && !e.disabled) {
      const a = e[`${r}Data`];
      if (a !== void 0 ? o.call(e, a, t) : o.call(e, t), t.cancelBubble) return;
    }
    e = e._$host || e.parentNode || e.host;
  }
}
function Y(t, r, e, o, a) {
  for (; typeof e == "function"; ) e = e();
  if (r === e) return e;
  const i = typeof r, l = o !== void 0;
  if (t = l && e[0] && e[0].parentNode || t, i === "string" || i === "number") {
    if (i === "number" && (r = r.toString(), r === e))
      return e;
    if (l) {
      let n = e[0];
      n && n.nodeType === 3 ? n.data !== r && (n.data = r) : n = document.createTextNode(r), e = O(t, e, o, n);
    } else
      e !== "" && typeof e == "string" ? e = t.firstChild.data = r : e = t.textContent = r;
  } else if (r == null || i === "boolean")
    e = O(t, e, o);
  else {
    if (i === "function")
      return N(() => {
        let n = r();
        for (; typeof n == "function"; ) n = n();
        e = Y(t, n, e, o);
      }), () => e;
    if (Array.isArray(r)) {
      const n = [], c = e && Array.isArray(e);
      if (Q(n, r, e, a))
        return N(() => e = Y(t, n, e, o, !0)), () => e;
      if (n.length === 0) {
        if (e = O(t, e, o), l) return e;
      } else c ? e.length === 0 ? nt(t, n, o) : Tt(t, e, n) : (e && O(t), nt(t, n));
      e = n;
    } else if (r.nodeType) {
      if (Array.isArray(e)) {
        if (l) return e = O(t, e, o, r);
        O(t, e, null, r);
      } else e == null || e === "" || !t.firstChild ? t.appendChild(r) : t.replaceChild(r, t.firstChild);
      e = r;
    }
  }
  return e;
}
function Q(t, r, e, o) {
  let a = !1;
  for (let i = 0, l = r.length; i < l; i++) {
    let n = r[i], c = e && e[t.length], b;
    if (!(n == null || n === !0 || n === !1)) if ((b = typeof n) == "object" && n.nodeType)
      t.push(n);
    else if (Array.isArray(n))
      a = Q(t, n, c) || a;
    else if (b === "function")
      if (o) {
        for (; typeof n == "function"; ) n = n();
        a = Q(
          t,
          Array.isArray(n) ? n : [n],
          Array.isArray(c) ? c : [c]
        ) || a;
      } else
        t.push(n), a = !0;
    else {
      const d = String(n);
      c && c.nodeType === 3 && c.data === d ? t.push(c) : t.push(document.createTextNode(d));
    }
  }
  return a;
}
function nt(t, r, e = null) {
  for (let o = 0, a = r.length; o < a; o++) t.insertBefore(r[o], e);
}
function O(t, r, e, o) {
  if (e === void 0) return t.textContent = "";
  const a = o || document.createTextNode("");
  if (r.length) {
    let i = !1;
    for (let l = r.length - 1; l >= 0; l--) {
      const n = r[l];
      if (a !== n) {
        const c = n.parentNode === t;
        !i && !l ? c ? t.replaceChild(a, n) : t.insertBefore(a, e) : c && n.remove();
      } else i = !0;
    }
  } else t.insertBefore(a, e);
  return [a];
}
function Kt(t) {
  return Object.keys(t).reduce((e, o) => {
    const a = t[o];
    return e[o] = Object.assign({}, a), wt(a.value) && !Vt(a.value) && !Array.isArray(a.value) && (e[o].value = Object.assign({}, a.value)), Array.isArray(a.value) && (e[o].value = a.value.slice(0)), e;
  }, {});
}
function Nt(t) {
  return t ? Object.keys(t).reduce((e, o) => {
    const a = t[o];
    return e[o] = wt(a) && "value" in a ? a : {
      value: a
    }, e[o].attribute || (e[o].attribute = Rt(o)), e[o].parse = "parse" in e[o] ? e[o].parse : typeof e[o].value != "string", e;
  }, {}) : {};
}
function Lt(t) {
  return Object.keys(t).reduce((e, o) => (e[o] = t[o].value, e), {});
}
function Ft(t, r) {
  const e = Kt(r);
  return Object.keys(r).forEach((a) => {
    const i = e[a], l = t.getAttribute(i.attribute), n = t[a];
    l && (i.value = i.parse ? gt(l) : l), n != null && (i.value = Array.isArray(n) ? n.slice(0) : n), i.reflect && lt(t, i.attribute, i.value, !!i.parse), Object.defineProperty(t, a, {
      get() {
        return i.value;
      },
      set(c) {
        const b = i.value;
        i.value = c, i.reflect && lt(this, i.attribute, i.value, !!i.parse);
        for (let d = 0, s = this.__propertyChangedCallbacks.length; d < s; d++)
          this.__propertyChangedCallbacks[d](a, c, b);
      },
      enumerable: !0,
      configurable: !0
    });
  }), e;
}
function gt(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function lt(t, r, e, o) {
  if (e == null || e === !1) return t.removeAttribute(r);
  let a = o ? JSON.stringify(e) : e;
  t.__updating[r] = !0, a === "true" && (a = ""), t.setAttribute(r, a), Promise.resolve().then(() => delete t.__updating[r]);
}
function Rt(t) {
  return t.replace(/\.?([A-Z]+)/g, (r, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function wt(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function Vt(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function Mt(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let X;
function It(t, r) {
  const e = Object.keys(r);
  return class extends t {
    static get observedAttributes() {
      return e.map((a) => r[a].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Ft(this, r);
      const a = Lt(this.props), i = this.Component, l = X;
      try {
        X = this, this.__initialized = !0, Mt(i) ? new i(a, {
          element: this
        }) : i(a, {
          element: this
        });
      } finally {
        X = l;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let a = null;
      for (; a = this.__releaseCallbacks.pop(); ) a(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(a, i, l) {
      if (this.__initialized && !this.__updating[a] && (a = this.lookupProp(a), a in r)) {
        if (l == null && !this[a]) return;
        this[a] = r[a].parse ? gt(l) : l;
      }
    }
    lookupProp(a) {
      if (r)
        return e.find((i) => a === i || a === r[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(a) {
      this.__releaseCallbacks.push(a);
    }
    addPropertyChangedCallback(a) {
      this.__propertyChangedCallbacks.push(a);
    }
  };
}
function Yt(t, r = {}, e = {}) {
  const {
    BaseElement: o = HTMLElement,
    extension: a,
    customElements: i = window.customElements
  } = e;
  return (l) => {
    let n = i.get(t);
    return n ? (n.prototype.Component = l, n) : (n = It(o, Nt(r)), n.prototype.Component = l, n.prototype.registeredTag = t, i.define(t, n, a), n);
  };
}
function qt(t) {
  const r = Object.keys(t), e = {};
  for (let o = 0; o < r.length; o++) {
    const [a, i] = A(t[r[o]]);
    Object.defineProperty(e, r[o], {
      get: a,
      set(l) {
        i(() => l);
      }
    });
  }
  return e;
}
function Ut(t) {
  if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
  let r = t.parentNode;
  for (; r && !r._$owner && !(r.assignedSlot && r.assignedSlot._$owner); )
    r = r.parentNode;
  return r && r.assignedSlot ? r.assignedSlot._$owner : t._$owner;
}
function Ht(t) {
  return (r, e) => {
    const { element: o } = e;
    return R((a) => {
      const i = qt(r);
      o.addPropertyChangedCallback((n, c) => i[n] = c), o.addReleaseCallback(() => {
        o.renderRoot.textContent = "", a();
      });
      const l = t(i, e);
      return D(o.renderRoot, l);
    }, Ut(o));
  };
}
function Zt(t, r, e) {
  return arguments.length === 2 && (e = r, r = {}), Yt(t, r)(Ht(e));
}
const Gt = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}:root,[data-theme]{background-color:var(--fallback-b1,oklch(var(--b1)/1));color:var(--fallback-bc,oklch(var(--bc)/1))}@supports not (color: oklch(0% 0 0)){:root{color-scheme:light;--fallback-p: #491eff;--fallback-pc: #d4dbff;--fallback-s: #ff41c7;--fallback-sc: #fff9fc;--fallback-a: #00cfbd;--fallback-ac: #00100d;--fallback-n: #2b3440;--fallback-nc: #d7dde4;--fallback-b1: #ffffff;--fallback-b2: #e5e6e6;--fallback-b3: #e5e6e6;--fallback-bc: #1f2937;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}@media (prefers-color-scheme: dark){:root{color-scheme:dark;--fallback-p: #7582ff;--fallback-pc: #050617;--fallback-s: #ff71cf;--fallback-sc: #190211;--fallback-a: #00c7b5;--fallback-ac: #000e0c;--fallback-n: #2a323c;--fallback-nc: #a6adbb;--fallback-b1: #1d232a;--fallback-b2: #191e24;--fallback-b3: #15191e;--fallback-bc: #a6adbb;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}}}html{-webkit-tap-highlight-color:transparent}*{scrollbar-color:color-mix(in oklch,currentColor 35%,transparent) transparent}*:hover{scrollbar-color:color-mix(in oklch,currentColor 60%,transparent) transparent}*{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}@media (prefers-color-scheme: dark){*{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}}[data-theme=light]{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}[data-theme=dark]{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.container{width:100%;padding-right:1rem;padding-left:1rem}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.avatar.placeholder>div{display:flex;align-items:center;justify-content:center}@media (hover:hover){.tab:hover{--tw-text-opacity: 1}.tabs-boxed :is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):hover,.tabs-boxed :is(input:checked):hover{--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.table tr.hover:hover,.table tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}.table-zebra tr.hover:hover,.table-zebra tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1;background-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))}}@media (hover: hover){.tab[disabled],.tab[disabled]:hover{cursor:not-allowed;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}}.input{flex-shrink:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:3rem;padding-left:1rem;padding-right:1rem;font-size:1rem;line-height:2;line-height:1.5rem;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.input[type=number]::-webkit-inner-spin-button,.input-md[type=number]::-webkit-inner-spin-button{margin-top:-1rem;margin-bottom:-1rem;margin-inline-end:-1rem}.link{cursor:pointer;text-decoration-line:underline}.radio{flex-shrink:0;--chkbg: var(--bc);height:1.5rem;width:1.5rem;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:9999px;border-width:1px;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2}.tabs{display:grid;align-items:flex-end}.tabs-lifted:has(.tab-content[class^=rounded-]) .tab:first-child:not(:is(.tab-active,[aria-selected=true])),.tabs-lifted:has(.tab-content[class*=" rounded-"]) .tab:first-child:not(:is(.tab-active,[aria-selected=true])){border-bottom-color:transparent}.tab{position:relative;grid-row-start:1;display:inline-flex;height:2rem;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;flex-wrap:wrap;align-items:center;justify-content:center;text-align:center;font-size:.875rem;line-height:1.25rem;line-height:2;--tab-padding: 1rem;--tw-text-opacity: .5;--tab-color: var(--fallback-bc,oklch(var(--bc)/1));--tab-bg: var(--fallback-b1,oklch(var(--b1)/1));--tab-border-color: var(--fallback-b3,oklch(var(--b3)/1));color:var(--tab-color);padding-inline-start:var(--tab-padding, 1rem);padding-inline-end:var(--tab-padding, 1rem)}.tab:is(input[type=radio]){width:auto;border-bottom-right-radius:0;border-bottom-left-radius:0}.tab:is(input[type=radio]):after{--tw-content: attr(aria-label);content:var(--tw-content)}.tab:not(input):empty{cursor:default;grid-column-start:span 9999}.tab-content{grid-column-start:1;grid-column-end:span 9999;grid-row-start:2;margin-top:calc(var(--tab-border) * -1);display:none;border-color:transparent;border-width:var(--tab-border, 0)}:checked+.tab-content:nth-child(2),:is(.tab-active,[aria-selected=true])+.tab-content:nth-child(2){border-start-start-radius:0px}input.tab:checked+.tab-content,:is(.tab-active,[aria-selected=true])+.tab-content{display:block}.table{position:relative;width:100%;border-radius:var(--rounded-box, 1rem);text-align:left;font-size:.875rem;line-height:1.25rem}.table :where(.table-pin-rows thead tr){position:sticky;top:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.table :where(.table-pin-rows tfoot tr){position:sticky;bottom:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.table :where(.table-pin-cols tr th){position:sticky;left:0;right:0;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}@keyframes button-pop{0%{transform:scale(var(--btn-focus-scale, .98))}40%{transform:scale(1.02)}to{transform:scale(1)}}@keyframes checkmark{0%{background-position-y:5px}50%{background-position-y:-2px}to{background-position-y:0}}.input input{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));background-color:transparent}.input input:focus{outline:2px solid transparent;outline-offset:2px}.input[list]::-webkit-calendar-picker-indicator{line-height:1em}.input:focus,.input:focus-within{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.input:has(>input[disabled]),.input-disabled,.input:disabled,.input[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}.input:has(>input[disabled])::-moz-placeholder,.input-disabled::-moz-placeholder,.input:disabled::-moz-placeholder,.input[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])::placeholder,.input-disabled::placeholder,.input:disabled::placeholder,.input[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])>input[disabled]{cursor:not-allowed}.input::-webkit-date-and-time-value{text-align:inherit}.link:focus{outline:2px solid transparent;outline-offset:2px}.link:focus-visible{outline:2px solid currentColor;outline-offset:2px}.loading{pointer-events:none;display:inline-block;aspect-ratio:1 / 1;width:1.5rem;background-color:currentColor;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E")}.mockup-browser .mockup-browser-toolbar .input{position:relative;margin-left:auto;margin-right:auto;display:block;height:1.75rem;width:24rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));padding-left:2rem;direction:ltr}.mockup-browser .mockup-browser-toolbar .input:before{content:"";position:absolute;left:.5rem;top:50%;aspect-ratio:1 / 1;height:.75rem;--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:2px;border-color:currentColor;opacity:.6}.mockup-browser .mockup-browser-toolbar .input:after{content:"";position:absolute;left:1.25rem;top:50%;height:.5rem;--tw-translate-y: 25%;--tw-rotate: -45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:1px;border-color:currentColor;opacity:.6}@keyframes modal-pop{0%{opacity:0}}@keyframes progress-loading{50%{background-position-x:-115%}}.radio:focus{box-shadow:none}.radio:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/1))}.radio:checked,.radio[aria-checked=true]{--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));background-image:none;animation:radiomark var(--animation-input, .2s) ease-out;box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}.radio:disabled{cursor:not-allowed;opacity:.2}@keyframes radiomark{0%{box-shadow:0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset}50%{box-shadow:0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset}to{box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}}@keyframes rating-pop{0%{transform:translateY(-.125em)}40%{transform:translateY(-.125em)}to{transform:translateY(0)}}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}.tabs-lifted>.tab:focus-visible{border-end-end-radius:0;border-end-start-radius:0}.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]),.tab:is(input:checked){border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: 1;--tw-text-opacity: 1}.tab:focus{outline:2px solid transparent;outline-offset:2px}.tab:focus-visible{outline:2px solid currentColor;outline-offset:-5px}.tab-disabled,.tab[disabled]{cursor:not-allowed;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.tabs-bordered>.tab{border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2;border-style:solid;border-bottom-width:calc(var(--tab-border, 1px) + 1px)}.tabs-lifted>.tab{border:var(--tab-border, 1px) solid transparent;border-width:0 0 var(--tab-border, 1px) 0;border-start-start-radius:var(--tab-radius, .5rem);border-start-end-radius:var(--tab-radius, .5rem);border-bottom-color:var(--tab-border-color);padding-inline-start:var(--tab-padding, 1rem);padding-inline-end:var(--tab-padding, 1rem);padding-top:var(--tab-border, 1px)}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]),.tabs-lifted>.tab:is(input:checked){background-color:var(--tab-bg);border-width:var(--tab-border, 1px) var(--tab-border, 1px) 0 var(--tab-border, 1px);border-inline-start-color:var(--tab-border-color);border-inline-end-color:var(--tab-border-color);border-top-color:var(--tab-border-color);padding-inline-start:calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));padding-inline-end:calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));padding-bottom:var(--tab-border, 1px);padding-top:0}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):before,.tabs-lifted>.tab:is(input:checked):before{z-index:1;content:"";display:block;position:absolute;width:calc(100% + var(--tab-radius, .5rem) * 2);height:var(--tab-radius, .5rem);bottom:0;background-size:var(--tab-radius, .5rem);background-position:top left,top right;background-repeat:no-repeat;--tab-grad: calc(69% - var(--tab-border, 1px));--radius-start: radial-gradient( circle at top left, transparent var(--tab-grad), var(--tab-border-color) calc(var(--tab-grad) + .25px), var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)), var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + .25px) );--radius-end: radial-gradient( circle at top right, transparent var(--tab-grad), var(--tab-border-color) calc(var(--tab-grad) + .25px), var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)), var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + .25px) );background-image:var(--radius-start),var(--radius-end)}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):first-child:before,.tabs-lifted>.tab:is(input:checked):first-child:before{background-image:var(--radius-end);background-position:top right}[dir=rtl] .tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):first-child:before,[dir=rtl] .tabs-lifted>.tab:is(input:checked):first-child:before{background-image:var(--radius-start);background-position:top left}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):last-child:before,.tabs-lifted>.tab:is(input:checked):last-child:before{background-image:var(--radius-start);background-position:top left}[dir=rtl] .tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):last-child:before,[dir=rtl] .tabs-lifted>.tab:is(input:checked):last-child:before{background-image:var(--radius-end);background-position:top right}.tabs-lifted>:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled])+.tabs-lifted :is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):before,.tabs-lifted>.tab:is(input:checked)+.tabs-lifted .tab:is(input:checked):before{background-image:var(--radius-end);background-position:top right}.tabs-boxed .tab{border-radius:var(--rounded-btn, .5rem)}.tabs-boxed :is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]),.tabs-boxed :is(input:checked){--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));--tw-text-opacity: 1;color:var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))}.table:where([dir=rtl],[dir=rtl] *){text-align:right}.table :where(th,td){padding:.75rem 1rem;vertical-align:middle}.table tr.active,.table tr.active:nth-child(2n),.table-zebra tbody tr:nth-child(2n){--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}.table :where(thead tr,tbody tr:not(:last-child),tbody tr:first-child:last-child){border-bottom-width:1px;--tw-border-opacity: 1;border-bottom-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}.table :where(thead,tfoot){white-space:nowrap;font-size:.75rem;line-height:1rem;font-weight:700;color:var(--fallback-bc,oklch(var(--bc)/.6))}.table :where(tfoot){border-top-width:1px;--tw-border-opacity: 1;border-top-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}@keyframes toast-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}.tabs-md :where(.tab){height:2rem;font-size:.875rem;line-height:1.25rem;line-height:2;--tab-padding: 1rem}.tabs-lg :where(.tab){height:3rem;font-size:1.125rem;line-height:1.75rem;line-height:2;--tab-padding: 1.25rem}.tabs-sm :where(.tab){height:1.5rem;font-size:.875rem;line-height:.75rem;--tab-padding: .75rem}.tabs-xs :where(.tab){height:1.25rem;font-size:.75rem;line-height:.75rem;--tab-padding: .5rem}.table-xs :not(thead):not(tfoot) tr{font-size:.75rem;line-height:1rem}.table-xs :where(th,td){padding:.25rem .5rem}.mx-auto{margin-left:auto!important;margin-right:auto!important}.inline{display:inline!important}.table{display:table!important}.overflow-auto{overflow:auto!important}.overflow-x-auto{overflow-x:auto!important}.rounded-box{border-radius:var(--rounded-box, 1rem)!important}.border-base-300{--tw-border-opacity: 1 !important;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)))!important}.bg-base-100{--tw-bg-opacity: 1 !important;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))!important}.bg-white{--tw-bg-opacity: 1 !important;background-color:rgb(255 255 255 / var(--tw-bg-opacity))!important}.p-6{padding:1.5rem!important}.text-black{color:#000000d9!important}.text-lavender-blue{--tw-text-opacity: 1 !important;color:rgb(166 170 255 / var(--tw-text-opacity))!important}.\\[--tw-border-opacity\\:0\\]{--tw-border-opacity: 0 !important}.tab-active{--tw-border-opacity: 1 !important;border-color:rgb(119 122 242 / var(--tw-border-opacity))!important;--tw-text-opacity: 1;color:rgb(119 122 242 / var(--tw-text-opacity))}.hover\\:text-lavender-blue:hover{--tw-text-opacity: 1 !important;color:rgb(166 170 255 / var(--tw-text-opacity))!important}`, Xt = [
  "Pages",
  "Fields",
  "RelatedFields",
  "DomainTables",
  "RateTables",
  "DataDef",
  "TableTypes",
  "Rules"
];
var Jt = /* @__PURE__ */ F('<div class="tabs tabs-bordered">'), Qt = /* @__PURE__ */ F('<input type=radio class="tab [--tw-border-opacity:0]">'), Wt = /* @__PURE__ */ F('<div class="tab-content bg-base-100 border-base-300 p-6">Hello <!>!');
const te = async () => (await fetch("http://localhost:5000/products")).json();
function ee() {
  const [t, r] = A("tab1");
  return Ct(te), (() => {
    var e = Jt();
    return D(e, tt(Bt, {
      each: Xt,
      children: (o, a) => {
        const i = `tab${a()}`;
        return console.log(i), [(() => {
          var l = Qt();
          return l.$$click = () => r(i), ot(l, "id", i), ot(l, "aria-label", o), N((n) => Pt(l, {
            "tab-active": t() === i,
            "hover:text-lavender-blue": t() !== i
          }, n)), N(() => l.checked = t() === i), l;
        })(), (() => {
          var l = Wt(), n = l.firstChild, c = n.nextSibling;
          return c.nextSibling, D(l, o, c), l;
        })()];
      }
    })), e;
  })();
}
Ot(["click"]);
var re = /* @__PURE__ */ F('<div class="container mx-auto overflow-auto text-black bg-white">');
const ae = () => (() => {
  var t = re();
  return D(t, tt(ee, {})), t;
})();
var oe = /* @__PURE__ */ F("<div><style>");
Zt("pe-view", () => (() => {
  var t = oe(), r = t.firstChild;
  return D(r, Gt), D(t, tt(ae, {}), null), t;
})());
