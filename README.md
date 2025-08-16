# Virtual DOM Example

## Overview

This project demonstrates a lightweight implementation of a Virtual DOM system, similar to what modern JavaScript frameworks like React use under the hood. It shows how to efficiently update the DOM by only applying the necessary changes when the application state changes.

> [!NOTE]  
> This implementation is not perfect and can raise bugs with edge cases.

## What is a Virtual DOM?

The Virtual DOM is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM. This process is called "reconciliation" and offers several benefits:

1. **Performance**: Minimizes expensive DOM operations by batching changes
2. **Simplicity**: Makes UI updates more predictable and easier to reason about
3. **Abstraction**: Provides a clean programming model for dynamic UIs

## How This Implementation Works

This project implements a simple Virtual DOM system with four main components:

### 1. createElement

Creates JavaScript objects (Virtual DOM nodes) that represent DOM elements:

```javascript
const vNode = createElement("div", {
  attrs: { class: "container" },
  children: ["Hello world"],
});
```

### 2. render

Converts Virtual DOM nodes into actual DOM elements:

```javascript
const $node = render(vNode); // Returns a real DOM element
```

### 3. mount

Attaches rendered DOM elements to the page:

```javascript
const $rootEl = mount($node, document.getElementById("root"));
```

### 4. diff

Compares two Virtual DOM trees and generates a minimal set of operations to transform one tree into another:

```javascript
const patch = diff(oldVNode, newVNode);
$rootEl = patch($rootEl); // Applies the changes to the real DOM
```

## Demo

The example application demonstrates these concepts by:

1. Creating a counter that increments every second
2. Adding a new image to the page for each count increment
3. Efficiently updating only the parts of the DOM that need to change

## Running the Project

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open your browser to the URL shown in the terminal (typically http://localhost:1234).

## Learning Value

This project helps developers understand:

- How modern JavaScript frameworks optimize DOM updates
- The core principles behind Virtual DOM reconciliation
- How to implement efficient UI updates without a framework

By studying this code, you can gain insights into the inner workings of libraries like React, Vue, and others that use Virtual DOM techniques for performance optimization.

## Contact

- **Author:** Aryan Shah
- **Email:** [aryan.shah@l145.be](mailto:aryan.shah@l145.be)
- **GitHub:** [l145dev](https://github.com/l145dev/)
- **LinkedIn:** [Aryan Shah](https://www.linkedin.com/in/aryan-shah-l145/)

## Acknowledgements

This project was built using a [tutorial](https://www.youtube.com/watch?v=85gJMUEcnkc) by Jason Yu.
