// File: pages/api/dinosaurs/name/[name].js

import { supabase } from '../../../../supabaseClient';

export default async function handler(req, res) {
    const { name } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { data, error } = await supabase
            .from('dinosaur_facts')
            .select('*')
            .ilike('name', `%${name}%`);

        if (error) {
            console.error('Error fetching dinosaurs by name:', error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        if (data.length === 0) {
            res.status(404).json({ message: 'No dinosaurs found for this name' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching dinosaurs by name:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
