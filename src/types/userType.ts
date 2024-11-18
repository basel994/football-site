export type UserType = {
    id: number;
    name: string;
    password: string;
    role: "admin" | "normal";
    created_at: string;
    image: string;

}