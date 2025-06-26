export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      data_umum: {
        Row: {
          id_data: number
          keterangan: string | null
          nama_data: string | null
          nilai_data: string | null
        }
        Insert: {
          id_data?: number
          keterangan?: string | null
          nama_data?: string | null
          nilai_data?: string | null
        }
        Update: {
          id_data?: number
          keterangan?: string | null
          nama_data?: string | null
          nilai_data?: string | null
        }
        Relationships: []
      }
      detail_transaksi: {
        Row: {
          harga_satuan: number | null
          id_detail: number
          id_produk: number | null
          id_transaksi: number | null
          jumlah: number
        }
        Insert: {
          harga_satuan?: number | null
          id_detail?: number
          id_produk?: number | null
          id_transaksi?: number | null
          jumlah: number
        }
        Update: {
          harga_satuan?: number | null
          id_detail?: number
          id_produk?: number | null
          id_transaksi?: number | null
          jumlah?: number
        }
        Relationships: [
          {
            foreignKeyName: "detail_transaksi_id_produk_fkey"
            columns: ["id_produk"]
            isOneToOne: false
            referencedRelation: "produk"
            referencedColumns: ["id_produk"]
          },
          {
            foreignKeyName: "detail_transaksi_id_transaksi_fkey"
            columns: ["id_transaksi"]
            isOneToOne: false
            referencedRelation: "transaksi"
            referencedColumns: ["id_transaksi"]
          },
        ]
      }
      laporan: {
        Row: {
          id_laporan: number
          isi: string | null
          judul: string | null
          tanggal_laporan: string | null
        }
        Insert: {
          id_laporan?: number
          isi?: string | null
          judul?: string | null
          tanggal_laporan?: string | null
        }
        Update: {
          id_laporan?: number
          isi?: string | null
          judul?: string | null
          tanggal_laporan?: string | null
        }
        Relationships: []
      }
      mitra_bumdes: {
        Row: {
          alamat: string | null
          deskripsi: string | null
          id_mitra: number
          nama_mitra: string
          nik: string
          no_hp: string | null
        }
        Insert: {
          alamat?: string | null
          deskripsi?: string | null
          id_mitra?: number
          nama_mitra: string
          nik: string
          no_hp?: string | null
        }
        Update: {
          alamat?: string | null
          deskripsi?: string | null
          id_mitra?: number
          nama_mitra?: string
          nik?: string
          no_hp?: string | null
        }
        Relationships: []
      }
      produk: {
        Row: {
          deskripsi: string | null
          harga: number | null
          id_produk: number
          id_supplier: number | null
          kategori: string | null
          nama_produk: string
          stok: number | null
        }
        Insert: {
          deskripsi?: string | null
          harga?: number | null
          id_produk?: number
          id_supplier?: number | null
          kategori?: string | null
          nama_produk: string
          stok?: number | null
        }
        Update: {
          deskripsi?: string | null
          harga?: number | null
          id_produk?: number
          id_supplier?: number | null
          kategori?: string | null
          nama_produk?: string
          stok?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "produk_id_supplier_fkey"
            columns: ["id_supplier"]
            isOneToOne: false
            referencedRelation: "supplier"
            referencedColumns: ["id_supplier"]
          },
        ]
      }
      sales: {
        Row: {
          email: string | null
          id_sales: number
          kontak: string | null
          nama_sales: string
        }
        Insert: {
          email?: string | null
          id_sales?: number
          kontak?: string | null
          nama_sales: string
        }
        Update: {
          email?: string | null
          id_sales?: number
          kontak?: string | null
          nama_sales?: string
        }
        Relationships: []
      }
      supplier: {
        Row: {
          alamat: string | null
          id_supplier: number
          kontak: string | null
          nama_supplier: string
        }
        Insert: {
          alamat?: string | null
          id_supplier?: number
          kontak?: string | null
          nama_supplier: string
        }
        Update: {
          alamat?: string | null
          id_supplier?: number
          kontak?: string | null
          nama_supplier?: string
        }
        Relationships: []
      }
      transaksi: {
        Row: {
          id_mitra: number | null
          id_sales: number | null
          id_transaksi: number
          id_user: number | null
          tanggal: string | null
          total_harga: number | null
        }
        Insert: {
          id_mitra?: number | null
          id_sales?: number | null
          id_transaksi?: number
          id_user?: number | null
          tanggal?: string | null
          total_harga?: number | null
        }
        Update: {
          id_mitra?: number | null
          id_sales?: number | null
          id_transaksi?: number
          id_user?: number | null
          tanggal?: string | null
          total_harga?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transaksi_id_mitra_fkey"
            columns: ["id_mitra"]
            isOneToOne: false
            referencedRelation: "mitra_bumdes"
            referencedColumns: ["id_mitra"]
          },
          {
            foreignKeyName: "transaksi_id_sales_fkey"
            columns: ["id_sales"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id_sales"]
          },
          {
            foreignKeyName: "transaksi_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id_user"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id_user: number
          nama_lengkap: string | null
          password: string
          role: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id_user?: number
          nama_lengkap?: string | null
          password: string
          role?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id_user?: number
          nama_lengkap?: string | null
          password?: string
          role?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
