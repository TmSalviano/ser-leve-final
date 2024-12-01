export default interface Usuario {
  Id?: number; //? makes the value optional
  Nome?: string;
  NameTag: string;
  Email: string;
  Password: string; //this is optional because sometimes you want to load the user without a password
  ProfilePicture?: string;
  Biografy?: string;
  Following?: string;
}