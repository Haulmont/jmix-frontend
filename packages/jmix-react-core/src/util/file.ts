/**
 * Extracts file name from FileRef string
 *
 * @param fileRef
 */
export function extractName(fileRef: string): string {
  return decodeURIComponent(
    fileRef.split('?name=')[1]
  );
}