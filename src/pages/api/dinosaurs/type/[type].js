// File: pages/api/dinosaurs/type/[type].js

import { supabase } from '../../../../supabaseClient';

export default async function handler(req, res) {
    const { type } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { data, error } = await supabase
            .from('dinosaur_facts')
            .select('*')
            .ilike('type', `%${type}%`);

        if (error) {
            console.error('Error fetching dinosaurs by type:', error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        if (data.length === 0) {
            res.status(404).json({ message: 'No dinosaurs found for this type' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching dinosaurs by type:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
