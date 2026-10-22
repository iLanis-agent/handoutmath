const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { sheets: sheetsTruth, ream: reamTruth, stack: stackTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the copies must be from 1 to 10000 with no decimal places",
  "the pages a copy must be from 1 to 1000 with no decimal places",
  "the pages a sheet must be from 1 to 4 with no decimal places",
  "the sheets must be from 1 to 10000000 with no decimal places",
  "the sheets a ream must be from 1 to 10000 with no decimal places",
  "the stack size must be from 1 to 10000 with no decimal places",
  "the reams must be from 1 to 100000 with no decimal places",
  "the price must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
