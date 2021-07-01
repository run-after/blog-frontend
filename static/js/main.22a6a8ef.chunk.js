(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,function(t,e,o){},function(t,e,o){},function(t,e,o){},function(t,e,o){},,function(t,e,o){},function(t,e,o){},function(t,e,o){},function(t,e,o){},function(t,e,o){},function(t,e,o){"use strict";o.r(e);var n=o(1),a=o.n(n),c=o(4),s=o.n(c),i=(o(9),o(10),o(2)),r=(o(11),o(12),o(0));var l=function(t){return Object(r.jsxs)("header",{className:"header",children:[Object(r.jsx)("h1",{className:"header-title",children:"Welcome to the blog"}),t.loggedIn&&Object(r.jsx)("button",{onClick:t.displayPostModal,className:"header-btn",children:"Create Post"})||Object(r.jsx)("button",{onClick:t.displayLoginModal,className:"header-btn",children:"Login"}),t.loggedIn&&Object(r.jsx)("button",{className:"header-btn",onClick:t.logOut,children:"Log out"})]})};o(14);var d=function(t){var e=Object(n.useState)(null),o=Object(i.a)(e,2),a=o[0],c=o[1];return Object(r.jsxs)("div",{className:"login-modal",children:[Object(r.jsx)("button",{onClick:t.displayLoginModal,className:"close-btn",children:"\xd7"}),a&&Object(r.jsx)("p",{children:a}),Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("".concat("https://arctic-eh-68834.herokuapp.com","/login"),{method:"POST",body:JSON.stringify({username:e.target.username.value,password:e.target.password.value}),headers:{"Content-Type":"application/json"}}).then((function(e){e.json().then((function(e){e.message?c(e.message):(t.setDisplayLogin(!1),localStorage.setItem("userID",e.user._id),localStorage.setItem("token",e.token),t.setLoggedIn(!0))}))}))},children:[Object(r.jsx)("input",{id:"username",name:"username",type:"text",placeholder:"username"}),Object(r.jsx)("input",{id:"password",name:"password",type:"password",placeholder:"password"}),Object(r.jsx)("button",{type:"submit",children:"Submit"})]})]})},u=(o(15),o(16),"https://arctic-eh-68834.herokuapp.com");var m=function(t){var e=Object(n.useState)(null),o=Object(i.a)(e,2),a=o[0],c=o[1];return Object(r.jsxs)("div",{className:"post-form",children:[Object(r.jsx)("button",{onClick:t.displayPostModal,className:"close-btn",children:"\xd7"}),a&&a.map((function(t){return Object(r.jsx)("p",{children:t.msg},t.msg)})),Object(r.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),t.post){var o=t.post;o.title=e.target.title.value,o.body=e.target.body.value,o.published=e.target.published.checked,fetch("".concat(u,"/posts/").concat(t.post._id),{method:"PUT",body:JSON.stringify({title:e.target.title.value,body:e.target.body.value,published:e.target.published.checked}),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){e.json().then((function(e){e.message?c(e.message.errors):(t.displayPostModal(),t.setPost({data:o}))}))}))}else fetch("".concat(u,"/posts"),{method:"POST",body:JSON.stringify({title:e.target.title.value,body:e.target.body.value,published:e.target.published.checked}),headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){e.json().then((function(e){e.message?c(e.message.errors):(t.addPost(e),t.displayPostModal())}))}))},children:[Object(r.jsx)("input",{type:"text",id:"title",name:"title",required:!0,placeholder:"title",defaultValue:t.post?t.post.title:""}),Object(r.jsx)("textarea",{id:"body",name:"body",required:!0,placeholder:"body",defaultValue:t.post?t.post.body:""}),Object(r.jsxs)("div",{className:"published",children:[Object(r.jsx)("label",{htmlFor:"published",children:"Publish?"}),Object(r.jsx)("input",{type:"checkbox",name:"published",defaultChecked:!!t.post&&t.post.published})]}),Object(r.jsx)("button",{children:"Create Post"})]})]})},h=(o(17),function(t){var e=new Date(t);return"".concat(e.toLocaleDateString("en-US")," at ").concat(e.toLocaleTimeString("en-US"))});var b=function(t){return Object(r.jsxs)("div",{className:"comment",children:[Object(r.jsxs)("div",{className:"comment-header",children:[Object(r.jsx)("p",{className:"comment-time",children:h(t.comment.createdAt)}),Object(r.jsxs)("h6",{className:"comment-author",children:[t.comment.author," writes:"]})]}),Object(r.jsx)("p",{className:"comment-body",children:t.comment.body}),t.loggedIn&&Object(r.jsx)("button",{className:"comment-btn",onClick:function(){!function(e){var o=prompt("CONFIRM - Do you want to delete? Type yes to confirm");o&&"yes"===o.toLowerCase()&&fetch("".concat("https://arctic-eh-68834.herokuapp.com","/posts/").concat(t.comment.post,"/comments/").concat(e),{method:"DELETE",headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(){t.removeComment(e)}))}(t.comment._id)},children:"Delete Comment"})]})};o(18);var p=function(t){var e=Object(n.useState)(null),o=Object(i.a)(e,2),a=o[0],c=o[1],s=Object(n.useState)(""),l=Object(i.a)(s,2),d=l[0],u=l[1],m=Object(n.useState)(""),h=Object(i.a)(m,2),b=h[0],p=h[1];return Object(r.jsxs)("form",{className:"comment-form",onSubmit:function(e){e.preventDefault(),fetch("".concat("https://arctic-eh-68834.herokuapp.com","/posts/").concat(t.post._id,"/comments"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},body:JSON.stringify({body:e.target.body.value,author:e.target.author.value})}).then((function(e){e.json().then((function(e){if(e.errors)c(e.errors);else{var o=t.comments.data;o.push(e),u(""),p(""),c(null),t.setComments({data:o})}}))}))},children:[Object(r.jsx)("h3",{className:"comment-form-title",children:"Write a comment..."}),a&&a.map((function(t){return Object(r.jsx)("p",{children:t.msg},t.msg)})),Object(r.jsx)("input",{id:"author",name:"author",placeholder:"Your name",value:d,onChange:function(t){u(t.target.value)},required:!0}),Object(r.jsx)("textarea",{id:"body",name:"body",placeholder:"Comment",value:b,onChange:function(t){p(t.target.value)},required:!0}),Object(r.jsx)("button",{children:"Submit"})]})},j="https://arctic-eh-68834.herokuapp.com",f=function(t){var e=new Date(t);return"".concat(e.toLocaleDateString("en-US")," at ").concat(e.toLocaleTimeString("en-US"))};var O=function(t){var e=Object(n.useState)({data:t.post}),o=Object(i.a)(e,2),a=o[0],c=o[1],s=Object(n.useState)(!1),l=Object(i.a)(s,2),d=l[0],u=l[1],h=Object(n.useState)(null),O=Object(i.a)(h,2),g=O[0],y=O[1],x=Object(n.useState)(!1),v=Object(i.a)(x,2),S=v[0],N=v[1],k=function(t){var e=g.data.filter((function(e){return e._id!==t}));y({data:e})};return Object(n.useEffect)((function(){fetch("".concat(j,"/posts/").concat(t.post._id,"/comments")).then((function(t){t.json().then((function(t){y({data:t})}))}))}),[t.post._id]),Object(r.jsxs)("div",{className:"post",children:[d&&Object(r.jsx)(m,{displayPostModal:function(){u(!d)},post:a.data,setPost:c}),Object(r.jsxs)("div",{className:"post-header",children:[Object(r.jsx)("h3",{className:"post-title",children:a.data.title}),Object(r.jsxs)("p",{className:"post-timestamp",children:["Posted on: ",f(a.data.createdAt)]}),Object(r.jsxs)("p",{className:"post-author",children:["By: ",a.data.author]})]}),Object(r.jsx)("p",{className:"post-body",children:a.data.body}),Object(r.jsxs)("div",{className:"post-btns",children:[t.loggedIn&&Object(r.jsx)("button",{onClick:function(){return u(!0)},className:"post-btn",children:"Edit post"}),t.loggedIn&&Object(r.jsx)("button",{onClick:function(){return function(e){var o=prompt("CONFIRM - Do you want to delete? Type yes to confirm");o&&"yes"===o.toLowerCase()&&fetch("".concat(j,"/posts/").concat(e),{method:"DELETE",headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(){t.removePost(e)}))}(a.data._id)},className:"post-btn",children:"Delete post"}),t.loggedIn&&Object(r.jsx)("button",{onClick:function(){return function(t){fetch("".concat(j,"/posts/").concat(t._id),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))},body:JSON.stringify({title:t.title,body:t.body,published:!t.published})}).then((function(e){t.published=!t.published,c({data:t})}))}(a.data)},className:"post-btn",children:a.data.published?"Unpublish post":"Publish post"}),Object(r.jsx)("button",{className:"post-btn comment-display-btn",onClick:function(){N(!S)},children:S?"Hide Comments":"Show Comments"})]}),S&&Object(r.jsxs)("div",{className:"comments",children:[g&&g.data.map((function(e){return Object(r.jsx)(b,{comment:e,loggedIn:t.loggedIn,removeComment:k},e._id)})),Object(r.jsx)(p,{comments:g,setComments:y,post:a.data})]})]})};var g=function(){var t=Object(n.useState)(null),e=Object(i.a)(t,2),o=e[0],a=e[1],c=Object(n.useState)(!1),s=Object(i.a)(c,2),u=s[0],h=s[1],b=Object(n.useState)(!1),p=Object(i.a)(b,2),j=p[0],f=p[1],g=Object(n.useState)(!1),y=Object(i.a)(g,2),x=y[0],v=y[1],S=function(){f(!j)},N=function(){v(!x)},k=function(t){var e=o.data.filter((function(e){return e._id!==t}));a({data:e})};return Object(n.useEffect)((function(){fetch("".concat("https://arctic-eh-68834.herokuapp.com","/posts")).then((function(t){t.json().then((function(t){a({data:t})}))}));var t=localStorage.getItem("userID");h(!!t)}),[]),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)(l,{displayLoginModal:S,displayPostModal:N,loggedIn:u,logOut:function(){localStorage.removeItem("userID"),localStorage.removeItem("token"),h(!1)}}),o&&o.data.map((function(t){if(t.published||u)return Object(r.jsx)(O,{post:t,loggedIn:u,removePost:k,setPosts:a,displayPostModal:N,displayPostForm:x},t._id)})),j&&Object(r.jsx)(d,{displayLoginModal:S,loggedIn:u,setLoggedIn:h,setDisplayLogin:f}),x&&Object(r.jsx)(m,{displayPostModal:N,addPost:function(t){t.author=t.author.username;var e=o.data;e.push(t),a({data:e})}})]})};s.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(g,{})}),document.getElementById("root"))}],[[19,1,2]]]);
//# sourceMappingURL=main.22a6a8ef.chunk.js.map