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

export interface Post {
    slice(arg0: number, arg1: number): any;
    userId: number;
    id: number;
    title: string;
    body: string;
  }
