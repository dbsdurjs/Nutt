export const DETECTED_FOODS = "DETECTED_FOODS";

export interface DetectedFood {
  class: string;
  confidence: number;
  h: number;
  w: number;
  x: number;
  y: number;
}

export interface DetectedFoodsAction {
  type: string;
  payload: DetectedFood[] | null;
}

export const DetectedFoodsReducer = (
  state: DetectedFood[] | null = null,
  action: DetectedFoodsAction
) => {
  switch (action.type) {
    case DETECTED_FOODS:
      return action.payload;
    default:
      return state;
  }
};
