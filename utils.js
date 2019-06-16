exports.bindTo = (context, ...props) => props.forEach((prop) => {
  const newContext = context;
  if (newContext[prop]) newContext[prop] = newContext[prop].bind(newContext);
});

exports.invoke = (func, ...args) => { if (func) func(...args); };
