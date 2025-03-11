import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers(
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('sortBy') sortBy: string,
        @Query('sortOrder') sortOrder: 'asc' | 'desc',
        @Query('search') search?: string
    ) {
        return this.usersService.getAllUsers(
            Number(page) || 1,
            Number(limit) || 10,
            sortBy || 'created_at',
            sortOrder || 'desc',
            search
        );
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Post()
    async createUser(@Body() body: { name: string; email: string; password: string; role?: 'USER' | 'AGENT' }) {
        return this.usersService.createUser(body.name, body.email, body.password, body.role);
    }

    @Put('id')
    async updateUser(@Param('id') id: string, @Body() updates: { name?: string; email?: string; password?: string; role?: 'USER' | 'AGENT' }) {
        return this.usersService.updateUser(id, updates);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
