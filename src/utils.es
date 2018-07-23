export const bindTo = (context, ...props) => props.forEach((prop) => {
  if (context[prop]) context[prop] = context[prop].bind(context);
});

export const invoke = (func, ...args) => { if (func) func(...args); };
