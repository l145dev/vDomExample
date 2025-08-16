import render from "./render";

// helper function that combines both arrays into one array, but only up to the length of the shortest array
const zip = (x = [], y = []) => {
  const zipped = [];

  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    zipped.push([x[i], y[i]]);
  }

  return zipped;
};

const diffAttrs = (oldVAttrs, newVAttrs) => {
  const vAttrspatches = [];

  // set new attributes
  for (const [k, v] of Object.entries(newVAttrs)) {
    vAttrspatches.push(($node) => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // remove old attributes
  for (const k of Object.keys(oldVAttrs)) {
    if (!(k in newVAttrs)) {
      vAttrspatches.push(($node) => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node) => {
    for (const vAttrsPatch of vAttrspatches) {
      vAttrsPatch($node);
    }
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  oldVChildren = oldVChildren || [];
  newVChildren = newVChildren || [];

  const vChildPatches = [];

  // zip works the same way as it would in python for example p.s. see function definition
  for (const [oldVChild, newVChild] of zip(oldVChildren, newVChildren)) {
    vChildPatches.push(diff(oldVChild, newVChild));
  }

  // additional patches are vChildren that were not included due to the zip's length
  const additionalVChildPatches = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalVChildPatches.push(($node) => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

  return ($parent) => {
    for (const [vChildPatch, vChild] of zip(
      vChildPatches,
      $parent.childNodes
    )) {
      vChildPatch(vChild);
    }

    for (const vAdditionalChildPatch of additionalVChildPatches) {
      vAdditionalChildPatch($parent);
    }

    return $parent;
  };
};

const diff = (vOldNode, vNewNode) => {
  if (vNewNode === undefined) {
    return ($node) => {
      $node.remove();
      return undefined;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      return ($node) => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return ($node) => undefined;
    }
  }

  if (vOldNode.tagName !== vNewNode.tagName) {
    return ($node) => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

export default diff;
