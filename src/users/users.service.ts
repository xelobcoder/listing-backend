import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import knexConnection from 'src/db/knexconnection';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private db = knexConnection;

    async getAllUsers(
        page: number = 1,
        limit: number = 10,
        sortBy: string = 'created_at',
        sortOrder: 'asc' | 'desc' = 'desc',
        search?: string
    ) {
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 10;

        if (isNaN(pageNumber) || isNaN(limitNumber)) {
            throw new Error('Page and limit must be valid numbers.');
        }

        const offset = (pageNumber - 1) * limitNumber;

        let query = this.db('users')
            .select('id', 'name', 'email', 'role', 'created_at')
            .orderBy(sortBy, sortOrder)
            .limit(limitNumber)
            .offset(offset);

        if (search) {
            query = query.where('name', 'ilike', `%${search}%`).orWhere('email', 'ilike', `%${search}%`);
        }

        const users = await query;
        const total = await this.db('users').count('* as count').first();

        return {
            data: users,
            total: total?.count || 0,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil((total?.count as any || 0) / limitNumber),
            hasNextPage: pageNumber * limitNumber < (total?.count as any || 0),
            hasPrevPage: pageNumber > 1,
        };
    }

    async getUserById(id: string) {
        const user = await this.db('users').where({ id }).first();
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async getUserByEmail(email: string) {
        return this.db('users').where({ email }).first();
    }

    async createUser(name: string, email: string, password: string, role: 'USER' | 'AGENT' = 'USER') {
        const existingUser = await this.getUserByEmail(email);
        if (existingUser) throw new ConflictException('Email already in use');

        const hashedPassword = await bcrypt.hash(password, 10);
        const [user] = await this.db('users')
            .insert({ name, email, password: hashedPassword, role })
            .returning('*');
        return user;
    }

    async updateUser(id: string, updates: Partial<{ name: string; email: string; password: string; role: 'USER' | 'AGENT' }>) {
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const [updatedUser] = await this.db('users')
            .where({ id })
            .update(updates)
            .returning('*');

        if (!updatedUser) throw new NotFoundException('User not found');
        return updatedUser;
    }

    async deleteUser(id: string) {
        const deletedCount =
            await this.db('users')
                .where({ id }).del();
        if (!deletedCount) throw new NotFoundException('User not found');
        return { message: 'User deleted successfully' };
    }

    async verifyPassword(email: string, password: string) {
        const user = await this.getUserByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }
}
