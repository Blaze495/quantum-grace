import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Create a new user
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * Update user
   */
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Get user profile with stats
   */
  async getProfile(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...profile } = user;

    // Get stats
    const [habitCount, goalCount, totalSessions] = await Promise.all([
      this.prisma.habit.count({ where: { userId: id, archived: false } }),
      this.prisma.goal.count({ where: { userId: id } }),
      this.prisma.sessionLog.count({ where: { userId: id } }),
    ]);

    return {
      ...profile,
      stats: {
        habits: habitCount,
        goals: goalCount,
        sessions: totalSessions,
      },
    };
  }
}
