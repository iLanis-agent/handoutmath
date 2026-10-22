import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def sheets(c, p, s):
    a = -(-p//s)
    return f"The {pl(c,' copy',' copies')} of {pl(p,' page',' pages')} at {pl(s,' page',' pages')} a sheet take {pl(a,' sheet',' sheets')} a copy, {pl(c*a,' sheet',' sheets')} in all."
def ream(n, p):
    k = -(-n//p)
    return f"The {pl(n,' sheet',' sheets')} in reams of {p} take {pl(k,' ream',' reams')}, leaving {pl(k*p-n,' sheet',' sheets')} spare."
def stack(c, s):
    k = -(-c//s)
    return f"The {pl(c,' copy',' copies')} in stacks of {s} make {pl(k,' stack',' stacks')}, the last stack holding {c-(k-1)*s}."
def cost(r, rp, n, sp):
    return f"The {pl(r,' ream',' reams')} at ${money(rp)} and {pl(n,' sheet',' sheets')} at ${money(sp)} cost ${money(r*rp+n*sp)}, reams ${money(r*rp)} and sheets ${money(n*sp)}."
random.seed(770)
R=random.randint
cases = [
 dict(fn="sheets", args=["30","5","2"], expect=sheets(30,5,2)),
 dict(fn="ream", args=["90","500"], expect=ream(90,500)),
 dict(fn="stack", args=["30","8"], expect=stack(30,8)),
 dict(fn="cost", args=["1","7.50","90","0.04"], expect=cost(1,750,90,4)),
 dict(fn="sheets", args=["1","1","1"], expect=sheets(1,1,1)),
 dict(fn="ream", args=["1","1"], expect=ream(1,1)),
 dict(fn="stack", args=["1","1"], expect=stack(1,1)),
 dict(fn="stack", args=["32","8"], expect=stack(32,8)),
 dict(fn="cost", args=["1","0.01","1","0.01"], expect=cost(1,1,1,1)),
]
for _ in range(20):
    c,p,s=R(1,10000),R(1,1000),R(1,4); cases.append(dict(fn="sheets", args=[str(c),str(p),str(s)], expect=sheets(c,p,s)))
for _ in range(20):
    n,p=R(1,10000000),R(1,10000); cases.append(dict(fn="ream", args=[str(n),str(p)], expect=ream(n,p)))
for _ in range(20):
    c,s=R(1,10000),R(1,10000); cases.append(dict(fn="stack", args=[str(c),str(s)], expect=stack(c,s)))
for _ in range(20):
    r,rp,n,sp=R(1,100000),R(1,1000000),R(1,10000000),R(1,1000000); cases.append(dict(fn="cost", args=[str(r),dec(rp),str(n),dec(sp)], expect=cost(r,rp,n,sp)))
errs=[["sheets",["0","5","2"]],["sheets",["10001","5","2"]],["sheets",["30","0","2"]],["sheets",["30","1001","2"]],["sheets",["30","5","0"]],["sheets",["30","5","5"]],["sheets",["30.5","5","2"]],
 ["ream",["0","500"]],["ream",["10000001","500"]],["ream",["90","0"]],["ream",["90","10001"]],
 ["stack",["0","8"]],["stack",["30","0"]],["stack",["30","10001"]],
 ["cost",["0","7.5","90","0.04"]],["cost",["1","0","90","0.04"]],["cost",["1","7.5","0","0.04"]],["cost",["1","7.5","90","0"]],["cost",["1","7.5","90","10000.01"]],["cost",["1","7.555","90","0.04"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
