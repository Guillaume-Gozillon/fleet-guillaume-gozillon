CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    full_name  TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products
(
    id    SERIAL PRIMARY KEY,
    name  TEXT           NOT NULL UNIQUE,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0)
);


CREATE TABLE orders
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER   NOT NULL REFERENCES users (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status     TEXT      NOT NULL DEFAULT 'PAID'
);


CREATE TABLE order_items
(
    id         SERIAL PRIMARY KEY,
    order_id   INTEGER        NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id INTEGER        NOT NULL REFERENCES products (id),
    quantity   INTEGER        NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0)
);

-- DATASET
INSERT INTO users (email, full_name)
VALUES ('alice@example.com', 'Alice Dupont'),
       ('bob@example.com', 'Bob Martin'),
       ('carol@example.com', 'Carol Durand');

INSERT INTO products (name, price)
VALUES ('PRODUCT_1', 19.99),
       ('PRODUCT_2', 34.50),
       ('PRODUCT_3', 12.00);

-- Alice buuy PRODUCT_1 yesterday
INSERT INTO orders (user_id, created_at)
VALUES (1, NOW() - INTERVAL '1 day');

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (1, 1, 2, 19.99);

-- Bob buy PRODUCT_2 8 days ago
INSERT INTO orders (user_id, created_at)
VALUES (2, NOW() - INTERVAL '8 days');

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (2, 2, 1, 34.50);

-- Carol buy PRODUCT_1 and PRODUCT_3 today
INSERT INTO orders (user_id)
VALUES (3);

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (3, 1, 1, 19.99),
       (3, 3, 4, 12.00);
