export const documentOffset = (documentContainer, node) => {
  if (!documentContainer || !node) throw new Error('Both documentContainer and node are required');
  if (typeof node.getBoundingClientRect !== 'function') throw new Error('Wrong arguments order');

  const { top, left } = node.getBoundingClientRect();

  // can't use scrollX and scrollY because IE
  const { pageXOffset = 0, pageYOffset = 0 } = documentContainer;

  return {
    left: Math.round(left + pageXOffset),
    top: Math.round(top + pageYOffset),
  };
};

export const size = (node) => ({
  width: node.offsetWidth,
  height: node.offsetHeight,
});

export const scroll = (node) => {
  const getTop = () => node.pageYOffset || node.scrollTop || 0;
  const getLeft = () => node.pageXOffset || node.scrollLeft || 0;

  const toTop = (top = 0, behavior = 'instant') => {
    node.scroll({ top, behavior, left: 0 });
  };

  const toLeft = (left = 0, behavior = 'instant') => {
    node.scroll({ left, behavior, top: 0 });
  };

  return {
    getTop,
    getLeft,
    toTop,
    toLeft,
  };
};

export const screenSize = (node) => ({
  width: node.document.documentElement.clientWidth,
  height: node.document.documentElement.clientHeight,
});

export const onFrameRequest = (node, func) => {
  let isActive = false;

  return (...args) => {
    if (isActive) return;

    isActive = true;
    node.requestAnimationFrame(() => {
      func(...args);
      isActive = false;
    });
  };
};
