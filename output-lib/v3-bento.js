import './index.css';
import { watch as S, defineComponent as U, ref as I, computed as k, onMounted as Z, provide as M, useSlots as q, openBlock as b, createElementBlock as L, normalizeStyle as X, Fragment as J, renderList as K, createBlock as Q, resolveDynamicComponent as ee, normalizeClass as O, createCommentVNode as H, renderSlot as C, withDirectives as te, createElementVNode as ie, vShow as ae, inject as V, unref as c } from "vue";
let z = { x: 0, y: 0 }, F = { x: 0, y: 0 }, _ = [];
function oe(a, i, e, t, o, f, n, l) {
  S(l, (h, v) => {
    h ? (n("dragStart", e.value), document.body.style.cursor = "grabbing") : h || (n("dragEnd", i.value), document.body.style.cursor = "unset");
  }), S(() => f.maximumCells, (h, v) => {
    T(i, h);
  }), S(() => f.disabled, (h, v) => {
    h ? s() : u();
  }, { immediate: !0 }), a.value.addEventListener("pointerdown", (h) => {
    h.preventDefault();
  }, !1);
  function u() {
    window.addEventListener("pointerdown", d, !1), window.addEventListener("pointermove", E, !1), window.addEventListener("pointerup", A, !1);
  }
  function s() {
    window.removeEventListener("pointerdown", d, !1), window.removeEventListener("pointermove", E, !1), window.removeEventListener("pointerup", A, !1);
  }
  function d(h) {
    z = { x: h.clientX, y: h.clientY }, e.value = B(z), e.value && (l.value = !0, t.value = Object.assign({}, e.value));
  }
  function E(h) {
    var j;
    F = { x: h.clientX, y: h.clientY };
    const v = (F.x - z.x) / o, g = (F.y - z.y) / o;
    if (!((j = a.value) == null ? void 0 : j.getBoundingClientRect()) || !e.value)
      return;
    if (l.value) {
      e.value.x += v, e.value.y += g, e.value.x < 0 && (e.value.x = 0), e.value.x + e.value.width > f.maximumCells && (e.value.x = f.maximumCells - e.value.width), e.value.y < 0 && (e.value.y = 0), z = { x: h.clientX, y: h.clientY }, t.value.x = Math.round(e.value.x), t.value.y = Math.round(e.value.y);
      const p = [];
      i.value.forEach((y) => {
        y.id !== e.value.id && p.push(y);
      }), _ = R(p);
      const w = _.length;
      W(w, p);
      const m = N(t.value, _);
      m < t.value.y && (t.value.y = m);
      const x = Y(_, p);
      $(t.value, x);
    }
    function $(p, w) {
      const m = [];
      w.forEach((x, y) => {
        p.id !== x.id && le(p, x) && m.push(x);
      }), m.forEach((x) => {
        for (let y = x.y + 1; y <= p.y + p.height; y++)
          x.y = y, $(x, w);
      });
    }
    function Y(p, w) {
      const m = [];
      return Array.from(new Set(p.flat())).forEach((x) => {
        w.forEach((y) => {
          y.id === x && m.findIndex((D) => D.id === y.id) === -1 && m.push(y);
        });
      }), m;
    }
    function W(p, w) {
      for (let m = 0; m < p; m++)
        _[m] && _[m].length > 0 && _[m].forEach((x) => {
          x && w.forEach((y) => {
            if (y.id === x) {
              const D = N(y, _);
              D < y.y && (y.y = D);
            }
          });
        }), _ = R(w);
    }
  }
  function A(h) {
    e.value && (e.value.x = t.value.x, e.value.y = t.value.y, e.value = null), z.x = 0, z.y = 0, P(i), l.value = !1;
  }
  function B(h) {
    let v = null;
    const g = { x: h.x, y: h.y };
    let r = document.elementFromPoint(g.x, g.y);
    for (; r && !r.classList.contains(f.commonClass); )
      r = r.parentElement;
    return r !== null && r.id && (v = i.value.filter(($) => $.id === (r == null ? void 0 : r.id))), v ? v[0] : null;
  }
}
function P(a) {
  const i = a.value.map((t) => t);
  i.sort((t, o) => t.y !== o.y ? t.y - o.y : t.x - o.x);
  const e = new Map(i.map((t, o) => [t.id, o]));
  a.value.forEach((t) => {
    const o = e.get(t.id);
    o !== void 0 && (t.index = o);
  });
}
function ne(a, i) {
  const e = se(a.value), t = ue(a.value, i.maximumCells);
  (e || t.length) && T(a, i.maximumCells);
}
function T(a, i) {
  const e = a.value.reduce((n, l) => n + l.y + l.height, 0), t = Array.from({ length: e }).fill(0).map(() => Array.from({ length: i }).fill(0));
  P(a);
  const o = a.value.map((n) => n), f = new Map(o.map((n, l) => [n.id, l]));
  o.sort((n, l) => n.y !== l.y ? n.y - l.y : n.x - l.x);
  for (let n = 0; n < o.length; n++) {
    let l = !1;
    for (let u = 0; u < t.length && !l; u++)
      for (let s = 0; s < t[u].length; s++) {
        if (o[n].width === 2 && o[n].height === 2 && t[u][s] === 0 && t[u][s + 1] === 0 && t[u + 1][s] === 0 && t[u + 1][s + 1] === 0) {
          const d = f.get(o[n].id);
          d && (a.value[d].x = s, a.value[d].y = u), t[u][s] = 1, t[u][s + 1] = 1, t[u + 1][s] = 1, t[u + 1][s + 1] = 1, l = !0;
          break;
        }
        if (o[n].width === 2 && o[n].height === 1 && t[u][s] === 0 && t[u][s + 1] === 0) {
          const d = f.get(o[n].id);
          d && (a.value[d].x = s, a.value[d].y = u), t[u][s] = 1, t[u][s + 1] = 1, l = !0;
          break;
        }
        if (o[n].width === 1 && o[n].height === 2 && t[u][s] === 0 && t[u + 1][s] === 0) {
          const d = f.get(o[n].id);
          d && (a.value[d].x = s, a.value[d].y = u), t[u][s] = 1, t[u + 1][s] = 1, l = !0;
          break;
        }
        if (o[n].width === 1 && o[n].height === 1 && t[u][s] === 0) {
          const d = f.get(o[n].id);
          d && (a.value[d].x = s, a.value[d].y = u), t[u][s] = 1, l = !0;
          break;
        }
      }
  }
}
function se(a) {
  for (let i = 0; i < a.length; i++) {
    const e = a[i];
    for (let t = i + 1; t < a.length; t++) {
      const o = a[t], f = e.x + e.width > o.x && e.x < o.x + o.width, n = e.y + e.height > o.y && e.y < o.y + o.height;
      if (f && n)
        return !0;
    }
  }
  return !1;
}
function N(a, i) {
  for (let e = a.y - 1; e >= 0; e--)
    if (i[e] !== void 0) {
      for (let t = a.x; t < a.x + a.width; t++)
        if (!(i[e] && i[e + 1] && i[e][t] !== void 0 && i[e + 1][t] !== void 0 && i[e][t] === i[e + 1][t])) {
          if (i[e][t] !== void 0)
            return e + 1;
        }
    }
  return 0;
}
function R(a) {
  const i = [];
  return a.forEach((e) => {
    for (let t = e.y; t < e.y + e.height; t++) {
      i[t] === void 0 && (i[t] = []);
      for (let f = e.x; f < e.x + e.width; f++)
        i[t][f] = e.id;
    }
  }), i;
}
function le(a, i) {
  return a.x < i.x + i.width && a.x + a.width > i.x && a.y < i.y + i.height && a.y + a.height > i.y;
}
function ue(a, i) {
  const e = [];
  return a.forEach((t) => {
    const o = t.x + t.width, f = t.x, n = t.y;
    switch (!0) {
      case o > i:
        e.push({
          element: t,
          type: "maxX"
        });
        break;
      case f < 0:
        e.push({
          element: t,
          type: "minX"
        });
        break;
      case n < 0:
        e.push({
          element: t,
          type: "minY"
        });
        break;
    }
  }), e;
}
const de = { key: 0 }, re = { key: 1 }, he = { key: 1 }, fe = /* @__PURE__ */ U({
  __name: "Bento",
  props: {
    bentoCells: {},
    size: { default: 100 },
    maximumCells: { default: 4 },
    gap: { default: 10 },
    disabled: { type: Boolean, default: !1 },
    commonClass: { default: "bento-item" }
  },
  emits: ["dragStart", "dragEnd"],
  setup(a, { emit: i }) {
    var B;
    const e = a, t = i, o = I(!1), f = k(() => `${e.maximumCells * e.size + (e.maximumCells - 1) * e.gap}px`), n = I("500px"), l = I(e.bentoCells), u = I(), s = I(), d = I({
      id: "proxy",
      index: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    (B = l.value) != null && B.length && ne(l, e), Z(() => {
      oe(u, l, s, d, e.size, e, t, o);
    }), S(l, (h) => {
      if (h != null && h.length) {
        const v = h.reduce((g, r) => (g == null ? void 0 : g.y) + (g == null ? void 0 : g.height) > (r == null ? void 0 : r.y) + (r == null ? void 0 : r.height) ? g : r);
        if (!v)
          return;
        n.value = `${(v.y + v.height) * e.size + (v.y + v.height - 1) * e.gap}px`;
      }
    }, { deep: !0, immediate: !0 }), M("size", e.size), M("gap", e.gap), M("commonClass", e.commonClass), M("isDragging", o), M("currentClickedElement", s);
    const E = !!q().default, A = k(() => l.value.every((v) => v.component) ? "data" : "slot");
    return (h, v) => {
      var g;
      return (g = l.value) != null && g.length ? (b(), L("div", {
        key: 0,
        ref_key: "bentoContainerRef",
        ref: u,
        style: X({
          /* touch-action 是为了解决 pointer 事件三次之后不生效的问题。其实这个监听改成 mouse 和 touch 就行了，后面优化 */
          /* https://segmentfault.com/a/1190000040746305 */
          touchAction: "auto",
          height: n.value,
          width: f.value,
          transition: "all 500ms ease 0s",
          position: "relative",
          willChange: "transform",
          marginLeft: "auto",
          marginRight: "auto"
        })
      }, [
        A.value === "data" ? (b(), L("div", de, [
          (b(!0), L(J, null, K(l.value, (r, $) => (b(), Q(ee(r.component), {
            id: `${r.id}`,
            key: r.id,
            modelValue: l.value[$],
            "onUpdate:modelValue": (Y) => l.value[$] = Y,
            class: O(r !== s.value ? "bento-item" : "z-9"),
            style: X({
              position: "absolute",
              transform: `
            translate3d(
              ${r.x * (e.size + e.gap)}px,
              ${r.y * (e.size + e.gap)}px,
            0)`,
              width: `${r.width === 2 ? r.width * e.size + e.gap : r.width * e.size}px`,
              height: `${r.height === 2 ? r.height * e.size + e.gap : r.height * e.size}px`
            })
          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "class", "style"]))), 128))
        ])) : H("", !0),
        A.value === "slot" ? (b(), L("div", re, [
          C(h.$slots, "default", {}, void 0, !0)
        ])) : H("", !0),
        te(ie("div", {
          class: "bento-item-placeholder",
          style: X({
            willChange: "transform",
            position: "absolute",
            transform: `
          translate3d(
            ${d.value.x * (e.size + e.gap)}px,
            ${d.value.y * (e.size + e.gap)}px,
          0)`,
            width: `${d.value.width === 2 ? d.value.width * e.size + e.gap : d.value.width * e.size}px`,
            height: `${d.value.height === 2 ? d.value.height * e.size + e.gap : d.value.height * e.size}px`
          })
        }, [
          C(h.$slots, "bento-item-placeholder", {}, void 0, !0)
        ], 4), [
          [ae, s.value]
        ])
      ], 4)) : (b(), L("div", he, [
        C(h.$slots, "empty", {}, void 0, !0)
      ]));
    };
  }
}), G = (a, i) => {
  const e = a.__vccOpts || a;
  for (const [t, o] of i)
    e[t] = o;
  return e;
}, ge = /* @__PURE__ */ G(fe, [["__scopeId", "data-v-76dc0442"]]), ce = ["id"], ve = /* @__PURE__ */ U({
  __name: "BentoItem",
  props: {
    id: {},
    x: {},
    y: {},
    width: { default: 1 },
    height: { default: 1 }
  },
  setup(a) {
    const i = a, e = V("size"), t = V("gap"), o = V("commonClass"), f = V("currentClickedElement"), n = I("");
    return S(f, (l, u) => {
      var s;
      i.id === ((s = f.value) == null ? void 0 : s.id) ? n.value = "z-9" : setTimeout(() => {
        n.value = "";
      }, 500);
    }, { deep: !0 }), (l, u) => {
      var s, d;
      return b(), L("div", {
        id: `${i.id}`,
        class: O(`${i.id !== ((s = c(f)) == null ? void 0 : s.id) ? c(o) : ""} ${n.value}`),
        style: X({
          willChange: "transform",
          overflow: "hidden",
          position: "absolute",
          transform: i.id === ((d = c(f)) == null ? void 0 : d.id) ? `translate3d(
            ${c(f).x * (c(e) + c(t))}px,
            ${c(f).y * (c(e) + c(t))}px,
          0)` : `translate3d(
            ${i.x * (c(e) + c(t))}px,
            ${i.y * (c(e) + c(t))}px,
          0)`,
          width: `${i.width === 2 ? i.width * c(e) + c(t) : i.width * c(e)}px`,
          height: `${i.height === 2 ? i.height * c(e) + c(t) : i.height * c(e)}px`,
          userSelect: "none"
        })
      }, [
        C(l.$slots, "default", {}, void 0, !0)
      ], 14, ce);
    };
  }
}), me = /* @__PURE__ */ G(ve, [["__scopeId", "data-v-35bb59f4"]]);
export {
  ge as Bento,
  me as BentoItem
};
