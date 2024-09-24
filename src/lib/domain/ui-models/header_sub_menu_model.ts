import type { Optional } from "../common/optional_helpers.js";
import { relativeUrls } from "../routing.js";
import type { UserModel } from "../user-model.js";
import { signOut } from '@auth/sveltekit/client';

export type MenuItem = {
  text: string;
  action?: (() => void);
  href?: string;
  icon?: string;
}

export type MenuSection = {
   title?: Optional<string>;
   items: MenuItem[];
}

export const accountMenuBuilder: (user: UserModel) => [MenuSection] = (user) => {
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", action: () => { }, icon: "person" },
                { text: "Suscripción", href: relativeUrls.subscriptions.list, icon: "credit_card" }
            ]   
        }
    ];
    if(user.roles.includes("admin")) {
        sections.push({
            title: "Administración",
            items: [
                { text: "Usuarios", action: () => { }, icon: "dashboard" },
            ]
        });
    }
    sections.push({
        items: [
            { text: "Cerrar sessión", action: signOut }
        ]
    });
    return sections as [MenuSection];
}