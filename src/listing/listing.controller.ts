import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { ListingsService } from 'src/listings/listings.service';


@Controller('listings')
export class ListingsController {
    constructor(private readonly listingsService: ListingsService) { }

    @Get()
    async getAllListings(
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('sortBy') sortBy: string,
        @Query('sortOrder') sortOrder: 'asc' | 'desc',
        @Query('search') search?: string
    ) {
        return this.listingsService.getAllListings(
            Number(page) || 1,
            Number(limit) || 10,
            sortBy || 'created_at',
            sortOrder || 'desc',
            search
        );
    }

    @Get(':id')
    async getListingById(@Param('id') id: string) {
        return this.listingsService.getListingById(id);
    }

    @Post()
    async createListing(@Body() data: any) {
        const mappedData = data.map((item, index) => {
            const imageUrls = JSON.stringify(item['imageUrls']);
            item['imageUrls'] = imageUrls;
            const floorPlans = JSON.stringify(item['floorPlans']);
            item['floorPlans'] = floorPlans
            return item
        })
        return this.listingsService.createListing(mappedData);
    }

    @Put(':id')
    async updateListing(@Param('id') id: string, @Body() updates: any) {
        return this.listingsService.updateListing(id, updates);
    }

    @Delete(':id')
    async deleteListing(@Param('id') id: string) {
        return this.listingsService.deleteListing(id);
    }
}
