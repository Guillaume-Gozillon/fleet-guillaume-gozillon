SELECT DISTINCT u.email
FROM users AS u
         JOIN orders AS o ON o.user_id = u.id
         JOIN order_items AS oi ON oi.order_id = o.id
         JOIN products AS p ON p.id = oi.product_id
WHERE p.name = 'PRODUCT_1'
  AND o.created_at >= NOW() - INTERVAL '7 days';


SELECT date_trunc('day', o.created_at)::date AS order_date,
       SUM(oi.quantity * oi.unit_price) AS total_sales
FROM orders o
         JOIN order_items oi ON oi.order_id = o.id
GROUP BY order_date
ORDER BY order_date;