export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
  | { timestamp: string | Date };

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string;
          email: string;
          password_hash: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          email: string;
          password_hash: string;
          created_at?: string;
        };
        Update: {
          user_id: string;
          email?: string;
          password_hash?: string;
          created_at?: string;
        };
      };
      image_details: {
        Row: {
          id: string;
          user_id: string;
          image_name: string;
          upload_time: string;
          conversion_current_step: string | null;
          status: string | null;
          status_extra: Json;
          prompt_size: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          image_name: string;
          upload_time?: string;
          conversion_current_step?: string | null;
          status?: string | null;
          status_extra?: Json;
          prompt_size?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          image_name?: string;
          upload_time?: string;
          conversion_current_step?: string | null;
          status?: string | null;
          status_extra?: Json;
          prompt_size?: number | null;
        };
      };
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          service_name: string;
          service_url: string;
          plan_name: string;
          price: string | null;
          billing_cycle: string;
          next_billing_date: string;
          paid_date: string;
          start_date: string;
          created_at: string;
          status: string | null;
          type: string | null;
        };
        Insert: {
          // id?: string;
          user_id: string;
          service_name: string;
          service_url?: string;
          plan_name: string;
          price?: string | null;
          billing_cycle: string;
          next_billing_date: string;
          paid_date: string;
          start_date?: string;
          created_at?: string;
          status?: string | null;
          type?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          service_name?: string;
          service_url?: string;
          plan_name?: string;
          price?: string | null;
          billing_cycle?: string;
          next_billing_date?: string;
          paid_date?: string;
          start_date?: string;
          created_at?: string;
          status?: string | null;
          type?: string | null;
        };
      };
      sessions: {
        Row: {
          session_id: number;
          user_id: string;
          token: string;
          created_at: string;
          expires_at: string;
        };
        Insert: {
          user_id: string;
          token: string;
          created_at?: string;
          expires_at: string;
        };
        Update: {
          user_id?: string;
          token?: string;
          created_at?: string;
          expires_at?: string;
        };
      };
      payments: {
        Row: {
          payment_id: number;
          user_id: string;
          amount: number;
          credits_purchased: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          amount: number;
          credits_purchased: number;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          amount?: number;
          credits_purchased?: number;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          price_id: string;
          status: Database['public']['Enums']['subscription_status'];
          cancel_at_period_end: boolean;
          currency?: string | null;
          interval?: string | null;
          interval_count?: number | null;
          created_at: string;
          period_starts_at?: string | null;
          period_ends_at?: string | null;
          trial_starts_at?: string | null;
          trial_ends_at?: string | null;
          user_id: string;
        };
        Insert: {
          id: string;
          price_id: string;
          status: Database['public']['Enums']['subscription_status'];
          cancel_at_period_end: boolean;
          currency?: string | null;
          interval?: string | null;
          interval_count?: number | null;
          created_at: string;
          period_starts_at?: string | null;
          period_ends_at?: string | null;
          trial_starts_at?: string | null;
          trial_ends_at?: string | null;
          user_id: string;
        };
        Update: {
          id: string;
          price_id: string;
          status: Database['public']['Enums']['subscription_status'];
          cancel_at_period_end: boolean;
          currency?: string | null;
          interval?: string | null;
          interval_count?: number | null;
          created_at: string;
          period_starts_at?: string | null;
          period_ends_at?: string | null;
          trial_starts_at?: string | null;
          trial_ends_at?: string | null;
          user_id: string;
        };
      };
      app_configs: {
        Row: {
          id: number;
          slack_notification: boolean;
          email_notification: boolean;
          calendar_notification: boolean;
          webhook_url: string | null;
          event_title: string | null;
          event_time: string | null;
          created_at: string | Date;
          updated_at: string | Date;
          created_by: string;
          updated_by: string;
          user_id: string;
        };
        Insert: {
          // id?: never;
          slack_notification: boolean;
          email_notification: boolean;
          calendar_notification: boolean;
          webhook_url: string | null;
          event_title: string | null;
          event_time: string | null;
          created_at?: string | Date;
          updated_at?: string | Date;
          created_by: string;
          updated_by: string;
          user_id?: string;
        };
        Update: {
          // id?: number;
          slack_notification?: boolean;
          email_notification?: boolean;
          calendar_notification?: boolean;
          webhook_url?: string | null;
          event_title?: string | null;
          event_time?: string | null;
          created_at?: string | Date;
          updated_at?: string | Date;
          created_by?: string;
          updated_by?: string;
          user_id?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      subscription_status:
        | 'active'
        | 'trialing'
        | 'past_due'
        | 'canceled'
        | 'unpaid'
        | 'incomplete'
        | 'incomplete_expired'
        | 'paused';
    };
  };
};
