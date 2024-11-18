export type UserType = {
    id: number;
    name: string;
    last: string;
    password: string;
    role: "admin" | "normal";
    created_at: string;
    image: string;

}