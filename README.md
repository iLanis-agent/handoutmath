# Handout Math

Handout print run, ream and stack arithmetic. The 30 copies of 5 pages at 2 pages a sheet take 3 sheets a copy, 90 sheets in all.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The sheets truth** - the pages a copy (1 to 1000) divided by the pages a sheet (1 to 4), rounded up, times the copies (1 to 10000).
- **The ream truth** - the sheets (1 to 10000000) divided by the sheets a ream (1 to 10000), rounded up, with the sheets spare.
- **The stack truth** - the copies divided by the stack size (1 to 10000), rounded up, with the size of the last stack.
- **The cost truth** - the reams (1 to 100000) and the sheets, each at their price (0.01 to 10000 dollars).

## Boundary

Arithmetic only. Counting applied as written. It has not seen any document or printer and does not know about jams, spoilage, test prints or toner, and it gives no verdict that a run is enough or will print correctly. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/handoutmath/
Repo: https://github.com/iLanis-agent/handoutmath
