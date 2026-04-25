const express  = require('express');
const router   = express.Router();
const supabase = require('../db');

// GET /products — fetch all products with filtering & pagination
router.get('/', async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  const pageNum  = parseInt(page);
  const limitNum = parseInt(limit);
  const offset   = (pageNum - 1) * limitNum;

  let query = supabase.from('products').select('*', { count: 'exact' });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limitNum - 1);

  if (error) {
    console.error('Products fetch error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }

  const totalPages = Math.ceil(count / limitNum);

  res.json({
    products:  data,
    pagination: {
      current_page: pageNum,
      total_pages:  totalPages,
      total_items:  count,
      items_per_page: limitNum
    }
  });
});

// GET /products/:id — fetch single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ product: data });
});

module.exports = router;
