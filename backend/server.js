const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const SUPABASE_URL = 'https://kffgoecicelfadmvkfad.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZmdvZWNpY2VsZmFkbXZrZmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mzc0MjYsImV4cCI6MjA2NzIxMzQyNn0.Tk8Mmlj3LTI_wuO-nXfcZ2X7g_UNRVAIWQYTQ5tjFL8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.post('/bookings', async (req, res) => {
  const { name, phone, date, start_time, hours, total_amount } = req.body;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{ name, phone, date, start_time, hours, total_amount }]);
    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ message: 'Booking saved', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: true });
    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
