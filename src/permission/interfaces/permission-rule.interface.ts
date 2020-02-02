export  interface IPermissionRule {
  readonly id: string;
  readonly entityID: string;
  readonly roleName: string;
  permission: string;
}
