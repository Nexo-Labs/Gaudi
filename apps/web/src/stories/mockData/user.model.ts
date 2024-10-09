import type { UserModel } from "$src/lib/domain/user-model.js";

export const mockUser: UserModel = {
    userId: "123",
    name: "name",
    email: "email@fake.com",
    image: "https://fake.com/image.jpg",
    roles: []
}
export const mockAdminUser: UserModel = {
    userId: "123",
    name: "name",
    email: "email@fake.com",
    image: "https://fake.com/image.jpg",
    roles: ["admin"]
}
