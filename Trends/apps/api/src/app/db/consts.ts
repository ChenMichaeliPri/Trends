export const dbConsts = {
    createItemTable : `
    CREATE TABLE item (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        insights TEXT
        );`,
    createShopTable : `
    CREATE TABLE shop (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
        );`,
    createRecordTable : `
    CREATE TABLE record (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_id INT NOT NULL,
        shop_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (item_id) REFERENCES item(id),
        FOREIGN KEY (shop_id) REFERENCES shop(id)
        );`,
    insertItemQuery: (itemName, insights) => `
        INSERT INTO item (name, insights)
        VALUES ('${itemName}', '${insights}');
    `,
    insertShopQuery: (shopName) => `
        INSERT INTO shop (name)
        VALUES ('${shopName}');
    `,
    insertRecordQuery: (itemId, shopId, price) => `
        INSERT INTO record (item_id, shop_id, price)
        VALUES (${itemId}, ${shopId}, ${price});
        `
}