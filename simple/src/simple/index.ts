import { apply, mergeWith, move, Rule, SchematicContext, SchematicsException, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { parsename } from '@schematics/angular/utility/parse-name';

export interface Schema {
  name: string;
  project?: string;
}
// You don't have to export the function as default. You can also have more than one rule factory
// per files.
export function simple(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const workspaceConfigBuffer = tree.read("angular.json");
        if (!workspaceConfigBuffer) {
            throw new SchematicsException("No an Angular CLI Workspace");
        }
        const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
        const projectName = _options.project || workspaceConfig.defaultProject;
        const project = workspaceConfig.projects[projectName];

        const defaulProjectPath = buildDefaultPath(project);

        const parsepath = parsename(defaulProjectPath, _options.name);

        const { name, path } = parsepath;

        const sourceTemplates = url('./files');
        const sourceParamterizedTemplate = apply(sourceTemplates, [

            template({
                ..._options,
                ...strings,
                name
            }),
            move(path)
        ]);
function addPrefix(value: string): string {
    return 'Mr/s' + value;
}



      //  const {name} = _options;
      //  tree.delete('hello.js');
      //  tree.create('hello.js', `console.log('Hallo ${name}');`);

        return mergeWith(sourceParamterizedTemplate)(tree, _context);
    };
}
