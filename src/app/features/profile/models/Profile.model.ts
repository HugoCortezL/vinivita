export enum ProfileRoles {
    Admin = "admin",
    User = "user",
    Editor = "editor"
}

export interface Profile {
    user_id: string,
    name: string,
    user_role: ProfileRoles
}