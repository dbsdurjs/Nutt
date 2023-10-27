export const DETECTING_IMAGE = "DETECTING_IMAGE";

export interface DetectingImage {
  image: any;
}

export interface DetectingImageAction {
  type: string;
  payload: DetectingImage | null;
}

export const DetectingImageReducer = (
  state: DetectingImage | null = null,
  action: DetectingImageAction
) => {
  switch (action.type) {
    case DETECTING_IMAGE:
      return action.payload;
    default:
      return state;
  }
};
