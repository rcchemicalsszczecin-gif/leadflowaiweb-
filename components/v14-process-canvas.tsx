const steps=[
["01","Diagnoza","Cel, odbiorca, obecny stan i wynik biznesowy."],
["02","Architektura","Informacja, UX, content, search i dane."],
["03","Projekt + build","Design system, komponenty, kod i interakcje."],
["04","Walidacja","Mobile, dostępność, performance i bezpieczeństwo."],
["05","Publikacja + rozwój","Wdrożenie, monitoring i dalsze decyzje."],
] as const;
const quality=[
["ACCESSIBILITY","Klawiatura · focus · kontrast · reduced motion"],
["PERFORMANCE","Budżety · CWV · JS/CSS · static artifact"],
["SEARCH","SEO · AEO · GEO · schema · canonical"],
["SECURITY","Boundary · brak sekretów · kontrola integracji"],
] as const;

export function V14ProcessCanvas(){return(
<section aria-labelledby="v14-process-title" style={{background:"#0a0d10",color:"#f5f7f2",padding:"118px 0 132px"}}>
<div className="v14-shell" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,420px),1fr))",gap:64,alignItems:"start"}}>
<div><p style={{margin:0,fontSize:11,letterSpacing:".16em",color:"#8f998f"}}>05 / METODOLOGIA</p><h2 id="v14-process-title" style={{margin:"18px 0 22px",fontSize:"clamp(42px,5vw,70px)",lineHeight:.98,letterSpacing:"-.06em"}}>Od decyzji biznesowej do działającego produktu.</h2><p style={{margin:0,maxWidth:610,fontSize:17,lineHeight:1.65,color:"#a7afa7"}}>Proces ma prowadzić do kolejnych artefaktów i decyzji, nie do prezentacji dla samej prezentacji.</p><ol style={{listStyle:"none",padding:0,margin:"34px 0 0"}}>{steps.map(([n,t,c])=><li key={n} style={{display:"grid",gridTemplateColumns:"42px 150px 1fr",gap:14,padding:"15px 0",borderTop:"1px solid rgba(255,255,255,.1)",alignItems:"start"}}><span style={{fontSize:10,color:"#c7ff2f"}}>{n}</span><strong style={{fontSize:13}}>{t}</strong><small style={{fontSize:12,lineHeight:1.45,color:"#7f897f"}}>{c}</small></li>)}</ol></div>
<figure style={{margin:0,border:"1px solid rgba(255,255,255,.13)",borderRadius:26,background:"#101519",padding:18,boxShadow:"0 36px 90px rgba(0,0,0,.32)"}}><div style={{display:"flex",alignItems:"center",gap:7,padding:"3px 4px 16px",borderBottom:"1px solid rgba(255,255,255,.08)"}}><i style={{width:7,height:7,borderRadius:"50%",background:"#c7ff2f"}}/><small style={{fontSize:9,letterSpacing:".12em",color:"#778177"}}>LEADFLOW / QUALITY CANVAS</small><b style={{marginLeft:"auto",fontSize:9,color:"#c7ff2f"}}>PRE-PUBLISH</b></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:10,paddingTop:16}}>{quality.map(([t,c],i)=><article key={t} style={{minHeight:145,border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:15,background:i===1?"linear-gradient(145deg,#142018,#101519)":"rgba(255,255,255,.02)"}}><small style={{fontSize:8,color:"#c7ff2f"}}>0{i+1}</small><strong style={{display:"block",margin:"12px 0 9px",fontSize:15}}>{t}</strong><span style={{fontSize:11,lineHeight:1.5,color:"#879087"}}>{c}</span><div aria-hidden="true" style={{height:4,marginTop:17,borderRadius:99,background:"linear-gradient(90deg,#c7ff2f 0 72%,#29312b 72%)"}}/></article>)}</div><div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:18,alignItems:"center",marginTop:10,padding:"16px 14px",borderRadius:15,background:"#0b0f12"}}><div><small style={{fontSize:8,color:"#778177"}}>RELEASE RULE</small><strong style={{display:"block",marginTop:5,fontSize:14}}>Publikujemy dopiero po przejściu ustalonych gate’ów.</strong></div><span style={{padding:"7px 10px",borderRadius:99,border:"1px solid #c7ff2f55",color:"#c7ff2f",fontSize:9}}>EVIDENCE FIRST</span></div><figcaption style={{marginTop:12,fontSize:9,color:"#667066"}}>Panel pokazuje obszary walidacji, nie syntetyczne wyniki klienta.</figcaption></figure>
</div></section>)}
