type Nullable<T> = T | null;

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
