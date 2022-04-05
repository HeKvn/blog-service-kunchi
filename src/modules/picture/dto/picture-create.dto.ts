import { PictureDTO } from "./picture.dto";

export class PictureCreateDTO extends PictureDTO {

   /**
    * 图片md5
    * @example asdfghjkl
    */
    readonly sign?: string;
}
