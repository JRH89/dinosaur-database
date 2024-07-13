// File: api/dinosaurs/family/[family].js

import { supabase } from '../../../../supabaseClient.js';
export default async function handler(req, res) {
    const { family } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const db = await supabase();
        const dinosaurs = await db.all('SELECT * FROM dinosaur_facts WHERE UPPER(family) = ?', [family.toUpperCase()]);

        if (!dinosaurs.length) {
            res.status(404).json({ message: 'No dinosaurs found for this family' });
            return;
        }

        res.status(200).json(dinosaurs);
    } catch (error) {
        console.error('Error fetching dinosaurs by family:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
