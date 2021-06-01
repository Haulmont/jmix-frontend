/**
 * An Ant Design `<Form>` validation rule that always passes.
 */
export const passthroughRule = {
  validator: () => Promise.resolve()
};