export interface BodyInformation {
  gender: "MALE" | "FEMALE";
  age: number;
  height: number;
  weight: number;
}

export interface HealthGoal {
  target: "loss" | "maintenance" | "increase";
  weightGainRate: number;
  pal: 1.2 | 1.375 | 1.55 | 1.725;
  dailyKcal: number;
  dailyCarbohydrate: number;
  dailyProtein: number;
  dailyFat: number;
}

export interface UserProfile extends BodyInformation, HealthGoal {
  email: string;
  name: string;
}

export interface JoinProfile {
  email: string;
  name: string;
  password: string;
  target: "loss" | "maintenance" | "increase";
  weightGainRate: number;
  pal: 1.2 | 1.375 | 1.55 | 1.725;
  dailyKcal: number;
  dailyCarbohydrate: number;
  dailyProtein: number;
  dailyFat: number;
  gender: "MALE" | "FEMALE";
  age: number;
  height: number;
  weight: number;
}
