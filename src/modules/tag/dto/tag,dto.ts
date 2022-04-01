import { IsNotEmpty } from "class-validator";

export class TagDTO {
  @IsNotEmpty()
  label: string
}