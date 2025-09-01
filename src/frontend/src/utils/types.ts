export type InjectedProp<K extends string, T> = {
  [P in K]?: never;
} & {
  __injected?: { [P in K]: T };
}
