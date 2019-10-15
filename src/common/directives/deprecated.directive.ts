import { SchemaDirectiveVisitor } from 'graphql-tools';

export class DeprecatedDirective extends SchemaDirectiveVisitor {
  visitObject(object) {
    this._deprecate(object);
  }

  visitFieldDefinition(field) {
    this._deprecate(field);
  }

  visitEnumValue(value) {
    this._deprecate(value);
  }

  _deprecate(thing) {
    // Add some metadata to the object that the GraphQL server
    // can use later to display deprecation warnings.
    thing.isDeprecated = true;
    thing.deprecationReason = this.args.reason;
  }
}
