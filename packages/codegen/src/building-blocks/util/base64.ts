export function parseBase64Object(base64EncodedObject: string) {
  return JSON.parse(
    Buffer.from(base64EncodedObject, 'base64')
      .toString('utf8')
  );
}