(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{276:function(e,t,n){},294:function(e,t){},296:function(e,t){},298:function(e,t){},302:function(e,t){},329:function(e,t){},331:function(e,t){},340:function(e,t){},342:function(e,t){},352:function(e,t){},354:function(e,t){},472:function(e,t){},474:function(e,t){},481:function(e,t){},482:function(e,t){},500:function(e,t){},572:function(e,t,n){},575:function(e,t,n){},578:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(42),i=n.n(a),s=(n(276),n(588)),u=n(593),o=n(589),l=n(26),d=n(91),j=n(23),p=n(10),b=n.n(p),h=n(22),O=n(584),y=n(267),x=n(585),f=n(29),m=n(34),v=n.n(m),g="0x049d9e577F709F61837C83107268B1b4Ba476808",w=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"uint256",name:"id",type:"uint256"}],name:"InvoicePaid",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"buyer",type:"address"},{indexed:!0,internalType:"uint256",name:"id",type:"uint256"}],name:"NewInvoice",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{inputs:[],name:"feeInBasisPoints",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function",constant:!0},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function",constant:!0},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"enum POS.Type",name:"kind",type:"uint8"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"usdPrice",type:"uint256"},{internalType:"uint256",name:"quantity",type:"uint256"},{internalType:"string",name:"upc",type:"string"},{internalType:"string",name:"imageUrl",type:"string"}],internalType:"struct POS.Product[]",name:"products",type:"tuple[]"},{internalType:"uint256",name:"discounts",type:"uint256"},{internalType:"address",name:"buyer",type:"address"},{internalType:"address",name:"beneficiary",type:"address"}],name:"createInvoice",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"enum POS.Type",name:"kind",type:"uint8"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"usdPrice",type:"uint256"},{internalType:"uint256",name:"quantity",type:"uint256"},{internalType:"string",name:"upc",type:"string"},{internalType:"string",name:"imageUrl",type:"string"}],internalType:"struct POS.Product[]",name:"products",type:"tuple[]"}],name:"getSubTotal",outputs:[{internalType:"uint256",name:"subtotal",type:"uint256"}],stateMutability:"pure",type:"function",constant:!0},{inputs:[{internalType:"uint256",name:"id",type:"uint256"}],name:"getInvoiceById",outputs:[{components:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"enum POS.Status",name:"status",type:"uint8"},{internalType:"uint256",name:"subtotal",type:"uint256"},{internalType:"uint256",name:"discounts",type:"uint256"},{internalType:"uint256",name:"total",type:"uint256"},{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"beneficiary",type:"address"},{internalType:"address",name:"buyer",type:"address"}],internalType:"struct POS.Invoice",name:"",type:"tuple"}],stateMutability:"view",type:"function",constant:!0},{inputs:[{internalType:"address",name:"ownerA",type:"address"}],name:"getInvoicesFor",outputs:[{components:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"enum POS.Status",name:"status",type:"uint8"},{internalType:"uint256",name:"subtotal",type:"uint256"},{internalType:"uint256",name:"discounts",type:"uint256"},{internalType:"uint256",name:"total",type:"uint256"},{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"beneficiary",type:"address"},{internalType:"address",name:"buyer",type:"address"}],internalType:"struct POS.Invoice[]",name:"",type:"tuple[]"}],stateMutability:"view",type:"function",constant:!0},{inputs:[{internalType:"uint256",name:"id",type:"uint256"}],name:"getInvoiceProducts",outputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"enum POS.Type",name:"kind",type:"uint8"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"usdPrice",type:"uint256"},{internalType:"uint256",name:"quantity",type:"uint256"},{internalType:"string",name:"upc",type:"string"},{internalType:"string",name:"imageUrl",type:"string"}],internalType:"struct POS.Product[]",name:"",type:"tuple[]"}],stateMutability:"view",type:"function",constant:!0},{inputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"enum POS.Type",name:"kind",type:"uint8"},{internalType:"uint256",name:"price",type:"uint256"},{internalType:"uint256",name:"usdPrice",type:"uint256"},{internalType:"uint256",name:"quantity",type:"uint256"},{internalType:"string",name:"upc",type:"string"},{internalType:"string",name:"imageUrl",type:"string"}],internalType:"struct POS.Product[]",name:"products",type:"tuple[]"}],name:"validateProducts",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"pure",type:"function",constant:!0},{inputs:[{internalType:"uint256",name:"id",type:"uint256"}],name:"deleteInvoice",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"id",type:"uint256"}],name:"payInvoice",outputs:[],stateMutability:"payable",type:"function",payable:!0},{inputs:[{internalType:"address",name:"beneficiary",type:"address"}],name:"getBalanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function",constant:!0},{inputs:[{internalType:"uint256",name:"newFeeInBasisPoints",type:"uint256"}],name:"setContractFee",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"withdraw",outputs:[],stateMutability:"nonpayable",type:"function"}],T=null,C=Object(f.b)("web3/connectToMetaMask",function(){var e=Object(h.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.request({method:"eth_requestAccounts"});case 2:return T=new v.a(window.ethereum),e.next=5,n.dispatch(A(!0));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),k=Object(f.b)("web3/listenForNewInvoices",Object(h.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:new T.eth.Contract(w,g).events.NewInvoice({},(function(e,t){console.log(e)})).on("connected",(function(e){console.log(e)})).on("data",(function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})))),S=Object(f.b)("web3/createInvoice",function(){var e=Object(h.a)(b.a.mark((function e(t){var n,c,r,a,i,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.discounts,c=t.client,r=t.products,a=window.ethereum.selectedAddress,e.prev=2,i=new T.eth.Contract(w,g),e.next=6,i.methods.createInvoice(r,n,c,a).send({from:a});case 6:s=e.sent,console.log(s),e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(2),e.abrupt("return",e.t0);case 13:return e.abrupt("return",!0);case 14:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()),P=Object(f.b)("web3/loadInvoice",function(){var e=Object(h.a)(b.a.mark((function e(t){var n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new T.eth.Contract(w,g),e.next=3,n.methods.getInvoiceById(t).call();case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I=Object(f.b)("web3/getInvoices",Object(h.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new T.eth.Contract(w,g),e.next=3,t.methods.getInvoicesFor(window.ethereum.selectedAddress).call();case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))),L=Object(f.b)("web3/getBalance",Object(h.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new T.eth.Contract(w,g),e.next=3,t.methods.getBalanceOf(window.ethereum.selectedAddress).call();case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))),B=Object(f.b)("web3/getContractFee",Object(h.a)(b.a.mark((function e(){var t,n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new T.eth.Contract(w,g),n=t.methods.feeInBasisPoints(),e.next=4,n.call();case 4:return c=e.sent,e.abrupt("return",c);case 6:case"end":return e.stop()}}),e)})))),M=Object(f.b)("web3/setContractFee",function(){var e=Object(h.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new T.eth.Contract(w,g),e.prev=1,e.next=4,n.methods.setContractFee(t).send({from:window.ethereum.selectedAddress});case 4:e.sent,e.next=10;break;case 7:return e.prev=7,e.t0=e.catch(1),e.abrupt("return",!1);case 10:return e.abrupt("return",!0);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()),F=Object(f.b)("web3/getInvoiceProducts",(function(e){return new T.eth.Contract(w,g).methods.getInvoiceProducts(e).call()})),N=Object(f.b)("web3/payInvoice",function(){var e=Object(h.a)(b.a.mark((function e(t,n){var c,r,a,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return new T.eth.Contract(w,g),e.prev=1,e.next=4,n.dispatch(P(t));case 4:return c=e.sent,r=c.payload,a=new T.eth.Contract(w,g),e.next=9,a.methods.payInvoice(t).send({from:window.ethereum.selectedAddress,value:r.total});case 9:i=e.sent,console.log(i),e.next=17;break;case 13:return e.prev=13,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",!1);case 17:return e.abrupt("return",!0);case 18:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t,n){return e.apply(this,arguments)}}()),E=Object(f.b)("web3/withdraw",function(){var e=Object(h.a)(b.a.mark((function e(t,n){var c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return new T.eth.Contract(w,g),e.prev=1,c=new T.eth.Contract(w,g),e.next=5,c.methods.withdraw().send({from:window.ethereum.selectedAddress});case 5:r=e.sent,console.log(r),e.next=13;break;case 9:return e.prev=9,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",!1);case 13:return e.abrupt("return",!0);case 14:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,n){return e.apply(this,arguments)}}()),G=Object(f.c)({name:"web3",initialState:{connected:!1,loadingInvoice:!1},reducers:{setConnected:function(e,t){e.connected=!0}},extraReducers:function(e){e.addCase(S.rejected,(function(e,t){console.log(t.error)})),e.addCase(P.pending,(function(e,t){e.loadingInvoice=!0})),e.addCase(P.fulfilled,(function(e,t){e.loadingInvoice=!1}))}}),A=G.actions.setConnected,H=G.reducer,U=(n(572),Object(f.c)({name:"app",initialState:{notification:{show:!1,message:"",type:"light",title:""},isLoading:!1},reducers:{sendNotification:function(e,t){e.notification={show:!0,message:t.payload.message,type:t.payload.type||"success",title:t.payload.title||"Success"}},closeNotitfication:function(e){e.notification={show:!1,message:"",type:"light",title:""}},setIsLoading:function(e,t){e.isLoading=t.payload}}})),q=U.actions,W=q.sendNotification,D=q.closeNotitfication,K=q.setIsLoading,Q=U.reducer,z=n(1);function J(){return Object(z.jsx)(O.a,{children:Object(z.jsxs)(y.a,{md:4,children:[Object(z.jsx)("div",{className:"clientButoon",children:Object(z.jsx)(d.b,{to:"/blockchain-developer-bootcamp-final-project/merchant",children:"Merchant"})}),Object(z.jsx)("div",{className:"clientButoon",children:Object(z.jsx)(d.b,{to:"/blockchain-developer-bootcamp-final-project/client",children:"Client"})}),Object(z.jsx)("div",{className:"clientButoon",children:Object(z.jsx)(d.b,{to:"/blockchain-developer-bootcamp-final-project/owner",children:"Owner"})})]})})}var R=function(){var e=Object(j.b)(),t=Object(j.c)((function(e){return e.web3})).connected,n=Object(j.c)((function(e){return e.app.isLoading})),r=function(){var n=Object(h.a)(b.a.mark((function n(){return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t){n.next=8;break}return e(K(!0)),n.prev=2,n.next=5,e(C());case 5:return n.prev=5,e(K(!1)),n.finish(5);case 8:case"end":return n.stop()}}),n,null,[[2,,5,8]])})));return function(){return n.apply(this,arguments)}}();Object(c.useEffect)(r,[]);var a=Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{md:3,children:Object(z.jsx)(x.a,{onClick:r,children:"Connecto to meta mask"})})});return t?a=Object(z.jsx)(J,{}):n&&(a=Object(z.jsx)("div",{children:Object(z.jsx)("h3",{children:"Connecting to metamask..."})})),Object(z.jsx)("div",{className:"AppContainer",children:a})},V=n(11),Y=n(105),_=n(590),X=n(591),Z=n(586),$=function(e){var t=Object(c.useState)(""),n=Object(V.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)("0"),s=Object(V.a)(i,2),u=s[0],o=s[1],l=Object(c.useState)(0),d=Object(V.a)(l,2),j=d[0],p=d[1],b=Object(c.useState)(0),h=Object(V.a)(b,2),O=h[0],y=h[1],f=Object(c.useState)(1),m=Object(V.a)(f,2),g=m[0],w=m[1],T=Object(c.useState)(""),C=Object(V.a)(T,2),k=C[0],S=C[1],P=Object(c.useState)(""),I=Object(V.a)(P,2),L=I[0],B=I[1];return Object(z.jsx)(z.Fragment,{children:Object(z.jsxs)(_.a,{onHide:e.onHide,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:!0,children:[Object(z.jsxs)(_.a.Body,{children:[Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Name"}),Object(z.jsx)(X.a.Control,{type:"text",value:r,onChange:function(e){return a(e.target.value)}})]}),Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Kind"}),Object(z.jsxs)(X.a.Select,{value:r,onChange:function(e){o(e.target.value)},children:[Object(z.jsx)("option",{value:"0",children:"Good"}),Object(z.jsx)("option",{value:"1",children:"Service"})]})]}),Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Price"}),Object(z.jsx)(X.a.Control,{type:"number",value:j,onChange:function(e){return p(e.target.value)}})]}),Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"USD Price"}),Object(z.jsx)(X.a.Control,{type:"number",value:O,onChange:function(e){return y(e.target.value)}})]}),Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Quantity"}),Object(z.jsx)(X.a.Control,{type:"number",value:g,onChange:function(e){return w(e.target.value)}})]}),Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"UPC"}),Object(z.jsx)(X.a.Control,{type:"text",value:k,onChange:function(e){return S(e.target.value)}})]}),Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Image URL"}),Object(z.jsx)(X.a.Control,{type:"text",value:L,onChange:function(e){return B(e.target.value)}})]})]}),Object(z.jsx)("br",{}),Object(z.jsx)(x.a,{onClick:function(){return e.onProductCreated({kind:u,name:r,imageUrl:L,upc:k,price:v.a.utils.toWei(j),usdPrice:O,quantity:g})},children:"Add"})]})})},ee=function(){var e=Object(j.b)(),t=Object(c.useState)(""),n=Object(V.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)("0"),s=Object(V.a)(i,2),u=s[0],o=s[1],l=Object(c.useState)(!1),d=Object(V.a)(l,2),p=d[0],f=d[1],m=Object(c.useState)([]),g=Object(V.a)(m,2),w=g[0],T=g[1],C=Object(j.c)((function(e){return e.app.isLoading})),k=function(){var t=Object(h.a)(b.a.mark((function t(){var n,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(K(!0)),t.next=3,e(S({discounts:v.a.utils.toWei(u),client:r,products:w}));case 3:n=t.sent,!0===(c=n.payload)?(e(W({message:"Transaction completed successfuly.",title:"Success"})),a(""),o("0"),T([])):e(W({message:"Trasanction failed. Error: ".concat(c.message),title:"Error",type:"danger"})),e(K(!1));case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),P=function(){return f(!1)},I=null;p&&(I=Object(z.jsx)($,{onHide:P,onProductCreated:function(e){T([].concat(Object(Y.a)(w),[e])),P()}}));var L=null;if(w.length>0){for(var B=[],M=function(e){var t=w[e],n=Object(z.jsxs)("tr",{children:[Object(z.jsx)("td",{children:e+1}),Object(z.jsx)("td",{children:t.name}),Object(z.jsx)("td",{children:t.price}),Object(z.jsx)("td",{children:t.quantity}),Object(z.jsx)("td",{children:t.usdPrice}),Object(z.jsx)("td",{children:0==t.kind?"Good":"Service"}),Object(z.jsx)("td",{className:"deleteProduct",onClick:function(){return function(e){w.splice(e,1),T(Object(Y.a)(w))}(e)},children:"x"})]});B.push(n)},F=0;F<w.length;F++)M(F);L=Object(z.jsx)("tbody",{children:B})}return Object(z.jsx)(z.Fragment,{children:Object(z.jsx)(O.a,{children:Object(z.jsxs)(y.a,{md:6,children:[Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Client address"}),Object(z.jsx)(X.a.Control,{value:r,type:"text",placeholder:"Entenr your client wallet address",onChange:function(e){return a(e.target.value)}})]}),Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Discounts"}),Object(z.jsx)(X.a.Control,{value:u,type:"number",placeholder:"Entenr any discounts or 0",onChange:function(e){return o(e.target.value)}})]}),Object(z.jsx)("br",{}),Object(z.jsxs)(Z.a,{children:[Object(z.jsx)("thead",{children:Object(z.jsxs)("tr",{children:[Object(z.jsx)("th",{children:"#"}),Object(z.jsx)("th",{children:"Name"}),Object(z.jsx)("th",{children:"Price ether"}),Object(z.jsx)("th",{children:"Quantity"}),Object(z.jsx)("th",{children:"Price USD"}),Object(z.jsx)("th",{children:"Kind"}),Object(z.jsx)("th",{onClick:function(){return f(!0)},children:"+"})]})}),L]}),I,Object(z.jsx)("br",{}),Object(z.jsx)(x.a,{disabled:C,onClick:k,children:"Enviar"})]})})})},te=n(592),ne=n(594),ce=n(587),re=function(e){var t=Object(c.useState)([]),n=Object(V.a)(t,2),r=n[0],a=n[1],i=Object(j.b)(),s=Object(j.c)((function(e){return e.app.isLoading})),u=function(){var t=Object(h.a)(b.a.mark((function t(){var n,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i(K(!0)),t.next=3,i(F(e.invoice.id));case 3:c=t.sent,a(null!==(n=c.payload)&&void 0!==n?n:[]),i(K(!1));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),o=function(){var t=Object(h.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i(K(!0)),t.next=3,i(N(e.invoice.id));case 3:n=t.sent,i(K(!1)),e.onHide(n.payload);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),l=Object(z.jsx)(x.a,{disabled:s,onClick:0==r.length?u:function(){return a([])},children:0==r.length?"Load products":"Hide products"}),d=null;r.length>0&&(d=Object(z.jsxs)(Z.a,{children:[Object(z.jsx)("thead",{children:Object(z.jsxs)("tr",{children:[Object(z.jsx)("td",{children:"Image"}),Object(z.jsx)("td",{children:"Name"}),Object(z.jsx)("td",{children:"Price"}),Object(z.jsx)("td",{children:"Quantity"})]})}),Object(z.jsx)("tbody",{children:r.map((function(e){return Object(z.jsxs)("tr",{children:[Object(z.jsx)("td",{children:e.imageUrl}),Object(z.jsx)("td",{children:e.name}),Object(z.jsx)("td",{children:e.price}),Object(z.jsx)("td",{children:e.quantity})]})}))})]}));var p=void 0===e.showPayButton||e.showPayButton;return Object(z.jsx)(z.Fragment,{children:Object(z.jsx)(_.a,{onHide:e.onHide,size:"lg",centered:!0,show:!0,children:Object(z.jsxs)(_.a.Body,{children:[Object(z.jsx)(O.a,{children:Object(z.jsxs)(y.a,{children:[Object(z.jsx)("div",{children:Object(z.jsxs)("span",{children:["Number #: ",e.invoice.id]})}),Object(z.jsx)("div",{children:Object(z.jsxs)("span",{children:["Creator: ",e.invoice.owner]})}),Object(z.jsx)("div",{children:Object(z.jsxs)("span",{children:["Merchant: ",e.invoice.beneficiary]})}),Object(z.jsx)("div",{children:Object(z.jsxs)("span",{children:["Custumer: ",e.invoice.buyer]})}),Object(z.jsx)("div",{children:Object(z.jsxs)("span",{children:["Subtotal: ",v.a.utils.fromWei(e.invoice.subtotal)," Eth"]})}),Object(z.jsx)("div",{children:Object(z.jsxs)("span",{children:["Discounts: ",v.a.utils.fromWei(e.invoice.discounts)," Eth"]})}),Object(z.jsx)("div",{children:Object(z.jsxs)("span",{children:["Total: ",v.a.utils.fromWei(e.invoice.total)," Eth"]})})]})}),Object(z.jsx)("br",{}),Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{children:d})}),Object(z.jsxs)(O.a,{children:[Object(z.jsx)(y.a,{children:l}),Object(z.jsx)(y.a,{children:p&&Object(z.jsx)(x.a,{disabled:s,onClick:o,children:"Pay invoice"})})]})]})})})},ae=(n(575),function(){var e=Object(j.b)(),t=Object(c.useState)([]),n=Object(V.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)(null),s=Object(V.a)(i,2),u=s[0],o=s[1];Object(c.useEffect)(Object(h.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e(I());case 3:(n=t.sent).payload&&a(n.payload),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))));var l=null;if(null!=u){l=Object(z.jsx)(re,{onHide:function(){return o(null)},invoice:u,showPayButton:!1})}var d=Object(z.jsx)(ce.a,{variant:"warning",children:Object(z.jsx)("h3",{children:"You don't have invoices yet"})});return r.length>0&&(d=Object(z.jsxs)(Z.a,{striped:!0,bordered:!0,hover:!0,children:[Object(z.jsx)("thead",{children:Object(z.jsxs)("tr",{children:[Object(z.jsx)("th",{children:"ID#"}),Object(z.jsx)("th",{children:"Beneficiary"}),Object(z.jsx)("th",{children:"Client"}),Object(z.jsx)("th",{children:"Total"}),Object(z.jsx)("th",{children:"Status"}),Object(z.jsx)("th",{})]})}),Object(z.jsx)("tbody",{children:r.map((function(e){return Object(z.jsxs)("tr",{children:[Object(z.jsx)("td",{children:e.id}),Object(z.jsx)("td",{children:e.beneficiary}),Object(z.jsx)("td",{children:e.buyer}),Object(z.jsx)("td",{children:v.a.utils.fromWei(e.total)}),Object(z.jsx)("td",{children:1==e.status?"Paid":"Pending"}),Object(z.jsx)("td",{children:Object(z.jsx)("a",{onClick:function(){return o(e)},children:"Ver"})})]})}))})]})),Object(z.jsxs)("div",{className:"InvoiceList",children:[d,l]})}),ie=function(){var e=Object(c.useState)(null),t=Object(V.a)(e,2),n=t[0],r=t[1],a=Object(j.b)(),i=Object(j.c)((function(e){return e.app.isLoading})),s=function(){var e=Object(h.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a(L());case 2:t=e.sent,r(v.a.utils.fromWei(t.payload||"0"));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){s()}));var u=null;if(null!==n){var o=function(){var e=Object(h.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a(K(!0)),e.next=3,a(E());case 3:e.sent.payload?a(W({message:"Trasanction successful.",title:"Success"})):a(W({message:"Trasanction failed.",title:"Error",type:"danger"})),a(K(!1));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),l=Object(z.jsx)(x.a,{disabled:i,onClick:o,children:"Withdraw"});u=Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{children:Object(z.jsxs)("h1",{children:["Current balance: ",n," ",n>0&&l," "]})})})}return Object(z.jsxs)(te.a,{defaultActiveKey:"invoices",children:[Object(z.jsxs)(ne.a,{eventKey:"invoices",title:"My Invoices",children:[u,Object(z.jsx)("h1",{children:"List of invoices"}),Object(z.jsx)("hr",{}),Object(z.jsx)(ae,{})]}),Object(z.jsx)(ne.a,{eventKey:"invoice-form",title:"Create new invoice",children:Object(z.jsx)(ee,{})})]})},se=n(2),ue=function(){var e=Object(j.b)(),t=Object(c.useState)(0),n=Object(V.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)(null),s=Object(V.a)(i,2),u=s[0],o=s[1],l=Object(j.c)((function(e){return e.app.isLoading}));Object(c.useEffect)((function(){e(k())}),[]);var d=function(){var t=Object(h.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(K(!0)),t.next=3,e(P(r));case 3:n=t.sent,o(n.payload),e(K(!1));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),p=null;if(null!=u){var f={invoice:u,onHide:function(t){o(null),t?e(W({message:"Trasanction successful.",title:"Success"})):!1===t&&e(W({message:"Trasanction failed.",title:"Error",type:"danger"}))}};p=Object(z.jsx)(re,Object(se.a)({},f))}return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{md:4,children:Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Invoice #"}),Object(z.jsx)(X.a.Control,{type:"text",value:r,onChange:function(e){return a(e.target.value)}})]})})}),Object(z.jsx)("br",{}),Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{md:4,children:Object(z.jsx)(x.a,{disabled:l,onClick:d,children:"Load"})})}),Object(z.jsx)("br",{}),p]})},oe=function(){var e=Object(j.b)(),t=Object(c.useState)(0),n=Object(V.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)(0),s=Object(V.a)(i,2),u=s[0],o=s[1],l=Object(j.c)((function(e){return e.app.isLoading})),d=function(){var t=Object(h.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(B());case 2:n=t.sent,o(n.payload);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(c.useEffect)(d);var p=function(){var t=Object(h.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(K(!0)),t.next=3,e(M(r));case 3:t.sent.payload?(d(),e(W({message:"Trasanction successful.",title:"Success"}))):e(W({message:"Trasanction failed. Only onwer can set contract fee",title:"Error",type:"danger"})),e(K(!1));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{children:Object(z.jsxs)("h3",{children:["Current Contract fee: ",u," Basis points"]})})}),Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{children:Object(z.jsxs)(X.a.Group,{children:[Object(z.jsx)(X.a.Label,{children:"Contract Fee"}),Object(z.jsx)(X.a.Control,{type:"text",value:r,onChange:function(e){return a(e.target.value)}})]})})}),Object(z.jsx)("br",{}),Object(z.jsx)(O.a,{children:Object(z.jsx)(y.a,{children:Object(z.jsx)(x.a,{disabled:l,onClick:p,children:"Send"})})})]})};function le(e){var t=e.children,n=e.path,c=Object(j.c)((function(e){return e.web3})).connected;return Object(z.jsx)(l.b,{path:n,render:function(){return!0===c?t:Object(z.jsx)(l.a,{to:{path:"/"}})}})}var de=function(){var e,t,n=Object(j.c)((function(e){return e.app})).notification,c=Object(j.b)();return Object(z.jsx)(s.a,{position:"top-end",children:Object(z.jsxs)(u.a,{onClose:function(){return c(D())},show:n.show,animation:!1,bg:n.type,children:[Object(z.jsxs)(u.a.Header,{children:[Object(z.jsx)("img",{src:"holder.js/20x20?text=%20",className:"rounded me-2",alt:""}),Object(z.jsx)("strong",{className:"me-auto",children:n.title})]}),Object(z.jsx)(u.a.Body,{children:(e=n.message,t=200,e.length>t?e.substring(0,t)+"...":e)})]})})};var je=function(){return Object(z.jsxs)(o.a,{children:[Object(z.jsx)(d.a,{children:Object(z.jsxs)(l.d,{children:[Object(z.jsx)(l.b,{exact:!0,path:"/blockchain-developer-bootcamp-final-project/",children:Object(z.jsx)(R,{})}),Object(z.jsx)(le,{exact:!0,path:"/blockchain-developer-bootcamp-final-project/merchant",children:Object(z.jsx)(ie,{})}),Object(z.jsx)(le,{exact:!0,path:"/blockchain-developer-bootcamp-final-project/client",children:Object(z.jsx)(ue,{})}),Object(z.jsx)(le,{exact:!0,path:"/blockchain-developer-bootcamp-final-project/owner",children:Object(z.jsx)(oe,{})})]})}),Object(z.jsx)(de,{})]})},pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,595)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))},be=Object(f.a)({reducer:{web3:H,app:Q}});i.a.render(Object(z.jsx)(r.a.StrictMode,{children:Object(z.jsx)(j.a,{store:be,children:Object(z.jsx)(je,{})})}),document.getElementById("root")),pe()}},[[578,1,2]]]);
//# sourceMappingURL=main.7a5a0424.chunk.js.map