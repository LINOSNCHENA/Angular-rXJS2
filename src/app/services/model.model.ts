// import { PostgrestResponse } from "@supabase/supabase-js";

export interface Analytics {
    id: number;
    created: Date;
    yearx?: number;
    monthx?: string;
    collectedx?: number;
    disbursedx?: number;
    updated?: Date;
    enforcerx?: string;
    leaderx?: string;
    fotox: number;
    requiredx?: number;
    profitx?: number;
    dealx?: number;
    periodx?: string;
    penaltyx?: number;
    balance_open?: number;
    balance_triad?: number;
    mProfited: number;
    mSalaries: number;
    success: number;
  }

//   interface PostgrestResponse<T> {
//     data?: T[];
//     error?: Error;
//     count?: number;
//     status?: number;
//     statusText?: string;
//   }
  
//   interface Error {
//     message: string;
//     details?: any; // Additional details about the error
//   }
  
//   export interface AnalyticsResponse extends PostgrestResponse<Analytics> {}