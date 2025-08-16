import createElement from "./vdom/createElement";
import render from "./vdom/render";
import mount from "./vdom/mount";
import diff from "./vdom/diff";

// all variables prepender with '$' represent DOM elements

const createVApp = (count) =>
  createElement("div", {
    attrs: {
      class: "container",
      id: "app",
      dataCount: count,
    },
    children: [
      String(count),
      createElement("input", {
        attrs: {
          type: "text",
          id: "input",
        },
      }),
      ...Array.from({ length: count }, () => {
        return createElement("img", {
          attrs: {
            src: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "image",
            width: "200",
            height: "200",
          },
        });
      }),
    ],
  });

let count = 0;

let vApp = createVApp(count);

const $app = render(vApp);

let $rootEl = mount($app, document.getElementById("root"));

setInterval(() => {
  count++;

  const vNewApp = createVApp(count);
  const patch = diff(vApp, vNewApp);
  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 1000);
