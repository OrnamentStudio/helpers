const STYLES_PREFIXES = {
  transform: ['Webkit', 'Moz', 'ms', 'O'],
  transitionDuration: ['Webkit', 'Moz', 'ms', 'O'],
};

const capitalizeFirst = (string = '') => string.charAt(0).toUpperCase() + string.slice(1);

exports.getPrefixed = (styles) => {
  const result = { ...styles };

  Object.keys(styles).forEach((key) => {
    if (!STYLES_PREFIXES[key]) return;

    STYLES_PREFIXES[key].forEach((prefix) => {
      // react uses camelCase
      result[`${prefix}${capitalizeFirst(key)}`] = styles[key];
    });
  });

  return result;
};

exports.documentOffset = (documentContainer, node) => {
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

exports.size = (node) => ({
  width: node.offsetWidth,
  height: node.offsetHeight,
});

exports.scroll = (node) => {
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

exports.screenSize = (node) => ({
  width: node.document.documentElement.clientWidth,
  height: node.document.documentElement.clientHeight,
});

exports.onFrameRequest = (node, func) => {
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

exports.offset = (node) => {
  if (!node) {
    return {
      top: 0,
      left: 0,
    };
  }

  const { offsetParent } = node;

  const offsetTop = offsetParent ? offsetParent.offsetTop : 0;
  const offsetLeft = offsetParent ? offsetParent.offsetLeft : 0;

  return {
    top: node.offsetTop + offsetTop,
    left: node.offsetLeft + offsetLeft,
  };
};

exports.position = (node) => ({
  left: node.offsetLeft,
  top: node.offsetTop,
});

exports.eventCoordinates = (event, ...args) => {
  const prop = event.touches ? event.touches[0] : event;
  return args.reduce((acc, name) => {
    acc[name] = prop[name];
    return acc;
  }, {});
};
