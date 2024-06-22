export default Header;
type Header = SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string | undefined;
} & Record<string, any>;
declare const Header: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, Record<string, any>, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports;
    z_$$bindings?: Bindings;
}