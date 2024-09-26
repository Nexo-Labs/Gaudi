import { getActiveProducts } from './lib/server/prisma/get_active_products.js';
import { syncProducts } from './lib/server/stripe/products/sync_products.js';

await syncProducts();

