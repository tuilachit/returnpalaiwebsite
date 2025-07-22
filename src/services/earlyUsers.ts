import { supabase } from '../lib/supabase';
import type { EarlyUser, EarlyUserInsert } from '../lib/supabase';

export class EarlyUsersService {
  /**
   * Submit early user interest form
   */
  static async submitInterest(userData: EarlyUserInsert): Promise<{ success: boolean; error?: string; data?: EarlyUser }> {
    try {
      // Validate required fields
      if (!userData.email || !userData.name) {
        return { success: false, error: 'Email and name are required' };
      }

      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('early_users')
        .select('id')
        .eq('email', userData.email)
        .single();

      if (existingUser) {
        return { success: false, error: 'This email is already registered for early access' };
      }

      // Insert new early user
      const { data, error } = await supabase
        .from('early_users')
        .insert([userData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { success: false, error: 'Failed to submit form. Please try again.' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Service error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  /**
   * Get all early users (admin only)
   */
  static async getAllEarlyUsers(): Promise<{ success: boolean; data?: EarlyUser[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('early_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Service error:', error);
      return { success: false, error: 'Failed to fetch early users' };
    }
  }

  /**
   * Update early user status (admin only)
   */
  static async updateUserStatus(id: string, status: 'pending' | 'contacted' | 'converted'): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('early_users')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Service error:', error);
      return { success: false, error: 'Failed to update user status' };
    }
  }

  /**
   * Get early user statistics
   */
  static async getStatistics(): Promise<{ 
    success: boolean; 
    data?: { 
      total: number; 
      byInterestLevel: Record<string, number>;
      byPlatform: Record<string, number>;
      byStatus: Record<string, number>;
      recentSignups: number;
    }; 
    error?: string 
  }> {
    try {
      const { data, error } = await supabase
        .from('early_users')
        .select('interest_level, preferred_platform, status, created_at');

      if (error) {
        return { success: false, error: error.message };
      }

      const total = data.length;
      const byInterestLevel: Record<string, number> = {};
      const byPlatform: Record<string, number> = {};
      const byStatus: Record<string, number> = {};
      
      // Count recent signups (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const recentSignups = data.filter(user => 
        new Date(user.created_at) > weekAgo
      ).length;

      // Aggregate data
      data.forEach(user => {
        byInterestLevel[user.interest_level] = (byInterestLevel[user.interest_level] || 0) + 1;
        byPlatform[user.preferred_platform] = (byPlatform[user.preferred_platform] || 0) + 1;
        byStatus[user.status] = (byStatus[user.status] || 0) + 1;
      });

      return {
        success: true,
        data: {
          total,
          byInterestLevel,
          byPlatform,
          byStatus,
          recentSignups
        }
      };
    } catch (error) {
      console.error('Service error:', error);
      return { success: false, error: 'Failed to fetch statistics' };
    }
  }
}