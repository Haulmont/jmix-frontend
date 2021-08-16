const styleMock = new Proxy({}, {
  get: (_target, key) => key,
});
export default styleMock;
