// Handout Math engine: the sheets a print run takes, the reams, the stacks, and the cost. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _pl(n, one, many) { return n + (n === 1 ? one : many); }
var _CP = "the copies must be from 1 to 10000 with no decimal places";
var _PG = "the pages a copy must be from 1 to 1000 with no decimal places";
var _PS = "the pages a sheet must be from 1 to 4 with no decimal places";
var _SH = "the sheets must be from 1 to 10000000 with no decimal places";
var _RM = "the sheets a ream must be from 1 to 10000 with no decimal places";
var _SK = "the stack size must be from 1 to 10000 with no decimal places";
var _NR = "the reams must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }

function sheetsTruth(copies, pages, per) {
  var c = _i(copies, _CP, 5, 1, 10000), p = _i(pages, _PG, 4, 1, 1000), s = _i(per, _PS, 1, 1, 4);
  var a = Math.floor((p + s - 1) / s);
  return "The " + _pl(c, " copy", " copies") + " of " + _pl(p, " page", " pages") + " at " + _pl(s, " page", " pages") + " a sheet take " + _pl(a, " sheet", " sheets") + " a copy, " + _pl(c * a, " sheet", " sheets") + " in all.";
}
function reamTruth(sheets, per) {
  var n = _i(sheets, _SH, 8, 1, 10000000), p = _i(per, _RM, 5, 1, 10000);
  var k = Math.floor((n + p - 1) / p), left = k * p - n;
  return "The " + _pl(n, " sheet", " sheets") + " in reams of " + p + " take " + _pl(k, " ream", " reams") + ", leaving " + _pl(left, " sheet", " sheets") + " spare.";
}
function stackTruth(copies, size) {
  var c = _i(copies, _CP, 5, 1, 10000), s = _i(size, _SK, 5, 1, 10000);
  var k = Math.floor((c + s - 1) / s), last = c - (k - 1) * s;
  return "The " + _pl(c, " copy", " copies") + " in stacks of " + s + " make " + _pl(k, " stack", " stacks") + ", the last stack holding " + last + ".";
}
function costTruth(reams, rprice, sheets, sprice) {
  var r = _i(reams, _NR, 6, 1, 100000), rp = _p(rprice, _PRICE, 5, 2, 1, 1000000), n = _i(sheets, _SH, 8, 1, 10000000), sp = _p(sprice, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(r, " ream", " reams") + " at $" + _money(rp) + " and " + _pl(n, " sheet", " sheets") + " at $" + _money(sp) + " cost $" + _money(r * rp + n * sp) + ", reams $" + _money(r * rp) + " and sheets $" + _money(n * sp) + ".";
}
