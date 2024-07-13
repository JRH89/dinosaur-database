// File: pages/api/dinosaurs/diet/[diet].js

import { supabase } from '../../../../supabaseClient';

export default async function handler(req, res) {
    const { diet } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { data, error } = await supabase
            .from('dinosaur_facts')
            .select('*')
            .ilike('diet', `%${diet}%`);

        if (error) {
            console.error('Error fetching dinosaurs by diet:', error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        if (data.length === 0) {
            res.status(404).json({ message: 'No dinosaurs found for this diet' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching dinosaurs by diet:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
