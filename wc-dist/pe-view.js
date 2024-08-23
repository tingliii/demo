const mt = (t, r) => t === r, D = {
  equals: mt
};
let kt = lt;
const x = 1, L = 2, at = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, F = {};
var g = null;
let G = null, vt = null, d = null, h = null, S = null, R = 0;
function yt(t, r) {
  const e = d, a = g, o = t.length === 0, n = r === void 0 ? a : r, l = o ? at : {
    owned: null,
    cleanups: null,
    context: n ? n.context : null,
    owner: n
  }, i = o ? t : () => t(() => k(() => V(l)));
  g = l, d = null;
  try {
    return A(i, !0);
  } finally {
    d = e, g = a;
  }
}
function _(t, r) {
  r = r ? Object.assign({}, D, r) : D;
  const e = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: r.equals || void 0
  }, a = (o) => (typeof o == "function" && (o = o(e.value)), nt(e, o));
  return [ot.bind(e), a];
}
function Q(t, r, e) {
  const a = W(t, r, !0, x);
  O(a);
}
function T(t, r, e) {
  const a = W(t, r, !1, x);
  O(a);
}
function E(t, r, e) {
  e = e ? Object.assign({}, D, e) : D;
  const a = W(t, r, !0, 0);
  return a.observers = null, a.observerSlots = null, a.comparator = e.equals || void 0, O(a), ot.bind(a);
}
function xt(t) {
  return t && typeof t == "object" && "then" in t;
}
function Ct(t, r, e) {
  let a, o, n;
  arguments.length === 2 && typeof r == "object" || arguments.length === 1 ? (a = !0, o = t, n = r || {}) : (a = t, o = r, n = {});
  let l = null, i = F, s = !1, b = "initialValue" in n, c = typeof a == "function" && E(a);
  const w = /* @__PURE__ */ new Set(), [v, B] = (n.storage || _)(n.initialValue), [j, ft] = _(void 0), [ht, gt] = _(void 0, {
    equals: !1
  }), [Z, J] = _(b ? "ready" : "unresolved");
  function z(u, p, f, $) {
    return l === u && (l = null, $ !== void 0 && (b = !0), (u === i || p === i) && n.onHydrated && queueMicrotask(
      () => n.onHydrated($, {
        value: p
      })
    ), i = F, wt(p, f)), p;
  }
  function wt(u, p) {
    A(() => {
      p === void 0 && B(() => u), J(p !== void 0 ? "errored" : b ? "ready" : "unresolved"), ft(p);
      for (const f of w.keys()) f.decrement();
      w.clear();
    }, !1);
  }
  function M() {
    const u = St, p = v(), f = j();
    if (f !== void 0 && !l) throw f;
    return d && !d.user && u && Q(() => {
      ht(), l && (u.resolved || w.has(u) || (u.increment(), w.add(u)));
    }), p;
  }
  function K(u = !0) {
    if (u !== !1 && s) return;
    s = !1;
    const p = c ? c() : a;
    if (p == null || p === !1) {
      z(l, k(v));
      return;
    }
    const f = i !== F ? i : k(
      () => o(p, {
        value: v(),
        refetching: u
      })
    );
    return xt(f) ? (l = f, "value" in f ? (f.status === "success" ? z(l, f.value, void 0, p) : z(l, void 0, U(f.value), p), f) : (s = !0, queueMicrotask(() => s = !1), A(() => {
      J(b ? "refreshing" : "pending"), gt();
    }, !1), f.then(
      ($) => z(f, $, void 0, p),
      ($) => z(f, void 0, U($), p)
    ))) : (z(l, f, void 0, p), f);
  }
  return Object.defineProperties(M, {
    state: {
      get: () => Z()
    },
    error: {
      get: () => j()
    },
    loading: {
      get() {
        const u = Z();
        return u === "pending" || u === "refreshing";
      }
    },
    latest: {
      get() {
        if (!b) return M();
        const u = j();
        if (u && !l) throw u;
        return v();
      }
    }
  }), c ? Q(() => K(!1)) : K(!1), [
    M,
    {
      refetch: K,
      mutate: B
    }
  ];
}
function k(t) {
  if (d === null) return t();
  const r = d;
  d = null;
  try {
    return t();
  } finally {
    d = r;
  }
}
function _t(t) {
  const r = E(t), e = E(() => Y(r()));
  return e.toArray = () => {
    const a = e();
    return Array.isArray(a) ? a : a != null ? [a] : [];
  }, e;
}
let St;
function ot() {
  if (this.sources && this.state)
    if (this.state === x) O(this);
    else {
      const t = h;
      h = null, A(() => I(this), !1), h = t;
    }
  if (d) {
    const t = this.observers ? this.observers.length : 0;
    d.sources ? (d.sources.push(this), d.sourceSlots.push(t)) : (d.sources = [this], d.sourceSlots = [t]), this.observers ? (this.observers.push(d), this.observerSlots.push(d.sources.length - 1)) : (this.observers = [d], this.observerSlots = [d.sources.length - 1]);
  }
  return this.value;
}
function nt(t, r, e) {
  let a = t.value;
  return (!t.comparator || !t.comparator(a, r)) && (t.value = r, t.observers && t.observers.length && A(() => {
    for (let o = 0; o < t.observers.length; o += 1) {
      const n = t.observers[o], l = G && G.running;
      l && G.disposed.has(n), (l ? !n.tState : !n.state) && (n.pure ? h.push(n) : S.push(n), n.observers && st(n)), l || (n.state = x);
    }
    if (h.length > 1e6)
      throw h = [], new Error();
  }, !1)), r;
}
function O(t) {
  if (!t.fn) return;
  V(t);
  const r = R;
  Et(
    t,
    t.value,
    r
  );
}
function Et(t, r, e) {
  let a;
  const o = g, n = d;
  d = g = t;
  try {
    a = t.fn(r);
  } catch (l) {
    return t.pure && (t.state = x, t.owned && t.owned.forEach(V), t.owned = null), t.updatedAt = e + 1, dt(l);
  } finally {
    d = n, g = o;
  }
  (!t.updatedAt || t.updatedAt <= e) && (t.updatedAt != null && "observers" in t ? nt(t, a) : t.value = a, t.updatedAt = e);
}
function W(t, r, e, a = x, o) {
  const n = {
    fn: t,
    state: a,
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
  return g === null || g !== at && (g.owned ? g.owned.push(n) : g.owned = [n]), n;
}
function it(t) {
  if (t.state === 0) return;
  if (t.state === L) return I(t);
  if (t.suspense && k(t.suspense.inFallback)) return t.suspense.effects.push(t);
  const r = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < R); )
    t.state && r.push(t);
  for (let e = r.length - 1; e >= 0; e--)
    if (t = r[e], t.state === x)
      O(t);
    else if (t.state === L) {
      const a = h;
      h = null, A(() => I(t, r[0]), !1), h = a;
    }
}
function A(t, r) {
  if (h) return t();
  let e = !1;
  r || (h = []), S ? e = !0 : S = [], R++;
  try {
    const a = t();
    return At(e), a;
  } catch (a) {
    e || (S = null), h = null, dt(a);
  }
}
function At(t) {
  if (h && (lt(h), h = null), t) return;
  const r = S;
  S = null, r.length && A(() => kt(r), !1);
}
function lt(t) {
  for (let r = 0; r < t.length; r++) it(t[r]);
}
function I(t, r) {
  t.state = 0;
  for (let e = 0; e < t.sources.length; e += 1) {
    const a = t.sources[e];
    if (a.sources) {
      const o = a.state;
      o === x ? a !== r && (!a.updatedAt || a.updatedAt < R) && it(a) : o === L && I(a, r);
    }
  }
}
function st(t) {
  for (let r = 0; r < t.observers.length; r += 1) {
    const e = t.observers[r];
    e.state || (e.state = L, e.pure ? h.push(e) : S.push(e), e.observers && st(e));
  }
}
function V(t) {
  let r;
  if (t.sources)
    for (; t.sources.length; ) {
      const e = t.sources.pop(), a = t.sourceSlots.pop(), o = e.observers;
      if (o && o.length) {
        const n = o.pop(), l = e.observerSlots.pop();
        a < o.length && (n.sourceSlots[l] = a, o[a] = n, e.observerSlots[a] = l);
      }
    }
  if (t.owned) {
    for (r = t.owned.length - 1; r >= 0; r--) V(t.owned[r]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (r = t.cleanups.length - 1; r >= 0; r--) t.cleanups[r]();
    t.cleanups = null;
  }
  t.state = 0;
}
function U(t) {
  return t instanceof Error ? t : new Error(typeof t == "string" ? t : "Unknown error", {
    cause: t
  });
}
function dt(t, r = g) {
  throw U(t);
}
function Y(t) {
  if (typeof t == "function" && !t.length) return Y(t());
  if (Array.isArray(t)) {
    const r = [];
    for (let e = 0; e < t.length; e++) {
      const a = Y(t[e]);
      Array.isArray(a) ? r.push.apply(r, a) : r.push(a);
    }
    return r;
  }
  return t;
}
let zt = !1;
function y(t, r) {
  return k(() => t(r || {}));
}
const ct = (t) => `Stale read from <${t}>.`;
function $t(t) {
  const r = t.keyed, e = E(() => t.when, void 0, {
    equals: (a, o) => r ? a === o : !a == !o
  });
  return E(
    () => {
      const a = e();
      if (a) {
        const o = t.children;
        return typeof o == "function" && o.length > 0 ? k(
          () => o(
            r ? a : () => {
              if (!k(e)) throw ct("Show");
              return t.when;
            }
          )
        ) : o;
      }
      return t.fallback;
    },
    void 0,
    void 0
  );
}
function Pt(t) {
  let r = !1;
  const e = (n, l) => (r ? n[1] === l[1] : !n[1] == !l[1]) && n[2] === l[2], a = _t(() => t.children), o = E(
    () => {
      let n = a();
      Array.isArray(n) || (n = [n]);
      for (let l = 0; l < n.length; l++) {
        const i = n[l].when;
        if (i)
          return r = !!n[l].keyed, [l, i, n[l]];
      }
      return [-1];
    },
    void 0,
    {
      equals: e
    }
  );
  return E(
    () => {
      const [n, l, i] = o();
      if (n < 0) return t.fallback;
      const s = i.children;
      return typeof s == "function" && s.length > 0 ? k(
        () => s(
          r ? l : () => {
            if (k(o)[0] !== n) throw ct("Match");
            return i.when;
          }
        )
      ) : s;
    },
    void 0,
    void 0
  );
}
function X(t) {
  return t;
}
function Tt(t, r, e) {
  let a = e.length, o = r.length, n = a, l = 0, i = 0, s = r[o - 1].nextSibling, b = null;
  for (; l < o || i < n; ) {
    if (r[l] === e[i]) {
      l++, i++;
      continue;
    }
    for (; r[o - 1] === e[n - 1]; )
      o--, n--;
    if (o === l) {
      const c = n < a ? i ? e[i - 1].nextSibling : e[n - i] : s;
      for (; i < n; ) t.insertBefore(e[i++], c);
    } else if (n === i)
      for (; l < o; )
        (!b || !b.has(r[l])) && r[l].remove(), l++;
    else if (r[l] === e[n - 1] && e[i] === r[o - 1]) {
      const c = r[--o].nextSibling;
      t.insertBefore(e[i++], r[l++].nextSibling), t.insertBefore(e[--n], c), r[o] = e[n];
    } else {
      if (!b) {
        b = /* @__PURE__ */ new Map();
        let w = i;
        for (; w < n; ) b.set(e[w], w++);
      }
      const c = b.get(r[l]);
      if (c != null)
        if (i < c && c < n) {
          let w = l, v = 1, B;
          for (; ++w < o && w < n && !((B = b.get(r[w])) == null || B !== c + v); )
            v++;
          if (v > c - i) {
            const j = r[l];
            for (; i < c; ) t.insertBefore(e[i++], j);
          } else t.replaceChild(e[i++], r[l++]);
        } else l++;
      else r[l++].remove();
    }
  }
}
const tt = "_$DX_DELEGATE";
function C(t, r, e) {
  let a;
  const o = () => {
    const l = document.createElement("template");
    return l.innerHTML = t, l.content.firstChild;
  }, n = () => (a || (a = o())).cloneNode(!0);
  return n.cloneNode = n, n;
}
function bt(t, r = window.document) {
  const e = r[tt] || (r[tt] = /* @__PURE__ */ new Set());
  for (let a = 0, o = t.length; a < o; a++) {
    const n = t[a];
    e.has(n) || (e.add(n), r.addEventListener(n, Bt));
  }
}
function m(t, r, e, a) {
  if (e !== void 0 && !a && (a = []), typeof r != "function") return N(t, r, a, e);
  T((o) => N(t, r(), o, e), a);
}
function Bt(t) {
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
    const a = e[r];
    if (a && !e.disabled) {
      const o = e[`${r}Data`];
      if (o !== void 0 ? a.call(e, o, t) : a.call(e, t), t.cancelBubble) return;
    }
    e = e._$host || e.parentNode || e.host;
  }
}
function N(t, r, e, a, o) {
  for (; typeof e == "function"; ) e = e();
  if (r === e) return e;
  const n = typeof r, l = a !== void 0;
  if (t = l && e[0] && e[0].parentNode || t, n === "string" || n === "number") {
    if (n === "number" && (r = r.toString(), r === e))
      return e;
    if (l) {
      let i = e[0];
      i && i.nodeType === 3 ? i.data !== r && (i.data = r) : i = document.createTextNode(r), e = P(t, e, a, i);
    } else
      e !== "" && typeof e == "string" ? e = t.firstChild.data = r : e = t.textContent = r;
  } else if (r == null || n === "boolean")
    e = P(t, e, a);
  else {
    if (n === "function")
      return T(() => {
        let i = r();
        for (; typeof i == "function"; ) i = i();
        e = N(t, i, e, a);
      }), () => e;
    if (Array.isArray(r)) {
      const i = [], s = e && Array.isArray(e);
      if (q(i, r, e, o))
        return T(() => e = N(t, i, e, a, !0)), () => e;
      if (i.length === 0) {
        if (e = P(t, e, a), l) return e;
      } else s ? e.length === 0 ? et(t, i, a) : Tt(t, e, i) : (e && P(t), et(t, i));
      e = i;
    } else if (r.nodeType) {
      if (Array.isArray(e)) {
        if (l) return e = P(t, e, a, r);
        P(t, e, null, r);
      } else e == null || e === "" || !t.firstChild ? t.appendChild(r) : t.replaceChild(r, t.firstChild);
      e = r;
    }
  }
  return e;
}
function q(t, r, e, a) {
  let o = !1;
  for (let n = 0, l = r.length; n < l; n++) {
    let i = r[n], s = e && e[t.length], b;
    if (!(i == null || i === !0 || i === !1)) if ((b = typeof i) == "object" && i.nodeType)
      t.push(i);
    else if (Array.isArray(i))
      o = q(t, i, s) || o;
    else if (b === "function")
      if (a) {
        for (; typeof i == "function"; ) i = i();
        o = q(
          t,
          Array.isArray(i) ? i : [i],
          Array.isArray(s) ? s : [s]
        ) || o;
      } else
        t.push(i), o = !0;
    else {
      const c = String(i);
      s && s.nodeType === 3 && s.data === c ? t.push(s) : t.push(document.createTextNode(c));
    }
  }
  return o;
}
function et(t, r, e = null) {
  for (let a = 0, o = r.length; a < o; a++) t.insertBefore(r[a], e);
}
function P(t, r, e, a) {
  if (e === void 0) return t.textContent = "";
  const o = a || document.createTextNode("");
  if (r.length) {
    let n = !1;
    for (let l = r.length - 1; l >= 0; l--) {
      const i = r[l];
      if (o !== i) {
        const s = i.parentNode === t;
        !n && !l ? s ? t.replaceChild(o, i) : t.insertBefore(o, e) : s && i.remove();
      } else n = !0;
    }
  } else t.insertBefore(o, e);
  return [o];
}
function jt(t) {
  return Object.keys(t).reduce((e, a) => {
    const o = t[a];
    return e[a] = Object.assign({}, o), pt(o.value) && !Nt(o.value) && !Array.isArray(o.value) && (e[a].value = Object.assign({}, o.value)), Array.isArray(o.value) && (e[a].value = o.value.slice(0)), e;
  }, {});
}
function Ot(t) {
  return t ? Object.keys(t).reduce((e, a) => {
    const o = t[a];
    return e[a] = pt(o) && "value" in o ? o : {
      value: o
    }, e[a].attribute || (e[a].attribute = It(a)), e[a].parse = "parse" in e[a] ? e[a].parse : typeof e[a].value != "string", e;
  }, {}) : {};
}
function Dt(t) {
  return Object.keys(t).reduce((e, a) => (e[a] = t[a].value, e), {});
}
function Lt(t, r) {
  const e = jt(r);
  return Object.keys(r).forEach((o) => {
    const n = e[o], l = t.getAttribute(n.attribute), i = t[o];
    l && (n.value = n.parse ? ut(l) : l), i != null && (n.value = Array.isArray(i) ? i.slice(0) : i), n.reflect && rt(t, n.attribute, n.value, !!n.parse), Object.defineProperty(t, o, {
      get() {
        return n.value;
      },
      set(s) {
        const b = n.value;
        n.value = s, n.reflect && rt(this, n.attribute, n.value, !!n.parse);
        for (let c = 0, w = this.__propertyChangedCallbacks.length; c < w; c++)
          this.__propertyChangedCallbacks[c](o, s, b);
      },
      enumerable: !0,
      configurable: !0
    });
  }), e;
}
function ut(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function rt(t, r, e, a) {
  if (e == null || e === !1) return t.removeAttribute(r);
  let o = a ? JSON.stringify(e) : e;
  t.__updating[r] = !0, o === "true" && (o = ""), t.setAttribute(r, o), Promise.resolve().then(() => delete t.__updating[r]);
}
function It(t) {
  return t.replace(/\.?([A-Z]+)/g, (r, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function pt(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function Nt(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function Rt(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let H;
function Vt(t, r) {
  const e = Object.keys(r);
  return class extends t {
    static get observedAttributes() {
      return e.map((o) => r[o].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Lt(this, r);
      const o = Dt(this.props), n = this.Component, l = H;
      try {
        H = this, this.__initialized = !0, Rt(n) ? new n(o, {
          element: this
        }) : n(o, {
          element: this
        });
      } finally {
        H = l;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let o = null;
      for (; o = this.__releaseCallbacks.pop(); ) o(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(o, n, l) {
      if (this.__initialized && !this.__updating[o] && (o = this.lookupProp(o), o in r)) {
        if (l == null && !this[o]) return;
        this[o] = r[o].parse ? ut(l) : l;
      }
    }
    lookupProp(o) {
      if (r)
        return e.find((n) => o === n || o === r[n].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(o) {
      this.__releaseCallbacks.push(o);
    }
    addPropertyChangedCallback(o) {
      this.__propertyChangedCallbacks.push(o);
    }
  };
}
function Mt(t, r = {}, e = {}) {
  const {
    BaseElement: a = HTMLElement,
    extension: o,
    customElements: n = window.customElements
  } = e;
  return (l) => {
    let i = n.get(t);
    return i ? (i.prototype.Component = l, i) : (i = Vt(a, Ot(r)), i.prototype.Component = l, i.prototype.registeredTag = t, n.define(t, i, o), i);
  };
}
function Kt(t) {
  const r = Object.keys(t), e = {};
  for (let a = 0; a < r.length; a++) {
    const [o, n] = _(t[r[a]]);
    Object.defineProperty(e, r[a], {
      get: o,
      set(l) {
        n(() => l);
      }
    });
  }
  return e;
}
function Ft(t) {
  if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
  let r = t.parentNode;
  for (; r && !r._$owner && !(r.assignedSlot && r.assignedSlot._$owner); )
    r = r.parentNode;
  return r && r.assignedSlot ? r.assignedSlot._$owner : t._$owner;
}
function Gt(t) {
  return (r, e) => {
    const { element: a } = e;
    return yt((o) => {
      const n = Kt(r);
      a.addPropertyChangedCallback((i, s) => n[i] = s), a.addReleaseCallback(() => {
        a.renderRoot.textContent = "", o();
      });
      const l = t(n, e);
      return m(a.renderRoot, l);
    }, Ft(a));
  };
}
function Ht(t, r, e) {
  return arguments.length === 2 && (e = r, r = {}), Mt(t, r)(Gt(e));
}
const Ut = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}:root,[data-theme]{background-color:var(--fallback-b1,oklch(var(--b1)/1));color:var(--fallback-bc,oklch(var(--bc)/1))}@supports not (color: oklch(0% 0 0)){:root{color-scheme:light;--fallback-p: #491eff;--fallback-pc: #d4dbff;--fallback-s: #ff41c7;--fallback-sc: #fff9fc;--fallback-a: #00cfbd;--fallback-ac: #00100d;--fallback-n: #2b3440;--fallback-nc: #d7dde4;--fallback-b1: #ffffff;--fallback-b2: #e5e6e6;--fallback-b3: #e5e6e6;--fallback-bc: #1f2937;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}@media (prefers-color-scheme: dark){:root{color-scheme:dark;--fallback-p: #7582ff;--fallback-pc: #050617;--fallback-s: #ff71cf;--fallback-sc: #190211;--fallback-a: #00c7b5;--fallback-ac: #000e0c;--fallback-n: #2a323c;--fallback-nc: #a6adbb;--fallback-b1: #1d232a;--fallback-b2: #191e24;--fallback-b3: #15191e;--fallback-bc: #a6adbb;--fallback-in: #00b3f0;--fallback-inc: #000000;--fallback-su: #00ca92;--fallback-suc: #000000;--fallback-wa: #ffc22d;--fallback-wac: #000000;--fallback-er: #ff6f70;--fallback-erc: #000000}}}html{-webkit-tap-highlight-color:transparent}*{scrollbar-color:color-mix(in oklch,currentColor 35%,transparent) transparent}*:hover{scrollbar-color:color-mix(in oklch,currentColor 60%,transparent) transparent}*{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}@media (prefers-color-scheme: dark){*{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}}[data-theme=light]{color-scheme:light;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 89.824% .06192 275.75;--ac: 15.352% .0368 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 49.12% .3096 275.75;--s: 69.71% .329 342.55;--sc: 98.71% .0106 342.55;--a: 76.76% .184 183.61;--n: 32.1785% .02476 255.701624;--nc: 89.4994% .011585 252.096176;--b1: 100% 0 0;--b2: 96.1151% 0 0;--b3: 92.4169% .00108 197.137559;--bc: 27.8078% .029596 256.847952}[data-theme=dark]{color-scheme:dark;--in: 72.06% .191 231.6;--su: 64.8% .15 160;--wa: 84.71% .199 83.87;--er: 71.76% .221 22.18;--pc: 13.138% .0392 275.75;--sc: 14.96% .052 342.55;--ac: 14.902% .0334 183.61;--inc: 0% 0 0;--suc: 0% 0 0;--wac: 0% 0 0;--erc: 0% 0 0;--rounded-box: 1rem;--rounded-btn: .5rem;--rounded-badge: 1.9rem;--animation-btn: .25s;--animation-input: .2s;--btn-focus-scale: .95;--border-btn: 1px;--tab-border: 1px;--tab-radius: .5rem;--p: 65.69% .196 275.75;--s: 74.8% .26 342.55;--a: 74.51% .167 183.61;--n: 31.3815% .021108 254.139175;--nc: 74.6477% .0216 264.435964;--b1: 25.3267% .015896 252.417568;--b2: 23.2607% .013807 253.100675;--b3: 21.1484% .01165 254.087939;--bc: 74.6477% .0216 264.435964}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.container{width:100%;padding-right:1rem;padding-left:1rem}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.avatar.placeholder>div{display:flex;align-items:center;justify-content:center}@media (hover:hover){.tab:hover{--tw-text-opacity: 1}.table tr.hover:hover,.table tr.hover:nth-child(2n):hover{--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}}@media (hover: hover){.tab[disabled],.tab[disabled]:hover{cursor:not-allowed;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}}.input{flex-shrink:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:3rem;padding-left:1rem;padding-right:1rem;font-size:1rem;line-height:2;line-height:1.5rem;border-radius:var(--rounded-btn, .5rem);border-width:1px;border-color:transparent;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.input[type=number]::-webkit-inner-spin-button,.input-md[type=number]::-webkit-inner-spin-button{margin-top:-1rem;margin-bottom:-1rem;margin-inline-end:-1rem}.link{cursor:pointer;text-decoration-line:underline}.radio{flex-shrink:0;--chkbg: var(--bc);height:1.5rem;width:1.5rem;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:9999px;border-width:1px;border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2}.tabs{display:grid;align-items:flex-end}.tabs-lifted:has(.tab-content[class^=rounded-]) .tab:first-child:not(:is(.tab-active,[aria-selected=true])),.tabs-lifted:has(.tab-content[class*=" rounded-"]) .tab:first-child:not(:is(.tab-active,[aria-selected=true])){border-bottom-color:transparent}.tab{position:relative;grid-row-start:1;display:inline-flex;height:2rem;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;flex-wrap:wrap;align-items:center;justify-content:center;text-align:center;font-size:.875rem;line-height:1.25rem;line-height:2;--tab-padding: 1rem;--tw-text-opacity: .5;--tab-color: var(--fallback-bc,oklch(var(--bc)/1));--tab-bg: var(--fallback-b1,oklch(var(--b1)/1));--tab-border-color: var(--fallback-b3,oklch(var(--b3)/1));color:var(--tab-color);padding-inline-start:var(--tab-padding, 1rem);padding-inline-end:var(--tab-padding, 1rem)}.tab:is(input[type=radio]){width:auto;border-bottom-right-radius:0;border-bottom-left-radius:0}.tab:is(input[type=radio]):after{--tw-content: attr(aria-label);content:var(--tw-content)}.tab:not(input):empty{cursor:default;grid-column-start:span 9999}.tab-content{grid-column-start:1;grid-column-end:span 9999;grid-row-start:2;margin-top:calc(var(--tab-border) * -1);display:none;border-color:transparent;border-width:var(--tab-border, 0)}:checked+.tab-content:nth-child(2),:is(.tab-active,[aria-selected=true])+.tab-content:nth-child(2){border-start-start-radius:0px}input.tab:checked+.tab-content,:is(.tab-active,[aria-selected=true])+.tab-content{display:block}.table{position:relative;width:100%;border-radius:var(--rounded-box, 1rem);text-align:left;font-size:.875rem;line-height:1.25rem}.table :where(.table-pin-rows thead tr){position:sticky;top:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.table :where(.table-pin-rows tfoot tr){position:sticky;bottom:0;z-index:1;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.table :where(.table-pin-cols tr th){position:sticky;left:0;right:0;--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}@keyframes button-pop{0%{transform:scale(var(--btn-focus-scale, .98))}40%{transform:scale(1.02)}to{transform:scale(1)}}@keyframes checkmark{0%{background-position-y:5px}50%{background-position-y:-2px}to{background-position-y:0}}.input input{--tw-bg-opacity: 1;background-color:var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)));background-color:transparent}.input input:focus{outline:2px solid transparent;outline-offset:2px}.input[list]::-webkit-calendar-picker-indicator{line-height:1em}.input:focus,.input:focus-within{box-shadow:none;border-color:var(--fallback-bc,oklch(var(--bc)/.2));outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/.2))}.input:has(>input[disabled]),.input-disabled,.input:disabled,.input[disabled]{cursor:not-allowed;--tw-border-opacity: 1;border-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));color:var(--fallback-bc,oklch(var(--bc)/.4))}.input:has(>input[disabled])::-moz-placeholder,.input-disabled::-moz-placeholder,.input:disabled::-moz-placeholder,.input[disabled]::-moz-placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])::placeholder,.input-disabled::placeholder,.input:disabled::placeholder,.input[disabled]::placeholder{color:var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)));--tw-placeholder-opacity: .2}.input:has(>input[disabled])>input[disabled]{cursor:not-allowed}.input::-webkit-date-and-time-value{text-align:inherit}.link:focus{outline:2px solid transparent;outline-offset:2px}.link:focus-visible{outline:2px solid currentColor;outline-offset:2px}.loading{pointer-events:none;display:inline-block;aspect-ratio:1 / 1;width:1.5rem;background-color:currentColor;-webkit-mask-size:100%;mask-size:100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E");mask-image:url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E")}.mockup-browser .mockup-browser-toolbar .input{position:relative;margin-left:auto;margin-right:auto;display:block;height:1.75rem;width:24rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)));padding-left:2rem;direction:ltr}.mockup-browser .mockup-browser-toolbar .input:before{content:"";position:absolute;left:.5rem;top:50%;aspect-ratio:1 / 1;height:.75rem;--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:2px;border-color:currentColor;opacity:.6}.mockup-browser .mockup-browser-toolbar .input:after{content:"";position:absolute;left:1.25rem;top:50%;height:.5rem;--tw-translate-y: 25%;--tw-rotate: -45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));border-radius:9999px;border-width:1px;border-color:currentColor;opacity:.6}@keyframes modal-pop{0%{opacity:0}}@keyframes progress-loading{50%{background-position-x:-115%}}.radio:focus{box-shadow:none}.radio:focus-visible{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--fallback-bc,oklch(var(--bc)/1))}.radio:checked,.radio[aria-checked=true]{--tw-bg-opacity: 1;background-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)));background-image:none;animation:radiomark var(--animation-input, .2s) ease-out;box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}.radio:disabled{cursor:not-allowed;opacity:.2}@keyframes radiomark{0%{box-shadow:0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset}50%{box-shadow:0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset}to{box-shadow:0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset}}@keyframes rating-pop{0%{transform:translateY(-.125em)}40%{transform:translateY(-.125em)}to{transform:translateY(0)}}@keyframes skeleton{0%{background-position:150%}to{background-position:-50%}}.tabs-lifted>.tab:focus-visible{border-end-end-radius:0;border-end-start-radius:0}.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]),.tab:is(input:checked){border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: 1;--tw-text-opacity: 1}.tab:focus{outline:2px solid transparent;outline-offset:2px}.tab:focus-visible{outline:2px solid currentColor;outline-offset:-5px}.tab-disabled,.tab[disabled]{cursor:not-allowed;color:var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));--tw-text-opacity: .2}.tabs-bordered>.tab{border-color:var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)));--tw-border-opacity: .2;border-style:solid;border-bottom-width:calc(var(--tab-border, 1px) + 1px)}.tabs-lifted>.tab{border:var(--tab-border, 1px) solid transparent;border-width:0 0 var(--tab-border, 1px) 0;border-start-start-radius:var(--tab-radius, .5rem);border-start-end-radius:var(--tab-radius, .5rem);border-bottom-color:var(--tab-border-color);padding-inline-start:var(--tab-padding, 1rem);padding-inline-end:var(--tab-padding, 1rem);padding-top:var(--tab-border, 1px)}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]),.tabs-lifted>.tab:is(input:checked){background-color:var(--tab-bg);border-width:var(--tab-border, 1px) var(--tab-border, 1px) 0 var(--tab-border, 1px);border-inline-start-color:var(--tab-border-color);border-inline-end-color:var(--tab-border-color);border-top-color:var(--tab-border-color);padding-inline-start:calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));padding-inline-end:calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));padding-bottom:var(--tab-border, 1px);padding-top:0}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):before,.tabs-lifted>.tab:is(input:checked):before{z-index:1;content:"";display:block;position:absolute;width:calc(100% + var(--tab-radius, .5rem) * 2);height:var(--tab-radius, .5rem);bottom:0;background-size:var(--tab-radius, .5rem);background-position:top left,top right;background-repeat:no-repeat;--tab-grad: calc(69% - var(--tab-border, 1px));--radius-start: radial-gradient( circle at top left, transparent var(--tab-grad), var(--tab-border-color) calc(var(--tab-grad) + .25px), var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)), var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + .25px) );--radius-end: radial-gradient( circle at top right, transparent var(--tab-grad), var(--tab-border-color) calc(var(--tab-grad) + .25px), var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)), var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + .25px) );background-image:var(--radius-start),var(--radius-end)}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):first-child:before,.tabs-lifted>.tab:is(input:checked):first-child:before{background-image:var(--radius-end);background-position:top right}[dir=rtl] .tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):first-child:before,[dir=rtl] .tabs-lifted>.tab:is(input:checked):first-child:before{background-image:var(--radius-start);background-position:top left}.tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):last-child:before,.tabs-lifted>.tab:is(input:checked):last-child:before{background-image:var(--radius-start);background-position:top left}[dir=rtl] .tabs-lifted>.tab:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):last-child:before,[dir=rtl] .tabs-lifted>.tab:is(input:checked):last-child:before{background-image:var(--radius-end);background-position:top right}.tabs-lifted>:is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled])+.tabs-lifted :is(.tab-active,[aria-selected=true]):not(.tab-disabled):not([disabled]):before,.tabs-lifted>.tab:is(input:checked)+.tabs-lifted .tab:is(input:checked):before{background-image:var(--radius-end);background-position:top right}.tabs-boxed .tab{border-radius:var(--rounded-btn, .5rem)}.table:where([dir=rtl],[dir=rtl] *){text-align:right}.table :where(th,td){padding:.75rem 1rem;vertical-align:middle}.table tr.active,.table tr.active:nth-child(2n),.table-zebra tbody tr:nth-child(2n){--tw-bg-opacity: 1;background-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))}.table :where(thead tr,tbody tr:not(:last-child),tbody tr:first-child:last-child){border-bottom-width:1px;--tw-border-opacity: 1;border-bottom-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}.table :where(thead,tfoot){white-space:nowrap;font-size:.75rem;line-height:1rem;font-weight:700;color:var(--fallback-bc,oklch(var(--bc)/.6))}.table :where(tfoot){border-top-width:1px;--tw-border-opacity: 1;border-top-color:var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))}@keyframes toast-pop{0%{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}.tabs-md :where(.tab){height:2rem;font-size:.875rem;line-height:1.25rem;line-height:2;--tab-padding: 1rem}.tabs-lg :where(.tab){height:3rem;font-size:1.125rem;line-height:1.75rem;line-height:2;--tab-padding: 1.25rem}.tabs-sm :where(.tab){height:1.5rem;font-size:.875rem;line-height:.75rem;--tab-padding: .75rem}.tabs-xs :where(.tab){height:1.25rem;font-size:.75rem;line-height:.75rem;--tab-padding: .5rem}.table-xs :not(thead):not(tfoot) tr{font-size:.75rem;line-height:1rem}.table-xs :where(th,td){padding:.25rem .5rem}.mx-auto{margin-left:auto;margin-right:auto}.mb-3{margin-bottom:.75rem}.inline{display:inline}.table{display:table}.overflow-x-auto{overflow-x:auto}.rounded-box{border-radius:var(--rounded-box, 1rem)}.border-base-300{--tw-border-opacity: 1;border-color:var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)))}.bg-added{--tw-bg-opacity: 1;background-color:rgb(34 197 94 / var(--tw-bg-opacity))}.bg-base-100{--tw-bg-opacity: 1;background-color:var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))}.bg-deleted{--tw-bg-opacity: 1;background-color:rgb(220 38 38 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.p-6{padding:1.5rem}.text-2xl{font-size:1.5rem;line-height:2rem}.font-bold{font-weight:700}.text-black{color:#000000d9}.text-red-600{--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity))}`;
var Yt = /* @__PURE__ */ C(`<div class=overflow-x-auto><table class="table table-xs"><thead><tr><th></th><th>Name</th><th>Job</th><th>company</th><th>location</th><th>Last Login</th><th>Favorite Color</th></tr></thead><tbody><tr><th>1</th><td>Cy Ganderton</td><td>Quality Control Specialist</td><td>Littel, Schaden and Vandervort</td><td>Canada</td><td class=bg-deleted>12/16/2020</td><td>Blue</td></tr><tr><th>2</th><td>Hart Hagerty</td><td>Desktop Support Technician</td><td>Zemlak, Daniel and Leannon</td><td>United States</td><td class=bg-added>12/5/2020</td><td>Purple</td></tr><tr><th>3</th><td>Brice Swyre</td><td>Tax Accountant</td><td>Carroll Group</td><td>China</td><td>8/15/2020</td><td>Red</td></tr><tr><th>4</th><td>Marjy Ferencz</td><td>Office Assistant I</td><td>Rowe-Schoen</td><td>Russia</td><td>3/25/2021</td><td>Crimson</td></tr><tr><th>5</th><td>Yancy Tear</td><td>Community Outreach Specialist</td><td>Wyman-Ledner</td><td>Brazil</td><td>5/22/2020</td><td>Indigo</td></tr><tr><th>6</th><td>Irma Vasilik</td><td>Editor</td><td>Wiza, Bins and Emard</td><td>Venezuela</td><td>12/8/2020</td><td>Purple</td></tr><tr><th>7</th><td>Meghann Durtnal</td><td>Staff Accountant IV</td><td>Schuster-Schimmel</td><td>Philippines</td><td>2/17/2021</td><td>Yellow</td></tr><tr><th>8</th><td>Sammy Seston</td><td>Accountant I</td><td>O'Hara, Welch and Keebler</td><td>Indonesia</td><td>5/23/2020</td><td>Crimson</td></tr><tr><th>9</th><td>Lesya Tinham</td><td>Safety Technician IV</td><td>Turner-Kuhlman</td><td>Philippines</td><td>2/21/2021</td><td>Maroon</td></tr><tr><th>10</th><td>Zaneta Tewkesbury</td><td>VP Marketing</td><td>Sauer LLC</td><td>Chad</td><td>6/23/2020</td><td>Green</td></tr><tr><th>11</th><td>Andy Tipple</td><td>Librarian</td><td>Hilpert Group</td><td>Poland</td><td>7/9/2020</td><td>Indigo</td></tr><tr><th>12</th><td>Sophi Biles</td><td>Recruiting Manager</td><td>Gutmann Inc</td><td>Indonesia</td><td>2/12/2021</td><td>Maroon</td></tr><tr><th>13</th><td>Florida Garces</td><td>Web Developer IV</td><td>Gaylord, Pacocha and Baumbach</td><td>Poland</td><td>5/31/2020</td><td>Purple</td></tr><tr><th>14</th><td>Maribeth Popping</td><td>Analyst Programmer</td><td>Deckow-Pouros</td><td>Portugal</td><td>4/27/2021</td><td>Aquamarine</td></tr><tr><th>15</th><td>Moritz Dryburgh</td><td>Dental Hygienist</td><td>Schiller, Cole and Hackett</td><td>Sri Lanka</td><td>8/8/2020</td><td>Crimson</td></tr><tr><th>16</th><td>Reid Semiras</td><td>Teacher</td><td>Sporer, Sipes and Rogahn</td><td>Poland</td><td>7/30/2020</td><td>Green</td></tr><tr><th>17</th><td>Alec Lethby</td><td>Teacher</td><td>Reichel, Glover and Hamill</td><td>China</td><td>2/28/2021</td><td>Khaki</td></tr><tr><th>18</th><td>Aland Wilber</td><td>Quality Control Specialist</td><td>Kshlerin, Rogahn and Swaniawski</td><td>Czech Republic</td><td>9/29/2020</td><td>Purple</td></tr><tr><th>19</th><td>Teddie Duerden</td><td>Staff Accountant III</td><td>Pouros, Ullrich and Windler</td><td>France</td><td>10/27/2020</td><td>Aquamarine</td></tr><tr><th>20</th><td>Lorelei Blackstone</td><td>Data Coordiator</td><td>Witting, Kutch and Greenfelder</td><td>Kazakhstan</td><td>6/3/2020</td><td>Red</td></tr></tbody><tfoot><tr><th></th><th>Name</th><th>Job</th><th>company</th><th>location</th><th>Last Login</th><th>Favorite Color`);
function qt() {
  return Yt();
}
var Wt = /* @__PURE__ */ C("<p>Loading..."), Zt = /* @__PURE__ */ C("<span>Error: "), Jt = /* @__PURE__ */ C("<div class=rounded-box>"), Qt = /* @__PURE__ */ C('<div class="tab-content border-base-300 rounded-box p-6 bg-added"><input type=number min=1 placeholder="Enter Numeric Id">');
const Xt = async (t) => (await fetch(`https://swapi.dev/api/people/${t}/`)).json();
function te() {
  const [t, r] = _("1"), [e] = Ct(t, Xt);
  return (() => {
    var a = Qt(), o = a.firstChild;
    return o.$$input = (n) => r(n.currentTarget.value), m(a, y($t, {
      get when() {
        return e.loading;
      },
      get children() {
        return Wt();
      }
    }), null), m(a, y(Pt, {
      get children() {
        return [y(X, {
          get when() {
            return e.error;
          },
          get children() {
            var n = Zt();
            return n.firstChild, m(n, () => e.error(), null), n;
          }
        }), y(X, {
          get when() {
            return e();
          },
          get children() {
            var n = Jt();
            return m(n, () => JSON.stringify(e(), null, 2)), n;
          }
        })];
      }
    }), null), a;
  })();
}
bt(["input"]);
var ee = /* @__PURE__ */ C('<div class="tabs tabs-lifted"><input type=radio id=tab1 class=tab aria-label="Tab 1"><div class="tab-content bg-base-100 border-base-300 rounded-box p-6">Hello tab 1</div><input type=radio id=tab2 class=tab aria-label="Tab 2"><input type=radio id=tab3 class=tab aria-label="Tab 3"><div class="tab-content bg-base-100 border-base-300 rounded-box p-6">');
function re() {
  const [t, r] = _("tab1");
  return (() => {
    var e = ee(), a = e.firstChild, o = a.nextSibling, n = o.nextSibling, l = n.nextSibling, i = l.nextSibling;
    return a.$$click = () => r("tab1"), n.$$click = () => r("tab2"), m(e, y(te, {}), l), l.$$click = () => r("tab3"), m(i, y(qt, {})), T(() => a.checked = t() === "tab1"), T(() => n.checked = t() === "tab2"), T(() => l.checked = t() === "tab3"), e;
  })();
}
bt(["click"]);
var ae = /* @__PURE__ */ C('<div class="container mx-auto text-black bg-white"><h1 class="text-2xl font-bold mb-3 text-red-600">Tab Example');
const oe = () => (() => {
  var t = ae();
  return t.firstChild, m(t, y(re, {}), null), t;
})();
var ne = /* @__PURE__ */ C("<div><style>");
Ht("pe-view", () => (() => {
  var t = ne(), r = t.firstChild;
  return m(r, Ut), m(t, y(oe, {}), null), t;
})());
