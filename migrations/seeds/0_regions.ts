import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('regions').del();
    await knex('regions').insert([
        { name: 'ASHANTI REGION', regioncode: 'AS' },
        { name: 'BONO REGION', regioncode: 'BR' },
        { name: 'AHAFO REGION', regioncode: 'AH' },
        { name: 'BONO EAST REGION', regioncode: 'BE' },
        { name: 'CENTRAL REGION', regioncode: 'CR' },
        { name: 'EASTERN REGION', regioncode: 'ER' },
        { name: 'GREATER ACCRA REGION', regioncode: 'GA' },
        { name: 'NORTH EAST REGION', regioncode: 'NE' },
        { name: 'NORTHERN REGION', regioncode: 'NR' },
        { name: 'OTI REGION', regioncode: 'OT' },
        { name: 'SAVANNAH REGION', regioncode: 'SV' },
        { name: 'UPPER EAST REGION', regioncode: 'UE' },
        { name: 'UPPER WEST REGION', regioncode: 'UW' },
        { name: 'VOLTA REGION', regioncode: 'VR' },
        { name: 'WESTERN REGION', regioncode: 'WR' },
        { name: 'WESTERN NORTH REGION', regioncode: 'WN' },
    ]);
}