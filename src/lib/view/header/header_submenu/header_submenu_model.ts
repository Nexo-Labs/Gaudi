import type { Optional } from "../../../domain/common/optional_helpers.js";
import { relativeUrls } from "../../../domain/routing.js";
import type { UserModel } from "../../../domain/user-model.js";
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
                { text: "Cuenta", href: relativeUrls.user.profile },
                { text: "Suscripción", href: relativeUrls.subscriptions.list }
            ]   
        }
    ];
    if(user.roles.includes("admin")) {
        sections.push({
            title: "Administración",
            items: [
                { text: "Usuarios", href: relativeUrls.admin.users },
                { text: "Contenido", href: relativeUrls.admin.content.root },
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