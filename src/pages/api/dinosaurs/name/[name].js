// File: api/dinosaurs/name/[name].js

import { supabase } from '../../../../supabaseClient.js';

export default async function handler(req, res) {
    const { name } = req.query;

    console.log(`Fetching dinosaurs with name: ${name}`);

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const db = await supabase();
        const { data: dinosaurs, error } = await db
            .from('dinosaur_facts')
            .select('*')
            .eq('name', name.toUpperCase());

        if (error) {
            throw error;
        }

        console.log(`Found ${dinosaurs.length} dinosaurs`);

        if (!dinosaurs.length) {
            res.status(404).json({ message: 'No dinosaurs found' });
            return;
        }

        res.status(200).json(dinosaurs);
    } catch (error) {
        console.error('Error fetching dinosaurs by name:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
