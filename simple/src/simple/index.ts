import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export interface Schema {
  name: string;
}
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function simple(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const {name} = _options;
        tree.delete('hello.js');
        tree.create('hello.js', `console.log('Hallo ${name}');`);
        return tree;
    };
}
