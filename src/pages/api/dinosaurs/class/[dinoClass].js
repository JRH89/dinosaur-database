// File: pages/api/dinosaurs/class/[dinoClass].js

import { supabase } from '../../../../supabaseClient';

export default async function handler(req, res) {
    const { dinoClass } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const { data, error } = await supabase
            .from('dinosaur_facts')
            .select('*')
            .ilike('class', `%${dinoClass}%`);

        if (error) {
            console.error('Error fetching dinosaurs by class:', error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        if (data.length === 0) {
            res.status(404).json({ message: 'No dinosaurs found for this class' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching dinosaurs by class:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
