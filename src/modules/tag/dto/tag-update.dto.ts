import { IntersectionType, PartialType } from "@nestjs/swagger";
import { IdDTO } from "src/modules/article/dto/id.dto";
import { TagDTO } from "./tag,dto";

export class TagUpdateDTO extends IntersectionType(
  IdDTO,
  PartialType(TagDTO)
){}