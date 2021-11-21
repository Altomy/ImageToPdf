declare interface UserInterface {
  ID?: number;
  name: string;
  phone: number;
}

declare interface Vector4 {
  left: string;
  top: string;
  right: string;
  bottom: string;
}

declare interface OptionsType {
  imageType: "without" | "slice";
  imageSizeType: "fixed" | "normal" | "fullPage";
  imagePadding: Vector4;
  pagePadding: Vector4;
}
