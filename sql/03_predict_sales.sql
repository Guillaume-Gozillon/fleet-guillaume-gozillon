WITH all_products AS (
    SELECT id AS product_id
    FROM products
),
     recent_sales AS (
         SELECT
             oi.product_id,
             DATE_TRUNC('day', o.created_at)::date AS sales_date,
             SUM(oi.quantity * oi.unit_price)      AS day_sales
         FROM orders o
                  JOIN order_items oi ON oi.order_id = o.id
         WHERE o.created_at >= current_date - INTERVAL '30 days'
         GROUP BY oi.product_id, sales_date
     ),
     avg_sales AS (
         SELECT
             ap.product_id,
             COALESCE(AVG(rs.day_sales), 0) AS avg_daily_sales
         FROM all_products  ap
                  LEFT JOIN recent_sales rs USING (product_id)
         GROUP BY ap.product_id
     ),
     forecast AS (
         SELECT
             product_id,
             generate_series(
                             current_date + INTERVAL '1 day',
                             current_date + INTERVAL '7 days',
                             INTERVAL '1 day'
             )::date AS forecast_date
         FROM all_products
     )
SELECT
    f.product_id,
    f.forecast_date,
    a.avg_daily_sales AS predicted_sales_amount
FROM forecast f
         JOIN avg_sales a USING (product_id)
ORDER BY f.product_id, f.forecast_date;
