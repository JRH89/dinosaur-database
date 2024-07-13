import { supabase } from '../../../../supabaseClient.js';
export default async function handler(req, res) {
    const { name } = req.query;
    const db = await supabase();
    const dinosaurs = await db.all('SELECT * FROM dinosaur_facts WHERE UPPER(name) = ?', [name.toUpperCase()]);

    if (!dinosaurs.length) {
        res.status(404).json({ message: 'No dinosaurs found' });
        return;
    }

    res.status(200).json(dinosaurs);
}
