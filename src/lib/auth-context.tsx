/**
 * Auth Context (Mock Authentication)
 * จัดการ session ผู้ใช้งาน — เก็บข้อมูลลง localStorage
 * รองรับ role: 'user' | 'admin'
 * พร้อมต่อยอดเป็น Supabase / Firebase Auth ได้
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

// ========== Types ==========
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// ========== Storage Keys ==========
const STORAGE_KEY = 'fashion_co_user';
const USERS_KEY = 'fashion_co_users';

// ========== Context ==========
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ========== Provider ==========
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* โหลด session จาก localStorage เมื่อเริ่มต้น */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ถ้า parse ไม่ได้ ก็ข้ามไป
    }
    setIsLoading(false);
  }, []);

  /* บันทึก session เมื่อ user เปลี่ยน */
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  /* ตรวจสอบว่าเป็น admin หรือไม่ */
  const isAdmin = user?.role === 'admin';

  /* เข้าสู่ระบบ (Mock) */
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));

    try {
      const usersRaw = localStorage.getItem(USERS_KEY);
      const users: Array<User & { password: string }> = usersRaw
        ? JSON.parse(usersRaw)
        : [];

      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (found) {
        const { password: _, ...userData } = found;
        setUser(userData);
        return true;
      }

      // Demo admin account
      if (email === 'admin@fashionco.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-001',
          name: 'ผู้ดูแลระบบ',
          email: 'admin@fashionco.com',
          role: 'admin',
        };
        setUser(adminUser);
        return true;
      }

      // Demo user account
      if (email === 'demo@fashionco.com' && password === '123456') {
        const demoUser: User = {
          id: 'demo-001',
          name: 'ผู้ใช้ทดสอบ',
          email: 'demo@fashionco.com',
          role: 'user',
        };
        setUser(demoUser);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }, []);

  /* สมัครสมาชิก (Mock) — ผู้ใช้ทั่วไปเสมอ */
  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 500));

      try {
        const usersRaw = localStorage.getItem(USERS_KEY);
        const users: Array<User & { password: string }> = usersRaw
          ? JSON.parse(usersRaw)
          : [];

        if (users.some((u) => u.email === email)) {
          return false;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          role: 'user' as UserRole,
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const { password: _, ...userData } = newUser;
        setUser(userData);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  /* ออกจากระบบ */
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ========== Hook ==========
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth ต้องใช้ภายใน AuthProvider');
  }
  return context;
}
