import { SchemaDirectiveVisitor } from 'graphql-tools';

export class RestDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { url } = this.args;
    field.resolve = () => fetch(url);
  }
}
