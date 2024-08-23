function wt(t) {
  return Object.keys(t).reduce((e, r) => {
    const s = t[r];
    return e[r] = Object.assign({}, s), st(s.value) && !mt(s.value) && !Array.isArray(s.value) && (e[r].value = Object.assign({}, s.value)), Array.isArray(s.value) && (e[r].value = s.value.slice(0)), e;
  }, {});
}
function Ct(t) {
  return t ? Object.keys(t).reduce((e, r) => {
    const s = t[r];
    return e[r] = st(s) && "value" in s ? s : {
      value: s
    }, e[r].attribute || (e[r].attribute = vt(r)), e[r].parse = "parse" in e[r] ? e[r].parse : typeof e[r].value != "string", e;
  }, {}) : {};
}
function St(t) {
  return Object.keys(t).reduce((e, r) => (e[r] = t[r].value, e), {});
}
function _t(t, n) {
  const e = wt(n);
  return Object.keys(n).forEach((s) => {
    const i = e[s], o = t.getAttribute(i.attribute), l = t[s];
    o && (i.value = i.parse ? rt(o) : o), l != null && (i.value = Array.isArray(l) ? l.slice(0) : l), i.reflect && Y(t, i.attribute, i.value, !!i.parse), Object.defineProperty(t, s, {
      get() {
        return i.value;
      },
      set(d) {
        const c = i.value;
        i.value = d, i.reflect && Y(this, i.attribute, i.value, !!i.parse);
        for (let u = 0, y = this.__propertyChangedCallbacks.length; u < y; u++)
          this.__propertyChangedCallbacks[u](s, d, c);
      },
      enumerable: !0,
      configurable: !0
    });
  }), e;
}
function rt(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function Y(t, n, e, r) {
  if (e == null || e === !1) return t.removeAttribute(n);
  let s = r ? JSON.stringify(e) : e;
  t.__updating[n] = !0, s === "true" && (s = ""), t.setAttribute(n, s), Promise.resolve().then(() => delete t.__updating[n]);
}
function vt(t) {
  return t.replace(/\.?([A-Z]+)/g, (n, e) => "-" + e.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function st(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function mt(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function At(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let I;
function Et() {
  Object.defineProperty(I, "renderRoot", {
    value: I
  });
}
function $t(t, n) {
  const e = Object.keys(n);
  return class extends t {
    static get observedAttributes() {
      return e.map((s) => n[s].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = _t(this, n);
      const s = St(this.props), i = this.Component, o = I;
      try {
        I = this, this.__initialized = !0, At(i) ? new i(s, {
          element: this
        }) : i(s, {
          element: this
        });
      } finally {
        I = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let s = null;
      for (; s = this.__releaseCallbacks.pop(); ) s(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(s, i, o) {
      if (this.__initialized && !this.__updating[s] && (s = this.lookupProp(s), s in n)) {
        if (o == null && !this[s]) return;
        this[s] = n[s].parse ? rt(o) : o;
      }
    }
    lookupProp(s) {
      if (n)
        return e.find((i) => s === i || s === n[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(s) {
      this.__releaseCallbacks.push(s);
    }
    addPropertyChangedCallback(s) {
      this.__propertyChangedCallbacks.push(s);
    }
  };
}
function xt(t, n = {}, e = {}) {
  const {
    BaseElement: r = HTMLElement,
    extension: s,
    customElements: i = window.customElements
  } = e;
  return (o) => {
    let l = i.get(t);
    return l ? (l.prototype.Component = o, l) : (l = $t(r, Ct(n)), l.prototype.Component = o, l.prototype.registeredTag = t, i.define(t, l, s), l);
  };
}
const Pt = (t, n) => t === n, N = {
  equals: Pt
};
let Tt = at;
const _ = 1, M = 2, it = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, U = {};
var g = null;
let D = null, kt = null, a = null, b = null, A = null, V = 0;
function Ot(t, n) {
  const e = a, r = g, s = t.length === 0, i = n === void 0 ? r : n, o = s ? it : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, l = s ? t : () => t(() => w(() => G(o)));
  g = o, a = null;
  try {
    return $(l, !0);
  } finally {
    a = e, g = r;
  }
}
function v(t, n) {
  n = n ? Object.assign({}, N, n) : N;
  const e = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, r = (s) => (typeof s == "function" && (s = s(e.value)), ot(e, s));
  return [lt.bind(e), r];
}
function X(t, n, e) {
  const r = J(t, n, !0, _);
  R(r);
}
function O(t, n, e) {
  const r = J(t, n, !1, _);
  R(r);
}
function E(t, n, e) {
  e = e ? Object.assign({}, N, e) : N;
  const r = J(t, n, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = e.equals || void 0, R(r), lt.bind(r);
}
function Lt(t) {
  return t && typeof t == "object" && "then" in t;
}
function jt(t, n, e) {
  let r, s, i;
  arguments.length === 2 && typeof n == "object" || arguments.length === 1 ? (r = !0, s = t, i = n || {}) : (r = t, s = n, i = {});
  let o = null, l = U, d = !1, c = "initialValue" in i, u = typeof r == "function" && E(r);
  const y = /* @__PURE__ */ new Set(), [C, L] = (i.storage || v)(i.initialValue), [j, pt] = v(void 0), [bt, gt] = v(void 0, {
    equals: !1
  }), [Q, Z] = v(c ? "ready" : "unresolved");
  function P(f, h, p, T) {
    return o === f && (o = null, T !== void 0 && (c = !0), (f === l || h === l) && i.onHydrated && queueMicrotask(
      () => i.onHydrated(T, {
        value: h
      })
    ), l = U, yt(h, p)), h;
  }
  function yt(f, h) {
    $(() => {
      h === void 0 && L(() => f), Z(h !== void 0 ? "errored" : c ? "ready" : "unresolved"), pt(h);
      for (const p of y.keys()) p.decrement();
      y.clear();
    }, !1);
  }
  function H() {
    const f = Rt, h = C(), p = j();
    if (p !== void 0 && !o) throw p;
    return a && !a.user && f && X(() => {
      bt(), o && (f.resolved || y.has(f) || (f.increment(), y.add(f)));
    }), h;
  }
  function q(f = !0) {
    if (f !== !1 && d) return;
    d = !1;
    const h = u ? u() : r;
    if (h == null || h === !1) {
      P(o, w(C));
      return;
    }
    const p = l !== U ? l : w(
      () => s(h, {
        value: C(),
        refetching: f
      })
    );
    return Lt(p) ? (o = p, "value" in p ? (p.status === "success" ? P(o, p.value, void 0, h) : P(o, void 0, z(p.value), h), p) : (d = !0, queueMicrotask(() => d = !1), $(() => {
      Z(c ? "refreshing" : "pending"), gt();
    }, !1), p.then(
      (T) => P(p, T, void 0, h),
      (T) => P(p, void 0, z(T), h)
    ))) : (P(o, p, void 0, h), p);
  }
  return Object.defineProperties(H, {
    state: {
      get: () => Q()
    },
    error: {
      get: () => j()
    },
    loading: {
      get() {
        const f = Q();
        return f === "pending" || f === "refreshing";
      }
    },
    latest: {
      get() {
        if (!c) return H();
        const f = j();
        if (f && !o) throw f;
        return C();
      }
    }
  }), u ? X(() => q(!1)) : q(!1), [
    H,
    {
      refetch: q,
      mutate: L
    }
  ];
}
function w(t) {
  if (a === null) return t();
  const n = a;
  a = null;
  try {
    return t();
  } finally {
    a = n;
  }
}
function It(t) {
  const n = E(t), e = E(() => F(n()));
  return e.toArray = () => {
    const r = e();
    return Array.isArray(r) ? r : r != null ? [r] : [];
  }, e;
}
let Rt;
function lt() {
  if (this.sources && this.state)
    if (this.state === _) R(this);
    else {
      const t = b;
      b = null, $(() => B(this), !1), b = t;
    }
  if (a) {
    const t = this.observers ? this.observers.length : 0;
    a.sources ? (a.sources.push(this), a.sourceSlots.push(t)) : (a.sources = [this], a.sourceSlots = [t]), this.observers ? (this.observers.push(a), this.observerSlots.push(a.sources.length - 1)) : (this.observers = [a], this.observerSlots = [a.sources.length - 1]);
  }
  return this.value;
}
function ot(t, n, e) {
  let r = t.value;
  return (!t.comparator || !t.comparator(r, n)) && (t.value = n, t.observers && t.observers.length && $(() => {
    for (let s = 0; s < t.observers.length; s += 1) {
      const i = t.observers[s], o = D && D.running;
      o && D.disposed.has(i), (o ? !i.tState : !i.state) && (i.pure ? b.push(i) : A.push(i), i.observers && ut(i)), o || (i.state = _);
    }
    if (b.length > 1e6)
      throw b = [], new Error();
  }, !1)), n;
}
function R(t) {
  if (!t.fn) return;
  G(t);
  const n = V;
  Nt(
    t,
    t.value,
    n
  );
}
function Nt(t, n, e) {
  let r;
  const s = g, i = a;
  a = g = t;
  try {
    r = t.fn(n);
  } catch (o) {
    return t.pure && (t.state = _, t.owned && t.owned.forEach(G), t.owned = null), t.updatedAt = e + 1, ct(o);
  } finally {
    a = i, g = s;
  }
  (!t.updatedAt || t.updatedAt <= e) && (t.updatedAt != null && "observers" in t ? ot(t, r) : t.value = r, t.updatedAt = e);
}
function J(t, n, e, r = _, s) {
  const i = {
    fn: t,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: g,
    context: g ? g.context : null,
    pure: e
  };
  return g === null || g !== it && (g.owned ? g.owned.push(i) : g.owned = [i]), i;
}
function dt(t) {
  if (t.state === 0) return;
  if (t.state === M) return B(t);
  if (t.suspense && w(t.suspense.inFallback)) return t.suspense.effects.push(t);
  const n = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < V); )
    t.state && n.push(t);
  for (let e = n.length - 1; e >= 0; e--)
    if (t = n[e], t.state === _)
      R(t);
    else if (t.state === M) {
      const r = b;
      b = null, $(() => B(t, n[0]), !1), b = r;
    }
}
function $(t, n) {
  if (b) return t();
  let e = !1;
  n || (b = []), A ? e = !0 : A = [], V++;
  try {
    const r = t();
    return Mt(e), r;
  } catch (r) {
    e || (A = null), b = null, ct(r);
  }
}
function Mt(t) {
  if (b && (at(b), b = null), t) return;
  const n = A;
  A = null, n.length && $(() => Tt(n), !1);
}
function at(t) {
  for (let n = 0; n < t.length; n++) dt(t[n]);
}
function B(t, n) {
  t.state = 0;
  for (let e = 0; e < t.sources.length; e += 1) {
    const r = t.sources[e];
    if (r.sources) {
      const s = r.state;
      s === _ ? r !== n && (!r.updatedAt || r.updatedAt < V) && dt(r) : s === M && B(r, n);
    }
  }
}
function ut(t) {
  for (let n = 0; n < t.observers.length; n += 1) {
    const e = t.observers[n];
    e.state || (e.state = M, e.pure ? b.push(e) : A.push(e), e.observers && ut(e));
  }
}
function G(t) {
  let n;
  if (t.sources)
    for (; t.sources.length; ) {
      const e = t.sources.pop(), r = t.sourceSlots.pop(), s = e.observers;
      if (s && s.length) {
        const i = s.pop(), o = e.observerSlots.pop();
        r < s.length && (i.sourceSlots[o] = r, s[r] = i, e.observerSlots[r] = o);
      }
    }
  if (t.owned) {
    for (n = t.owned.length - 1; n >= 0; n--) G(t.owned[n]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (n = t.cleanups.length - 1; n >= 0; n--) t.cleanups[n]();
    t.cleanups = null;
  }
  t.state = 0;
}
function z(t) {
  return t instanceof Error ? t : new Error(typeof t == "string" ? t : "Unknown error", {
    cause: t
  });
}
function ct(t, n = g) {
  throw z(t);
}
function F(t) {
  if (typeof t == "function" && !t.length) return F(t());
  if (Array.isArray(t)) {
    const n = [];
    for (let e = 0; e < t.length; e++) {
      const r = F(t[e]);
      Array.isArray(r) ? n.push.apply(n, r) : n.push(r);
    }
    return n;
  }
  return t;
}
function m(t, n) {
  return w(() => t(n || {}));
}
const ft = (t) => `Stale read from <${t}>.`;
function Bt(t) {
  const n = t.keyed, e = E(() => t.when, void 0, {
    equals: (r, s) => n ? r === s : !r == !s
  });
  return E(
    () => {
      const r = e();
      if (r) {
        const s = t.children;
        return typeof s == "function" && s.length > 0 ? w(
          () => s(
            n ? r : () => {
              if (!w(e)) throw ft("Show");
              return t.when;
            }
          )
        ) : s;
      }
      return t.fallback;
    },
    void 0,
    void 0
  );
}
function Kt(t) {
  let n = !1;
  const e = (i, o) => (n ? i[1] === o[1] : !i[1] == !o[1]) && i[2] === o[2], r = It(() => t.children), s = E(
    () => {
      let i = r();
      Array.isArray(i) || (i = [i]);
      for (let o = 0; o < i.length; o++) {
        const l = i[o].when;
        if (l)
          return n = !!i[o].keyed, [o, l, i[o]];
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
      const [i, o, l] = s();
      if (i < 0) return t.fallback;
      const d = l.children;
      return typeof d == "function" && d.length > 0 ? w(
        () => d(
          n ? o : () => {
            if (w(s)[0] !== i) throw ft("Match");
            return l.when;
          }
        )
      ) : d;
    },
    void 0,
    void 0
  );
}
function tt(t) {
  return t;
}
function Vt(t, n, e) {
  let r = e.length, s = n.length, i = r, o = 0, l = 0, d = n[s - 1].nextSibling, c = null;
  for (; o < s || l < i; ) {
    if (n[o] === e[l]) {
      o++, l++;
      continue;
    }
    for (; n[s - 1] === e[i - 1]; )
      s--, i--;
    if (s === o) {
      const u = i < r ? l ? e[l - 1].nextSibling : e[i - l] : d;
      for (; l < i; ) t.insertBefore(e[l++], u);
    } else if (i === l)
      for (; o < s; )
        (!c || !c.has(n[o])) && n[o].remove(), o++;
    else if (n[o] === e[i - 1] && e[l] === n[s - 1]) {
      const u = n[--s].nextSibling;
      t.insertBefore(e[l++], n[o++].nextSibling), t.insertBefore(e[--i], u), n[s] = e[i];
    } else {
      if (!c) {
        c = /* @__PURE__ */ new Map();
        let y = l;
        for (; y < i; ) c.set(e[y], y++);
      }
      const u = c.get(n[o]);
      if (u != null)
        if (l < u && u < i) {
          let y = o, C = 1, L;
          for (; ++y < s && y < i && !((L = c.get(n[y])) == null || L !== u + C); )
            C++;
          if (C > u - l) {
            const j = n[o];
            for (; l < u; ) t.insertBefore(e[l++], j);
          } else t.replaceChild(e[l++], n[o++]);
        } else o++;
      else n[o++].remove();
    }
  }
}
const et = "_$DX_DELEGATE";
function x(t, n, e) {
  let r;
  const s = () => {
    const o = document.createElement("template");
    return o.innerHTML = t, o.content.firstChild;
  }, i = () => (r || (r = s())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function ht(t, n = window.document) {
  const e = n[et] || (n[et] = /* @__PURE__ */ new Set());
  for (let r = 0, s = t.length; r < s; r++) {
    const i = t[r];
    e.has(i) || (e.add(i), n.addEventListener(i, Gt));
  }
}
function S(t, n, e, r) {
  if (e !== void 0 && !r && (r = []), typeof n != "function") return K(t, n, r, e);
  O((s) => K(t, n(), s, e), r);
}
function Gt(t) {
  const n = `$$${t.type}`;
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
    const r = e[n];
    if (r && !e.disabled) {
      const s = e[`${n}Data`];
      if (s !== void 0 ? r.call(e, s, t) : r.call(e, t), t.cancelBubble) return;
    }
    e = e._$host || e.parentNode || e.host;
  }
}
function K(t, n, e, r, s) {
  for (; typeof e == "function"; ) e = e();
  if (n === e) return e;
  const i = typeof n, o = r !== void 0;
  if (t = o && e[0] && e[0].parentNode || t, i === "string" || i === "number") {
    if (i === "number" && (n = n.toString(), n === e))
      return e;
    if (o) {
      let l = e[0];
      l && l.nodeType === 3 ? l.data !== n && (l.data = n) : l = document.createTextNode(n), e = k(t, e, r, l);
    } else
      e !== "" && typeof e == "string" ? e = t.firstChild.data = n : e = t.textContent = n;
  } else if (n == null || i === "boolean")
    e = k(t, e, r);
  else {
    if (i === "function")
      return O(() => {
        let l = n();
        for (; typeof l == "function"; ) l = l();
        e = K(t, l, e, r);
      }), () => e;
    if (Array.isArray(n)) {
      const l = [], d = e && Array.isArray(e);
      if (W(l, n, e, s))
        return O(() => e = K(t, l, e, r, !0)), () => e;
      if (l.length === 0) {
        if (e = k(t, e, r), o) return e;
      } else d ? e.length === 0 ? nt(t, l, r) : Vt(t, e, l) : (e && k(t), nt(t, l));
      e = l;
    } else if (n.nodeType) {
      if (Array.isArray(e)) {
        if (o) return e = k(t, e, r, n);
        k(t, e, null, n);
      } else e == null || e === "" || !t.firstChild ? t.appendChild(n) : t.replaceChild(n, t.firstChild);
      e = n;
    }
  }
  return e;
}
function W(t, n, e, r) {
  let s = !1;
  for (let i = 0, o = n.length; i < o; i++) {
    let l = n[i], d = e && e[t.length], c;
    if (!(l == null || l === !0 || l === !1)) if ((c = typeof l) == "object" && l.nodeType)
      t.push(l);
    else if (Array.isArray(l))
      s = W(t, l, d) || s;
    else if (c === "function")
      if (r) {
        for (; typeof l == "function"; ) l = l();
        s = W(
          t,
          Array.isArray(l) ? l : [l],
          Array.isArray(d) ? d : [d]
        ) || s;
      } else
        t.push(l), s = !0;
    else {
      const u = String(l);
      d && d.nodeType === 3 && d.data === u ? t.push(d) : t.push(document.createTextNode(u));
    }
  }
  return s;
}
function nt(t, n, e = null) {
  for (let r = 0, s = n.length; r < s; r++) t.insertBefore(n[r], e);
}
function k(t, n, e, r) {
  if (e === void 0) return t.textContent = "";
  const s = r || document.createTextNode("");
  if (n.length) {
    let i = !1;
    for (let o = n.length - 1; o >= 0; o--) {
      const l = n[o];
      if (s !== l) {
        const d = l.parentNode === t;
        !i && !o ? d ? t.replaceChild(s, l) : t.insertBefore(s, e) : d && l.remove();
      } else i = !0;
    }
  } else t.insertBefore(s, e);
  return [s];
}
function Ht(t) {
  const n = Object.keys(t), e = {};
  for (let r = 0; r < n.length; r++) {
    const [s, i] = v(t[n[r]]);
    Object.defineProperty(e, n[r], {
      get: s,
      set(o) {
        i(() => o);
      }
    });
  }
  return e;
}
function qt(t) {
  if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
  let n = t.parentNode;
  for (; n && !n._$owner && !(n.assignedSlot && n.assignedSlot._$owner); )
    n = n.parentNode;
  return n && n.assignedSlot ? n.assignedSlot._$owner : t._$owner;
}
function Ut(t) {
  return (n, e) => {
    const { element: r } = e;
    return Ot((s) => {
      const i = Ht(n);
      r.addPropertyChangedCallback((l, d) => i[l] = d), r.addReleaseCallback(() => {
        r.renderRoot.textContent = "", s();
      });
      const o = t(i, e);
      return S(r.renderRoot, o);
    }, qt(r));
  };
}
function Dt(t, n, e) {
  return arguments.length === 2 && (e = n, n = {}), xt(t, n)(Ut(e));
}
var zt = /* @__PURE__ */ x(`<div class=overflow-x-auto><table class="table table-xs"><thead><tr><th></th><th>Name</th><th>Job</th><th>company</th><th>location</th><th>Last Login</th><th>Favorite Color</th></tr></thead><tbody><tr><th>1</th><td>Cy Ganderton</td><td>Quality Control Specialist</td><td>Littel, Schaden and Vandervort</td><td>Canada</td><td>12/16/2020</td><td>Blue</td></tr><tr><th>2</th><td>Hart Hagerty</td><td>Desktop Support Technician</td><td>Zemlak, Daniel and Leannon</td><td>United States</td><td>12/5/2020</td><td>Purple</td></tr><tr><th>3</th><td>Brice Swyre</td><td>Tax Accountant</td><td>Carroll Group</td><td>China</td><td>8/15/2020</td><td>Red</td></tr><tr><th>4</th><td>Marjy Ferencz</td><td>Office Assistant I</td><td>Rowe-Schoen</td><td>Russia</td><td>3/25/2021</td><td>Crimson</td></tr><tr><th>5</th><td>Yancy Tear</td><td>Community Outreach Specialist</td><td>Wyman-Ledner</td><td>Brazil</td><td>5/22/2020</td><td>Indigo</td></tr><tr><th>6</th><td>Irma Vasilik</td><td>Editor</td><td>Wiza, Bins and Emard</td><td>Venezuela</td><td>12/8/2020</td><td>Purple</td></tr><tr><th>7</th><td>Meghann Durtnal</td><td>Staff Accountant IV</td><td>Schuster-Schimmel</td><td>Philippines</td><td>2/17/2021</td><td>Yellow</td></tr><tr><th>8</th><td>Sammy Seston</td><td>Accountant I</td><td>O'Hara, Welch and Keebler</td><td>Indonesia</td><td>5/23/2020</td><td>Crimson</td></tr><tr><th>9</th><td>Lesya Tinham</td><td>Safety Technician IV</td><td>Turner-Kuhlman</td><td>Philippines</td><td>2/21/2021</td><td>Maroon</td></tr><tr><th>10</th><td>Zaneta Tewkesbury</td><td>VP Marketing</td><td>Sauer LLC</td><td>Chad</td><td>6/23/2020</td><td>Green</td></tr><tr><th>11</th><td>Andy Tipple</td><td>Librarian</td><td>Hilpert Group</td><td>Poland</td><td>7/9/2020</td><td>Indigo</td></tr><tr><th>12</th><td>Sophi Biles</td><td>Recruiting Manager</td><td>Gutmann Inc</td><td>Indonesia</td><td>2/12/2021</td><td>Maroon</td></tr><tr><th>13</th><td>Florida Garces</td><td>Web Developer IV</td><td>Gaylord, Pacocha and Baumbach</td><td>Poland</td><td>5/31/2020</td><td>Purple</td></tr><tr><th>14</th><td>Maribeth Popping</td><td>Analyst Programmer</td><td>Deckow-Pouros</td><td>Portugal</td><td>4/27/2021</td><td>Aquamarine</td></tr><tr><th>15</th><td>Moritz Dryburgh</td><td>Dental Hygienist</td><td>Schiller, Cole and Hackett</td><td>Sri Lanka</td><td>8/8/2020</td><td>Crimson</td></tr><tr><th>16</th><td>Reid Semiras</td><td>Teacher</td><td>Sporer, Sipes and Rogahn</td><td>Poland</td><td>7/30/2020</td><td>Green</td></tr><tr><th>17</th><td>Alec Lethby</td><td>Teacher</td><td>Reichel, Glover and Hamill</td><td>China</td><td>2/28/2021</td><td>Khaki</td></tr><tr><th>18</th><td>Aland Wilber</td><td>Quality Control Specialist</td><td>Kshlerin, Rogahn and Swaniawski</td><td>Czech Republic</td><td>9/29/2020</td><td>Purple</td></tr><tr><th>19</th><td>Teddie Duerden</td><td>Staff Accountant III</td><td>Pouros, Ullrich and Windler</td><td>France</td><td>10/27/2020</td><td>Aquamarine</td></tr><tr><th>20</th><td>Lorelei Blackstone</td><td>Data Coordiator</td><td>Witting, Kutch and Greenfelder</td><td>Kazakhstan</td><td>6/3/2020</td><td>Red</td></tr></tbody><tfoot><tr><th></th><th>Name</th><th>Job</th><th>company</th><th>location</th><th>Last Login</th><th>Favorite Color`);
function Ft() {
  return zt();
}
var Wt = /* @__PURE__ */ x("<p>Loading..."), Jt = /* @__PURE__ */ x("<span>Error: "), Qt = /* @__PURE__ */ x("<div class=rounded-box>"), Zt = /* @__PURE__ */ x('<div class="tab-content bg-base-100 border-base-300 rounded-box p-6"><input type=number min=1 placeholder="Enter Numeric Id">');
const Yt = async (t) => (await fetch(`https://swapi.dev/api/people/${t}/`)).json();
function Xt() {
  const [t, n] = v("1"), [e] = jt(t, Yt);
  return (() => {
    var r = Zt(), s = r.firstChild;
    return s.$$input = (i) => n(i.currentTarget.value), S(r, m(Bt, {
      get when() {
        return e.loading;
      },
      get children() {
        return Wt();
      }
    }), null), S(r, m(Kt, {
      get children() {
        return [m(tt, {
          get when() {
            return e.error;
          },
          get children() {
            var i = Jt();
            return i.firstChild, S(i, () => e.error(), null), i;
          }
        }), m(tt, {
          get when() {
            return e();
          },
          get children() {
            var i = Qt();
            return S(i, () => JSON.stringify(e(), null, 2)), i;
          }
        })];
      }
    }), null), r;
  })();
}
ht(["input"]);
var te = /* @__PURE__ */ x('<div class="tabs tabs-lifted"><input type=radio id=tab1 class=tab aria-label="Tab 1"><div class="tab-content bg-base-100 border-base-300 rounded-box p-6">Hello tab 1</div><input type=radio id=tab2 class=tab aria-label="Tab 2"><input type=radio id=tab3 class=tab aria-label="Tab 3"><div class="tab-content bg-base-100 border-base-300 rounded-box p-6">');
function ee() {
  const [t, n] = v("tab1");
  return (() => {
    var e = te(), r = e.firstChild, s = r.nextSibling, i = s.nextSibling, o = i.nextSibling, l = o.nextSibling;
    return r.$$click = () => n("tab1"), i.$$click = () => n("tab2"), S(e, m(Xt, {}), o), o.$$click = () => n("tab3"), S(l, m(Ft, {})), O(() => r.checked = t() === "tab1"), O(() => i.checked = t() === "tab2"), O(() => o.checked = t() === "tab3"), e;
  })();
}
ht(["click"]);
var ne = /* @__PURE__ */ x('<div class=p-2><h1 class="text-2xl font-bold mb-3">Tab Example');
const re = () => (Et(), (() => {
  var t = ne();
  return t.firstChild, S(t, m(ee, {}), null), t;
})());
Dt("pe-view", re);
