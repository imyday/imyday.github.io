var s;import{CommonModule as g,DomSanitizer as b,Router as h,RouterLink as u,RouterModule as x,WebPubStore as _,computed as w,inject as l,\u0275\u0275advance as c,\u0275\u0275conditional as d,\u0275\u0275defineComponent as y,\u0275\u0275element as m,\u0275\u0275elementEnd as e,\u0275\u0275elementStart as o,\u0275\u0275getCurrentView as M,\u0275\u0275listener as O,\u0275\u0275nextContext as p,\u0275\u0275property as C,\u0275\u0275resetView as P,\u0275\u0275restoreView as k,\u0275\u0275sanitizeHtml as v,\u0275\u0275template as z,\u0275\u0275text as t,\u0275\u0275textInterpolate as S}from"./chunk-3ESZX4KG.js";function j(a,i){a&1&&(o(0,"div",4),m(1,"div",8),o(2,"span",9),t(3,"Loading sponsors..."),e()())}function L(a,i){if(a&1){const n=M();o(0,"div",5)(1,"h2",10),t(2,"Unable to Load Sponsors"),e(),o(3,"p",11),t(4),e(),o(5,"div",12)(6,"button",13),O("click",function(){k(n);const f=p();return P(f.retryLoad())}),t(7," Try Again "),e(),o(8,"a",14),t(9,"Return Home"),e()()()}if(a&2){const n=p();c(4),S(n.error())}}function T(a,i){if(a&1&&(o(0,"article",6)(1,"header",15)(2,"h1",16),t(3,"Sponsors"),e()(),m(4,"div",17),e()),a&2){const n=p();c(4),C("innerHTML",n.sanitizedContent(),v)}}function Y(a,i){a&1&&(o(0,"div",7)(1,"h2",18),t(2,"No Sponsors Information"),e(),o(3,"p",19),t(4," Sponsors information is not available for this publication. "),e(),o(5,"a",14),t(6,"Return Home"),e()())}var H=(s=class{constructor(){this.store=l(_),this.router=l(h),this.sanitizer=l(b),this.loading=this.store.pageContentLoading,this.error=this.store.pageContentError,this.content=this.store.currentPageContent,this.sanitizedContent=w(()=>{const i=this.content();if(!i)return null;const n=`<div class="sponsors-page__html-content">${i}</div>`;return this.sanitizer.bypassSecurityTrustHtml(n)})}ngOnInit(){this.store.loadPageContent("sponsors")}goBack(){this.router.navigate(["/"])}retryLoad(){this.store.loadPageContent("sponsors")}},s.\u0275fac=function(n){return new(n||s)},s.\u0275cmp=y({type:s,selectors:[["webpub-sponsors-page"]],decls:10,vars:4,consts:[[1,"sponsors-page","container"],["aria-label","Breadcrumb",1,"sponsors-page__breadcrumb"],["routerLink","/",1,"sponsors-page__back-link"],["aria-hidden","true",1,"sponsors-page__back-arrow"],["role","status","aria-live","polite",1,"sponsors-page__loading"],["role","alert",1,"sponsors-page__error"],[1,"sponsors-page__article"],[1,"sponsors-page__empty"],["aria-hidden","true",1,"sponsors-page__spinner"],[1,"sponsors-page__loading-text"],[1,"sponsors-page__error-title"],[1,"sponsors-page__error-message"],[1,"sponsors-page__error-actions"],["type","button",1,"btn-retry",3,"click"],["routerLink","/",1,"btn-home"],[1,"sponsors-page__header"],[1,"sponsors-page__title"],[1,"sponsors-page__content",3,"innerHTML"],[1,"sponsors-page__empty-title"],[1,"sponsors-page__empty-message"]],template:function(n,r){n&1&&(o(0,"main",0)(1,"nav",1)(2,"a",2)(3,"span",3),t(4,"\u2190"),e(),t(5," Back to Home "),e()(),z(6,j,4,0,"div",4)(7,L,10,1,"div",5)(8,T,5,1,"article",6)(9,Y,7,0,"div",7),e()),n&2&&(c(6),d(r.loading()?6:-1),c(),d(r.error()&&!r.loading()?7:-1),c(),d(!r.loading()&&!r.error()&&r.sanitizedContent()?8:-1),c(),d(!r.loading()&&!r.error()&&!r.sanitizedContent()?9:-1))},dependencies:[g,x,u],styles:[`

.shadow-none[_ngcontent-%COMP%] {
  box-shadow: none;
}
.shadow-sm[_ngcontent-%COMP%] {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.shadow-md[_ngcontent-%COMP%] {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.shadow-lg[_ngcontent-%COMP%] {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.shadow-xl[_ngcontent-%COMP%] {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
.h1-primary[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 2.125rem;
  color: #333333;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 1rem 0;
}
.h1-secondary[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 2.125rem;
  color: #00629b;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 1rem 0;
}
.h1-dark[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 2.125rem;
  color: #ffffff;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 1rem 0;
}
.h2-primary[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.75rem;
  color: #002855;
  line-height: 1.3;
  margin: 1.5625rem 0 0.75rem 0;
}
.h3-primary[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #454545;
  line-height: 1.3;
  margin: 1.3125rem 0 0.5rem 0;
}
.h4-primary[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #454545;
  line-height: 1.3;
  margin: 1.5625rem 0 0.5rem 0;
}
.subhead[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #333333;
  line-height: 1.3;
}
.subhead-dark[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #ffffff;
  line-height: 1.3;
}
.lead[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #454545;
}
.breadcrumb-text[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #777777;
}
.breadcrumb-dark[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #cecece;
}
.btn-primary[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.3125rem 0.625rem;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
  white-space: nowrap;
  background-color: #ffa300;
  color: #1a1a1a;
}
.btn-primary[_ngcontent-%COMP%]:active {
  transform: translateY(1px);
}
.btn-primary[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.btn-primary[_ngcontent-%COMP%]:hover, 
.btn-primary[_ngcontent-%COMP%]:focus {
  background-color: #e87722;
  color: #1a1a1a;
}
.btn-primary[_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #ffa300;
  outline-offset: 2px;
}
.btn-secondary[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.3125rem 0.625rem;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
  white-space: nowrap;
  background-color: transparent;
  color: #002855;
  border: 2px solid #002855;
}
.btn-secondary[_ngcontent-%COMP%]:active {
  transform: translateY(1px);
}
.btn-secondary[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.btn-secondary[_ngcontent-%COMP%]:hover, 
.btn-secondary[_ngcontent-%COMP%]:focus {
  background-color: #002855;
  color: #ffffff;
}
.btn-secondary[_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #ffa300;
  outline-offset: 2px;
}
.btn-danger[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.3125rem 0.625rem;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
  white-space: nowrap;
  background-color: #a40000;
  color: #ffffff;
}
.btn-danger[_ngcontent-%COMP%]:active {
  transform: translateY(1px);
}
.btn-danger[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.btn-danger[_ngcontent-%COMP%]:hover, 
.btn-danger[_ngcontent-%COMP%]:focus {
  background-color: #c00505;
  color: #ffffff;
}
.btn-danger[_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #ffa300;
  outline-offset: 2px;
}
.btn-link[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.3125rem 0.625rem;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
  white-space: nowrap;
  background: transparent;
  color: #00629b;
  padding: 0.5rem;
  text-transform: none;
}
.btn-link[_ngcontent-%COMP%]:active {
  transform: translateY(1px);
}
.btn-link[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.btn-link[_ngcontent-%COMP%]:hover, 
.btn-link[_ngcontent-%COMP%]:focus {
  color: #002855;
  text-decoration: underline;
}
.btn-link[_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #ffa300;
  outline-offset: 2px;
}
.btn-sm[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}
.btn-lg[_ngcontent-%COMP%] {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  letter-spacing: 0.02em;
}
.search-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
@media (min-width: 576px) {
  .search-container[_ngcontent-%COMP%] {
    flex-direction: row;
    gap: 0;
  }
}
.search-input-wrapper[_ngcontent-%COMP%] {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}
.search-icon[_ngcontent-%COMP%] {
  position: absolute;
  left: 1rem;
  width: 20px;
  height: 20px;
  color: #777777;
  pointer-events: none;
}
.search-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #333333;
  background: #ffffff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.2s ease;
}
.search-input[_ngcontent-%COMP%]::placeholder {
  color: #777777;
}
.search-input[_ngcontent-%COMP%]:focus {
  outline: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(255, 163, 0, 0.3);
}
@media (min-width: 576px) {
  .search-input[_ngcontent-%COMP%] {
    border-radius: 4px 0 0 4px;
  }
}
.search-button[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #1a1a1a;
  background: #ffa300;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}
.search-button[_ngcontent-%COMP%]:hover, 
.search-button[_ngcontent-%COMP%]:focus {
  background: #e87722;
}
.search-button[_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #ffa300;
  outline-offset: 2px;
}
@media (min-width: 576px) {
  .search-button[_ngcontent-%COMP%] {
    border-radius: 0 4px 4px 0;
  }
}
.form-control[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.form-control[_ngcontent-%COMP%]::placeholder {
  color: #777777;
}
.form-control[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #00629b;
  box-shadow: 0 0 0 3px rgba(255, 163, 0, 0.3);
}
.form-control[_ngcontent-%COMP%]:disabled {
  background: #f6f6f6;
  cursor: not-allowed;
}
.form-label[_ngcontent-%COMP%] {
  display: block;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #454545;
  margin-bottom: 0.5rem;
}
.form-group[_ngcontent-%COMP%] {
  margin-bottom: 1.5rem;
}
.form-select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23454545' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  padding-right: 2.5rem;
}
.form-select[_ngcontent-%COMP%]::placeholder {
  color: #777777;
}
.form-select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #00629b;
  box-shadow: 0 0 0 3px rgba(255, 163, 0, 0.3);
}
.form-select[_ngcontent-%COMP%]:disabled {
  background: #f6f6f6;
  cursor: not-allowed;
}
.form-check[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.form-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%], 
.form-check[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%] {
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.125rem;
  accent-color: #00629b;
  cursor: pointer;
}
.form-check[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:focus-visible, 
.form-check[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #ffa300;
  outline-offset: 2px;
}
.form-check[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  cursor: pointer;
}
.filter-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  padding: 0.5rem 0.75rem 0.5rem 2.25rem;
  font-size: 0.875rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23777777' stroke-width='2'%3e%3ccircle cx='11' cy='11' r='8'/%3e%3cpath d='M21 21l-4.35-4.35'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: 0.75rem center;
  background-size: 16px;
}
.filter-input[_ngcontent-%COMP%]::placeholder {
  color: #777777;
}
.filter-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #00629b;
  box-shadow: 0 0 0 3px rgba(255, 163, 0, 0.3);
}
.filter-input[_ngcontent-%COMP%]:disabled {
  background: #f6f6f6;
  cursor: not-allowed;
}
.card[_ngcontent-%COMP%] {
  position: relative;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card-accent[_ngcontent-%COMP%] {
  position: relative;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  padding-left: calc(1.5rem + 4px);
}
.card-accent[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background:
    linear-gradient(
      20deg,
      #00629b 0%,
      #002855 100%);
}
@media (min-width: 768px) {
  .card-accent[_ngcontent-%COMP%] {
    padding-left: calc(2rem + 5px);
  }
  .card-accent[_ngcontent-%COMP%]::before {
    width: 5px;
  }
}
.card-header[_ngcontent-%COMP%] {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e4e8;
}
@media (min-width: 768px) {
  .card-header[_ngcontent-%COMP%] {
    padding: 1.5rem 1.5rem 1rem;
  }
}
.card-body[_ngcontent-%COMP%] {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .card-body[_ngcontent-%COMP%] {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.card-footer[_ngcontent-%COMP%] {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e4e8;
  background: #f6f6f6;
}
.card-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  color: #002855;
  line-height: 1.3;
  margin: 0;
}
.card-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: inherit;
  text-decoration: none;
}
.card-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, 
.card-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus {
  color: #00629b;
  text-decoration: underline;
}
.card-subtitle[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #454545;
  margin: 0.25rem 0 0;
}
.card-compact[_ngcontent-%COMP%] {
  position: relative;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  min-height: 180px;
}
.card-compact[_ngcontent-%COMP%]:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.card-compact[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
}
.card-badge[_ngcontent-%COMP%] {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-family: "Montserrat", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 0.75rem;
  border-radius: 2px;
  background: #002855;
  color: #ffffff;
}
.card-badge-inline[_ngcontent-%COMP%] {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-family: "Montserrat", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 0.75rem;
  border-radius: 2px;
  background: #002855;
  color: #ffffff;
  position: static;
  align-self: flex-start;
  margin-bottom: 0.75rem;
  font-size: 0.6875rem;
  padding: 0.25rem 0.5rem;
}
.stats-container[_ngcontent-%COMP%] {
  display: flex;
  gap: 2rem;
  padding: 1rem 1.25rem;
  background: #f6f6f6;
  border-radius: 4px;
  border-left: 3px solid #00629b;
}
@media (max-width: 767px) {
  .stats-container[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 1rem;
  }
}
.stat-item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  text-align: center;
}
@media (min-width: 768px) {
  .stat-item[_ngcontent-%COMP%] {
    text-align: left;
  }
}
.stat-value[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #002855;
  line-height: 1.2;
}
.stat-label[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.8125rem;
  color: #454545;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.result-card[_ngcontent-%COMP%] {
  position: relative;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  padding: 1.5rem;
}
.result-card[_ngcontent-%COMP%]:hover {
  background: rgba(0, 98, 155, 0.02);
}
.result-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.1875rem;
  color: #002855;
  line-height: 1.3;
  margin: 0 0 0.5rem;
}
.result-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: inherit;
  text-decoration: none;
}
.result-title[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
.result-meta[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #454545;
  font-style: italic;
  margin-bottom: 0.5rem;
}
.result-abstract[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #454545;
  line-height: 1.6;
}
.index-card[_ngcontent-%COMP%] {
  position: relative;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.15s ease;
}
.index-card[_ngcontent-%COMP%]:hover {
  transform: translateX(4px);
  background: rgba(0, 98, 155, 0.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.index-badge[_ngcontent-%COMP%] {
  flex-shrink: 0;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #ffffff;
  background: #002855;
  border-radius: 2px;
}
.index-card-grid[_ngcontent-%COMP%] {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 991px) {
  .index-card-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 575px) {
  .index-card-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.index-card-grid[_ngcontent-%COMP%]    > .alert[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.index-card-item[_ngcontent-%COMP%] {
  position: relative;
  background: #ffffff;
  border: 1px solid #e0e4e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  transition: background-color 0.15s ease, box-shadow 0.2s ease;
  height: fit-content;
}
.index-card-item[_ngcontent-%COMP%]:hover {
  background: rgba(0, 98, 155, 0.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.index-card-name[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #002855;
  margin-bottom: 0.25rem;
  word-break: break-word;
}
.index-card-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: inherit;
  text-decoration: none;
}
.index-card-name[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  color: #00629b;
  text-decoration: underline;
}
.index-card-subtitle[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #454545;
  font-style: italic;
  margin-bottom: 0.5rem;
  word-break: break-word;
}
.index-card-count[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #ffffff;
  background: #00629b;
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  white-space: nowrap;
  align-self: flex-start;
}
.index-card-details[_ngcontent-%COMP%] {
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #e0e4e8;
}
@keyframes _ngcontent-%COMP%_spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes _ngcontent-%COMP%_slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.page-container[_ngcontent-%COMP%] {
  padding-top: 2.5rem;
  padding-bottom: 3rem;
}
@media (min-width: 768px) {
  .page-container[_ngcontent-%COMP%] {
    padding-top: 2.5rem;
    padding-bottom: 3rem;
  }
}
.page-header[_ngcontent-%COMP%] {
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
  background: #f6f6f6;
}
@media (min-width: 768px) {
  .page-header[_ngcontent-%COMP%] {
    padding: 2.5rem 2rem;
  }
}
@media (min-width: 1200px) {
  .page-header[_ngcontent-%COMP%] {
    padding: 2.5rem 2.5rem;
  }
}
.page-header-content[_ngcontent-%COMP%] {
  max-width: 800px;
}
.page-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 2.125rem;
  color: #333333;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0 0 1rem 0;
  margin-bottom: 0.5rem;
}
.page-subtitle[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 1.25rem;
  color: #333333;
  line-height: 1.3;
  color: #454545;
}
.breadcrumb-nav[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.breadcrumb-link[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #777777;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  transition: color 0.15s ease;
}
.breadcrumb-link[_ngcontent-%COMP%]:hover {
  color: #00629b;
}
.breadcrumb-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
}
.hero-section[_ngcontent-%COMP%] {
  position: relative;
  min-height: 28vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      #002855 0%,
      #00629b 100%);
}
.hero-section[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 50%);
  pointer-events: none;
}
.hero-content[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
  padding: 2rem 1.5rem;
  text-align: center;
}
.hero-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.75rem;
  color: #ffffff;
  line-height: 1.3;
  margin: 0 0 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
@media (min-width: 768px) {
  .hero-title[_ngcontent-%COMP%] {
    font-size: 2rem;
  }
}
@media (min-width: 992px) {
  .hero-title[_ngcontent-%COMP%] {
    font-size: 2.25rem;
  }
}
.hero-subtitle[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin: 0 0 1.5rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
@media (min-width: 768px) {
  .hero-subtitle[_ngcontent-%COMP%] {
    font-size: 1rem;
  }
}
.publications-grid[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.publications-grid-compact[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 576px) {
  .publications-grid-compact[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}
@media (min-width: 992px) {
  .publications-grid-compact[_ngcontent-%COMP%] {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}
.state-loading[_ngcontent-%COMP%] {
  text-align: center;
  padding: 4rem 2rem;
}
.state-loading[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border: 3px solid #f6f6f6;
  border-top-color: #00629b;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}
.state-loading[_ngcontent-%COMP%]   .loading-text[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
}
.state-error[_ngcontent-%COMP%] {
  text-align: center;
  padding: 4rem 2rem;
}
.state-error[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  color: #a40000;
  margin: 0 auto 1.5rem;
}
.state-error[_ngcontent-%COMP%]   .error-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  color: #333333;
  margin: 0 0 0.5rem;
}
.state-error[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  margin: 0;
}
.state-empty[_ngcontent-%COMP%] {
  text-align: center;
  padding: 4rem 2rem;
}
.state-empty[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  color: #454545;
  opacity: 0.5;
  margin: 0 auto 1.5rem;
}
.state-empty[_ngcontent-%COMP%]   .empty-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #002855;
  margin: 0 0 0.75rem;
}
.state-empty[_ngcontent-%COMP%]   .empty-description[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  margin: 0;
}
.section-divider[_ngcontent-%COMP%] {
  border: none;
  border-top: 1px solid #e0e4e8;
  margin: 2.5rem 0;
}
.mode-separator[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}
.mode-separator[_ngcontent-%COMP%]::before, 
.mode-separator[_ngcontent-%COMP%]::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e0e4e8;
}
.mode-separator__text[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #454545;
  text-transform: lowercase;
  white-space: nowrap;
}
.sponsors-page[_ngcontent-%COMP%] {
  padding-top: 2.5rem;
  padding-bottom: 3rem;
  min-height: 60vh;
}
.sponsors-page__breadcrumb[_ngcontent-%COMP%] {
  margin-bottom: 2rem;
}
.sponsors-page__back-link[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 0.875rem;
  color: #777777;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}
.sponsors-page__back-link[_ngcontent-%COMP%]:hover, 
.sponsors-page__back-link[_ngcontent-%COMP%]:focus {
  color: #0066c9;
  text-decoration: underline;
}
.sponsors-page__back-arrow[_ngcontent-%COMP%] {
  font-size: 1rem;
  transition: transform 0.2s ease;
}
.sponsors-page__back-link[_ngcontent-%COMP%]:hover   .sponsors-page__back-arrow[_ngcontent-%COMP%] {
  transform: translateX(-3px);
}
.sponsors-page__header[_ngcontent-%COMP%] {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e4e8;
}
.sponsors-page__title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 2.125rem;
  color: #333333;
  line-height: 1.3;
  margin: 0;
}
@media (min-width: 768px) {
  .sponsors-page__title[_ngcontent-%COMP%] {
    font-size: 2.5rem;
  }
}
.sponsors-page__article[_ngcontent-%COMP%] {
  max-width: 800px;
}
[_nghost-%COMP%]     .sponsors-page__html-content {
  font-family: "Open Sans", sans-serif;
  font-size: 1.125rem;
  color: #454545;
  line-height: 1.7;
}
[_nghost-%COMP%]     .sponsors-page__html-content h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 2.125rem;
  color: #333333;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
[_nghost-%COMP%]     .sponsors-page__html-content h1:first-child {
  margin-top: 0;
}
[_nghost-%COMP%]     .sponsors-page__html-content h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.75rem;
  color: #002855;
  line-height: 1.3;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}
[_nghost-%COMP%]     .sponsors-page__html-content h3 {
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #454545;
  line-height: 1.3;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
[_nghost-%COMP%]     .sponsors-page__html-content h4 {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #454545;
  line-height: 1.3;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
[_nghost-%COMP%]     .sponsors-page__html-content p {
  margin-bottom: 1rem;
}
[_nghost-%COMP%]     .sponsors-page__html-content p:last-child {
  margin-bottom: 0;
}
[_nghost-%COMP%]     .sponsors-page__html-content a {
  color: #0066c9;
  text-decoration: none;
  transition: color 0.2s ease;
}
[_nghost-%COMP%]     .sponsors-page__html-content a:hover, 
[_nghost-%COMP%]     .sponsors-page__html-content a:focus {
  text-decoration: underline;
}
[_nghost-%COMP%]     .sponsors-page__html-content a:visited {
  color: #336699;
}
[_nghost-%COMP%]     .sponsors-page__html-content ul, 
[_nghost-%COMP%]     .sponsors-page__html-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
[_nghost-%COMP%]     .sponsors-page__html-content ul li, 
[_nghost-%COMP%]     .sponsors-page__html-content ol li {
  margin-bottom: 0.5rem;
}
[_nghost-%COMP%]     .sponsors-page__html-content img {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
}
.sponsors-page__loading[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}
.sponsors-page__spinner[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border: 3px solid #f6f6f6;
  border-top-color: #00629b;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
  margin-bottom: 1rem;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.sponsors-page__loading-text[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
}
.sponsors-page__error[_ngcontent-%COMP%] {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}
.sponsors-page__error-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #333333;
  margin: 0 0 1rem 0;
}
.sponsors-page__error-message[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  margin-bottom: 1.5rem;
}
.sponsors-page__error-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.sponsors-page__empty[_ngcontent-%COMP%] {
  text-align: center;
  padding: 4rem 2rem;
}
.sponsors-page__empty-title[_ngcontent-%COMP%] {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  color: #333333;
  margin: 0 0 0.75rem 0;
}
.sponsors-page__empty-message[_ngcontent-%COMP%] {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: #454545;
  margin-bottom: 1.5rem;
}
.btn-retry[_ngcontent-%COMP%], 
.btn-home[_ngcontent-%COMP%] {
  display: inline-block;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.625rem 1.25rem;
  border-radius: 2px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.btn-retry[_ngcontent-%COMP%] {
  background-color: #ffa300;
  color: #1a1a1a;
  border: none;
}
.btn-retry[_ngcontent-%COMP%]:hover, 
.btn-retry[_ngcontent-%COMP%]:focus {
  background-color: #e87722;
  color: #1a1a1a;
}
.btn-home[_ngcontent-%COMP%] {
  background-color: transparent;
  color: #002855;
  border: 2px solid #002855;
}
.btn-home[_ngcontent-%COMP%]:hover, 
.btn-home[_ngcontent-%COMP%]:focus {
  background-color: #002855;
  color: #ffffff;
}`]}),s);export{H as SponsorsPageComponent};
