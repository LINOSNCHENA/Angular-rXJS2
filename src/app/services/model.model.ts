import { FormControl } from "@angular/forms";

export interface SessionData {
  session: {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: UserData;
  };
  error: any;//null | string;
}

export interface UserData {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  invited_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  // app_metadata: {
  //   provider: string;
  //   providers: string[];
  // };
  user_metadata: any; // Add specific structure if available
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    sub: string;
  };
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export interface LogInForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

export interface LogInForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

export interface AnalyticState {
  notes: Analytics[];
  loading: boolean;
  error: boolean;
}


export interface Analytics {
  id? : number;
  created: Date;
  yearx?: number;
  monthx?: string;
  collectedx?: number;
  disbursedx?: number;
  updated?: Date;
  enforcerx?: string;
  leaderx?: string;
  fotox?: number;
  requiredx?: number;
  profitx?: number;
  dealx?: number;
  periodx?: string;
  penaltyx?: number;
  balance_open?: number;
  balance_triad?: number;
  mProfited?:number;
  mSalaries?: number;
  success?: number;
}

export interface Post {
  slice(arg0: number, arg1: number): any;
  userId: number;
  id: number;
  title: string;
  body: string;
}
