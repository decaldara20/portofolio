import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Database = {
	public: {
		Tables: {
			ngl_messages: {
				Row: {
					id: string;
					sender_name: string;
					message: string;
					is_anonymous: boolean;
					created_at: string;
				};
				Insert: {
					id?: string;
					sender_name: string;
					message: string;
					is_anonymous: boolean;
					created_at?: string;
				};
				Update: {
					id?: string;
					sender_name?: string;
					message?: string;
					is_anonymous?: boolean;
					created_at?: string;
				};
				Relationships: [];
			};
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	?.replace(/\/rest\/v1\/?$/, "")
	.replace(/\/+$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient<Database> | null = null;

export function getSupabaseClient() {
	if (!supabaseUrl || !supabaseAnonKey) return null;

	supabase ??= createClient<Database>(supabaseUrl, supabaseAnonKey);
	return supabase;
}