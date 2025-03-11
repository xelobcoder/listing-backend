import { Injectable, NotFoundException } from '@nestjs/common';
import knexConnection from '../db/knexconnection';

@Injectable()
export class ListingsService {
    private connector = knexConnection;

    async getAllListings(
        page: number = 1,
        limit: number = 10,
        sortBy: string = 'created_at',
        sortOrder: 'asc' | 'desc' = 'desc',
        search?: string
    ) {
        const offset = (page - 1) * limit;
        let query = this.connector('listings')
            .select('*')
            .orderBy(sortBy, sortOrder)
            .limit(limit)
            .offset(offset);

        if (search) {
            query = query.where('title', 'ilike', `%${search}%`);
        }

        return await query;
    }

    async getListingById(id: string) {
        const listing = await this.connector('listings').where({ id }).first();
        if (!listing) throw new NotFoundException(`Listing with ID ${id} not found`);
        return listing;
    }

    async createListing(data: any) {
        const [newListing] = await this.connector('listings')
            .insert(data)
            .returning('*');
        return newListing;
    }

    async updateListing(id: string, updates: any) {
        const [updatedListing] = await this.connector('listings')
            .where({ id })
            .update(updates)
            .returning('*');

        if (!updatedListing) throw new NotFoundException(`Listing with ID ${id} not found`);
        return updatedListing;
    }

    async deleteListing(id: string) {
        const deletedCount = await this.connector('listings').where({ id }).del();
        if (!deletedCount) throw new NotFoundException(`Listing with ID ${id} not found`);
        return { message: 'Listing deleted successfully' };
    }
}
