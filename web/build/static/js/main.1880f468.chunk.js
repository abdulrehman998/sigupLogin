(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{189:function(e,a,r){},190:function(e,a,r){},316:function(e,a,r){"use strict";r.r(a);var n=r(0),o=r.n(n),i=r(40),l=r.n(i),t=(r(189),r.p,r(190),r(23)),s=(r(191),r(361)),c=r(359),d=r(362),u=r(65),h=r.n(u),m=r(102),b=r(352),j=r(360),p=r(368),g=r(44),v="localhost"===window.location.hostname.split(":")[0]?"http://localhost:5000":"",x=r(1),O=g.a({email:g.b("Enter your email").email("Enter a valid email").required("Email is required"),password:g.b("Enter your password").min(8,"Password should be of minimum 8 characters length").max(10,"No more then 10").required("Password is required")});var f=function(){var e=Object(t.f)(),a=Object(m.a)({validationSchema:O,initialValues:{email:"",password:""},onSubmit:function(a){console.log("values: ",a),h.a.post("".concat(v,"/api/v1/login"),{email:a.email,password:a.password}).then((function(r){if(console.log("res: ",r.data),r.data.email){alert("login successfull");var n=a.email;localStorage.setItem("email",n),e.push("/")}})).catch((function(e){console.log(e)}))}});return Object(x.jsxs)("div",{style:{margin:"2rem"},children:[Object(x.jsx)("h1",{children:"Login page"}),Object(x.jsx)("form",{onSubmit:a.handleSubmit,children:Object(x.jsxs)(b.a,{spacing:2,children:[Object(x.jsx)(j.a,{fullWidth:!0,color:"primary",id:"outlined-basic",label:"Email",variant:"outlined",name:"email",value:a.values.email,onChange:a.handleChange,error:a.touched.email&&Boolean(a.errors.email),helperText:a.touched.email&&a.errors.email}),Object(x.jsx)(j.a,{fullWidth:!0,color:"primary",id:"filled-basic",label:"Password",variant:"outlined",type:"password",name:"password",value:a.values.password,onChange:a.handleChange,error:a.touched.password&&Boolean(a.errors.password),helperText:a.touched.password&&a.errors.password}),Object(x.jsx)(p.a,{fullWidth:!0,variant:"contained",color:"primary",type:"submit",children:"Login"})]})})]})},w=r(364),y=r(365),C=r(369),N=r(366),S=r(356),E=g.a({name:g.b("Enter your name").required("Name is required"),email:g.b("Enter your email").email("Enter a valid email").required("Email is required"),password:g.b("Enter your password").min(8,"Password should be of minimum 8 characters length").max(10,"No more then 10").required("Password is required"),address:g.b("Enter your Address").required("Address is required"),phoneNumber:g.b("Enter your phone number").min(10,"Phone number should be 10 integers long").required("Phone number is required")});var q=function(){var e=Object(t.f)(),a=Object(m.a)({initialValues:{name:"",email:"",phoneNumber:"",password:"",address:""},validationSchema:E,onSubmit:function(a){var r=document.querySelector('input[name="gender"]:checked').value;h.a.post("".concat(v,"/api/v1/signup"),{name:a.name,email:a.email,gender:r,phoneNumber:Number(a.phoneNumber),password:a.password,address:a.address}).then((function(a){alert("SIGNUP SUCCESSFULLY"),e.push("/login")})).catch((function(e){}))}});return Object(x.jsxs)("div",{style:{margin:"2rem"},children:[Object(x.jsx)("h1",{children:"Signup page"}),Object(x.jsx)("form",{onSubmit:a.handleSubmit,children:Object(x.jsxs)(b.a,{spacing:2,children:[Object(x.jsx)(j.a,{fullWidth:!0,color:"primary",id:"outlined-basic",label:"Full Name",variant:"outlined",name:"name",value:a.values.name,onChange:a.handleChange,error:a.touched.name&&Boolean(a.errors.name),helperText:a.touched.name&&a.errors.name}),Object(x.jsx)(j.a,{fullWidth:!0,color:"primary",id:"outlined-basic",label:"Email",variant:"outlined",name:"email",value:a.values.email,onChange:a.handleChange,error:a.touched.email&&Boolean(a.errors.email),helperText:a.touched.email&&a.errors.email}),Object(x.jsx)(j.a,{fullWidth:!0,color:"primary",id:"filled-basic",label:"Password",variant:"outlined",type:"password",name:"password",value:a.values.password,onChange:a.handleChange,error:a.touched.password&&Boolean(a.errors.password),helperText:a.touched.password&&a.errors.password}),Object(x.jsx)(j.a,{fullWidth:!0,color:"primary",id:"filled-basic",label:"Address",variant:"outlined",type:"address",name:"address",value:a.values.address,onChange:a.handleChange,error:a.touched.address&&Boolean(a.errors.address),helperText:a.touched.address&&a.errors.address}),Object(x.jsx)(j.a,{fullWidth:!0,name:"phoneNumber",label:"Phone Number",variant:"outlined",placeholder:"Enter Phone Number",value:a.values.phoneNumber,onChange:a.handleChange,error:a.touched.phoneNumber&&Boolean(a.errors.phoneNumber),helperText:a.touched.phoneNumber&&a.errors.phoneNumber}),Object(x.jsxs)(N.a,{component:"fieldset",children:[Object(x.jsx)(S.a,{component:"legend",style:{textAlign:"left"},children:"Gender"}),Object(x.jsxs)(y.a,{"aria-label":"gender",defaultValue:"male",name:"genderParent",children:[Object(x.jsx)(C.a,{name:"gender",value:"male",control:Object(x.jsx)(w.a,{}),label:"Male"}),Object(x.jsx)(C.a,{name:"gender",value:"female",control:Object(x.jsx)(w.a,{}),label:"Female"})]})]}),Object(x.jsx)(p.a,{fullWidth:!0,variant:"contained",color:"primary",type:"submit",children:"Signup"})]})})]})},P=r(10),B=r(371),T=r(372),W=r(373),L=r(370);B.a;var F=function(){var e=n.useState([]),a=Object(P.a)(e,2),r=a[0],o=a[1];return n.useEffect((function(){var e=localStorage.getItem("email");return console.log(e),h.a.post("".concat(v,"/api/v1/profile"),{email:e}).then((function(e){var a=e.data;o(a),console.log(r)})).catch((function(e){console.log(e.message)})),function(){console.log("clean up")}}),[]),Object(x.jsx)("div",{className:"dashboard",children:Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{children:"Dashboard"}),r.map((function(e){return Object(x.jsx)("div",{style:{margin:"2rem"},children:Object(x.jsx)(T.a,{sx:{minWidth:275},children:Object(x.jsxs)(W.a,{children:[Object(x.jsx)(L.a,{variant:"h4",component:"div",children:e.name}),Object(x.jsx)(L.a,{variant:"h6",component:"div",children:e.email}),Object(x.jsx)(L.a,{variant:"h6",component:"div",children:e.address}),Object(x.jsx)(L.a,{variant:"h6",component:"div",children:e.phoneNumber}),Object(x.jsx)(L.a,{variant:"h6",component:"div",children:e.gender})]})})})}))]})})};var k=function(){var e=Object(t.f)();return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(s.a,{bg:"primary",expand:"lg",children:Object(x.jsxs)(c.a,{children:[Object(x.jsx)(s.a.Brand,{href:"#home",children:"My App"}),Object(x.jsx)(s.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(x.jsx)(s.a.Collapse,{id:"basic-navbar-nav",children:Object(x.jsxs)(d.a,{className:"me-auto",children:[Object(x.jsx)(d.a.Link,{onClick:function(){e.push("/signup")},children:"Signup"}),Object(x.jsx)(d.a.Link,{onClick:function(){e.push("/login")},children:"Login"})]})})]})}),Object(x.jsxs)(t.c,{children:[Object(x.jsx)(t.a,{path:"/login",children:Object(x.jsx)(f,{})}),Object(x.jsx)(t.a,{path:"/signup",children:Object(x.jsx)(q,{})}),Object(x.jsx)(t.a,{exact:!0,path:"/",children:Object(x.jsx)(F,{})})]})]})},A=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,375)).then((function(a){var r=a.getCLS,n=a.getFID,o=a.getFCP,i=a.getLCP,l=a.getTTFB;r(e),n(e),o(e),i(e),l(e)}))},I=r(77);l.a.render(Object(x.jsx)(o.a.StrictMode,{children:Object(x.jsx)(I.a,{children:Object(x.jsx)(k,{})})}),document.getElementById("root")),A()}},[[316,1,2]]]);
//# sourceMappingURL=main.1880f468.chunk.js.map