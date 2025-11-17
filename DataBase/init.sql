CREATE USER IF NOT EXISTS 'safestock_app'@'%' IDENTIFIED BY 'admin123';
CREATE USER IF NOT EXISTS 'safestock_app'@'localhost' IDENTIFIED BY 'admin123';
CREATE USER IF NOT EXISTS 'safestock_app'@'127.0.0.1' IDENTIFIED BY 'admin123';

CREATE USER IF NOT EXISTS 'safestock_user'@'%' IDENTIFIED BY 'admin123';
CREATE USER IF NOT EXISTS 'safestock_user'@'localhost' IDENTIFIED BY 'admin123';
CREATE USER IF NOT EXISTS 'safestock_user'@'127.0.0.1' IDENTIFIED BY 'admin123';

-- Garantir que os usuários tenham todos os privilégios no banco da aplicação
GRANT ALL PRIVILEGES ON safestockDB.* TO 'safestock_app'@'%';
GRANT ALL PRIVILEGES ON safestockDB.* TO 'safestock_app'@'localhost';
GRANT ALL PRIVILEGES ON safestockDB.* TO 'safestock_app'@'127.0.0.1';

GRANT ALL PRIVILEGES ON safestockDB.* TO 'safestock_user'@'%';
GRANT ALL PRIVILEGES ON safestockDB.* TO 'safestock_user'@'localhost';
GRANT ALL PRIVILEGES ON safestockDB.* TO 'safestock_user'@'127.0.0.1';
FLUSH PRIVILEGES;

USE safestockDB;

SELECT 'Banco safestockDB inicializado com sucesso!' AS status;