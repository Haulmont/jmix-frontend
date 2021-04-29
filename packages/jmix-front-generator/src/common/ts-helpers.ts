import ts from "typescript";

export function renderTSNodes(nodes: ts.Node[], separator: string = '\n'): string {
  const resultFile = ts.createSourceFile(
    'temp.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  );
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });
  // todo VM
  let content = '';
  nodes.forEach(node => {
    content += printer.printNode(
      ts.EmitHint.Unspecified,
      node,
      resultFile,
    ) + separator;
  });

  return content;
}