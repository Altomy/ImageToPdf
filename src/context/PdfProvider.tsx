/**
 * PdfProvider.tsx
 */
import React, { useContext, useReducer, createContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "components/PickImage";
// ==================== Contexts ==================== //

// ========== States Models ========== //
type DefaultT = {
  options: OptionsType;
  imageBag: ImageInfo[];
};

type pushToImageBagType = (image: ImageInfo) => void;
type removeFromImageBag = (index: number) => void;

// ========== Initial States ========== //
let defaultValue: DefaultT = {
  options: {
    imageType: "slice",
    imageSizeType: "fixed",
    imagePadding: {
      left: "5",
      top: "5",
      right: "5",
      bottom: "5",
    },
    pagePadding: {
      left: "0",
      top: "0",
      right: "0",
      bottom: "0",
    },
  },
  imageBag: [],
};

// ========== Actions ========== //
type OptionsActions = { type: "setOptions"; payload: OptionsType };
type ImageBagActions = {
  type: "setImageBag";
  payload: ImageInfo[];
};
type Actions = OptionsActions | ImageBagActions;

// ========== ReducersFunction ========== //
function reducerFunction(state: DefaultT, action: Actions) {
  switch (action.type) {
    case "setOptions":
      return { ...state, options: action.payload };
    case "setImageBag":
      return { ...state, imageBag: action.payload };
    default:
      return state;
  }
}

// ========== Context Creator ========== //
const Context = createContext<
  | {
      Pdf: DefaultT;
      dispatchPdf: (action: Actions) => void;
      pushToImageBag: pushToImageBagType;
      removeFromImageBag: removeFromImageBag;
    }
  | undefined
>(undefined);

// ========== DefaultFunction ========== //
let PdfProvider: React.FC = ({ children }) => {
  let [Pdf, dispatchPdf] = useReducer(reducerFunction, defaultValue);

  let pushToImageBag = (image: ImageInfo) => {
    let newValues = [...Pdf.imageBag];
    newValues.push(image);
    dispatchPdf({ type: "setImageBag", payload: newValues });
  };

  let removeFromImageBag: removeFromImageBag = (index) => {
    let newValues = [...Pdf.imageBag];
    newValues.splice(index, 1);
    dispatchPdf({ type: "setImageBag", payload: newValues });
  };

  // ========== return ========== //
  return (
    <Context.Provider
      value={{ Pdf, dispatchPdf, pushToImageBag, removeFromImageBag }}
    >
      {children}
    </Context.Provider>
  );
};

// ========== CustomsHooks ========== //
export function usePdf() {
  const context = useContext(Context);
  if (context === undefined) throw new Error("Must used in the PdfContext");
  return context;
}

export default PdfProvider;
