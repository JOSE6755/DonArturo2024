use master;
DROP DATABASE IF EXISTS "Jose-GDA00193-OT-Martinez";
CREATE DATABASE "Jose-GDA00193-OT-Martinez";

USE "Jose-GDA00193-OT-Martinez";

DROP TABLE IF EXISTS CategoryProduct;
DROP TABLE IF EXISTS OrderDetail;
DROP TABLE IF EXISTS ShopCartDetail;
DROP TABLE IF EXISTS ShopCart;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Brand;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS State;


-- Crear tabla Role
CREATE TABLE Roles (
    RoleId INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) NOT NULL
);

-- Crear tabla State
CREATE TABLE State (
    StateId INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) NOT NULL
);

-- Crear tabla Client
CREATE TABLE Client (
    ClientId INT PRIMARY KEY IDENTITY,
    CommercialName VARCHAR(100) NOT NULL,
    Adress VARCHAR(250),
    PhoneNumber VARCHAR(8),
    CommercialEmail VARCHAR(100)
);

-- Crear tabla User
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY,
    Names VARCHAR(100) NOT NULL,
    LastNames VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(600) NOT NULL,
    PhoneNumber VARCHAR(8),
    BirthDate DATE,
    CreationDate DATETIME DEFAULT GETDATE(),
    Adress VARCHAR(250),
    RoleId INT NOT NULL,
    ClientId INT NULL,
    StateId INT NOT NULL,
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId),
    FOREIGN KEY (ClientId) REFERENCES Client(ClientId),
    FOREIGN KEY (StateId) REFERENCES State(StateId)
);


-- Crear tabla Brand
CREATE TABLE Brand (
    BrandId INT PRIMARY KEY IDENTITY,
    Name VARCHAR(100) NOT NULL
);

-- Crear tabla Product
CREATE TABLE Product (
    ProductId INT PRIMARY KEY IDENTITY,
    Name VARCHAR(100) NOT NULL,
    Code VARCHAR(50) UNIQUE NOT NULL,
    Stock INT NOT NULL,
    Price FLOAT NOT NULL,
    CreationDate DATETIME DEFAULT GETDATE(),
    UpdateDate DATETIME NULL,
    Image TEXT NULL,
    StateId INT NOT NULL,
    BrandId INT NOT NULL,
    FOREIGN KEY (StateId) REFERENCES State(StateId),
    FOREIGN KEY (BrandId) REFERENCES Brand(BrandId)
);


-- Crear tabla Category
CREATE TABLE Category (
    CategoryId INT PRIMARY KEY IDENTITY,
    Name VARCHAR(100) NOT NULL,
    StateId INT NOT NULL DEFAULT 1,
    FOREIGN KEY (StateId) REFERENCES State(StateId)
);

-- Crear tabla CategoryProduct
CREATE TABLE CategoryProduct (
    CategoryProductId INT PRIMARY KEY IDENTITY,
    ProductId INT NOT NULL,
    CategoryId INT NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId),
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);


-- Crear tabla ShopCart
CREATE TABLE ShopCart (
    idShopCart INT PRIMARY KEY IDENTITY,
    CreationDate DATETIME DEFAULT GETDATE(),
    ModificationDate DATETIME DEFAULT GETDATE(),
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- Crear tabla ShopCartDetail
CREATE TABLE ShopCartDetail (
    ShopCartDetailId INT PRIMARY KEY IDENTITY,
    Quantity INT NOT NULL,
    Price FLOAT NOT NULL,
    SubTotal FLOAT NOT NULL,
    ShopCartId INT NOT NULL,
    ProductId INT NOT NULL,
    FOREIGN KEY (ShopCartId) REFERENCES ShopCart(idShopCart),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);

-- Crear tabla Order
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY,
    Total FLOAT NOT NULL,
    CreationDate DATETIME DEFAULT GETDATE(),
    UserId INT NOT NULL,
    StateId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (StateId) REFERENCES State(StateId)
);

-- Crear tabla OrderDetail
CREATE TABLE OrderDetail (
    OrderDetailId INT PRIMARY KEY IDENTITY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    Price FLOAT NOT NULL,
    SubTotal FLOAT NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);


DROP PROCEDURE IF EXISTS SpecificShopCartDetails;
DROP PROCEDURE IF EXISTS CreateRoles;
DROP PROCEDURE IF EXISTS CreateStates;
DROP PROCEDURE IF EXISTS CreateClients;
DROP PROCEDURE IF EXISTS CreateUser;
DROP PROCEDURE IF EXISTS CreateBrands;
DROP PROCEDURE IF EXISTS CreateCategories;
DROP PROCEDURE IF EXISTS CreateProducts;
DROP PROCEDURE IF EXISTS CreateCategoryProduct;
DROP PROCEDURE IF EXISTS CreateShopCart;
DROP PROCEDURE IF EXISTS CreateShopCartDetail;
DROP PROCEDURE IF EXISTS CreateOrders;
DROP PROCEDURE IF EXISTS CreateOrders2;
DROP PROCEDURE IF EXISTS CreateOrderDetail;
DROP PROCEDURE IF EXISTS UpdateUserInfo;
DROP PROCEDURE IF EXISTS UpdateUserState;
DROP PROCEDURE IF EXISTS UpdateUserPassword;
DROP PROCEDURE IF EXISTS UpdateProduct;
DROP PROCEDURE IF EXISTS UpdateProductState;
DROP PROCEDURE IF EXISTS UpdateShopCartDetail
DROP PROCEDURE IF EXISTS DeleteShopCartDetail;
DROP PROCEDURE IF EXISTS DeleteProductFromShopCartDetail;
DROP PROCEDURE IF EXISTS UpdateOrderState;
DROP PROCEDURE IF EXISTS UpdateCategory;
DROP PROCEDURE IF EXISTS UpdateCategoryState;
DROP PROCEDURE IF EXISTS UpdateState;
DROP PROCEDURE IF EXISTS UpdateBrand;
DROP PROCEDURE IF EXISTS UpdateClient;
DROP TRIGGER IF EXISTS CreateOrderDetail;
DROP TRIGGER IF EXISTS CreateUserShopCart;


--Procedimiento para obtener los datos del carrito--
CREATE PROCEDURE SpecificShopCartDetails(@ShopCartId INT)
AS
BEGIN
	SELECT * FROM ShopCartRecords WHERE ShopCartId=1;
	SELECT SUM(SubTotal) as Total FROM ShopCartDetail scd WHERE ShopCartId = 1;
END;

EXEC SpecificShopCartDetails @ShopCartId = 1


--Procedimiento para insertar roles--
CREATE PROCEDURE CreateRoles(@Name VARCHAR(50))
AS
BEGIN
	INSERT INTO Roles(Name) VALUES (@Name)
END;

--Procedimiento para insertar estados--
CREATE PROCEDURE CreateStates(@Name VARCHAR(50))
AS
BEGIN
	INSERT INTO State(Name) VALUES(@Name)
	SELECT * FROM State s WHERE s.StateId=SCOPE_IDENTITY()
END;


--Procedimiento para insertar clientes--
CREATE PROCEDURE CreateClients(@CommercialName VARCHAR(100),@Adress VARCHAR(250),
@PhoneNumber VARCHAR(8),@CommercialEmail VARCHAR(100))
AS
BEGIN
	INSERT INTO Client(CommercialName,Adress,PhoneNumber,CommercialEmail)
	VALUES(@CommercialName,@Adress,@PhoneNumber,@CommercialEmail)
	SELECT * FROM Client WHERE Client.ClientId = SCOPE_IDENTITY()
END;





--Procedimiento para insertar usuarios--
CREATE PROCEDURE CreateUser(@Names VARCHAR(100),@LastNames VARCHAR(100),@Email VARCHAR(100),
@Password VARCHAR(100), @PhoneNumber VARCHAR(8), @BirthDate DATE,
@Adress VARCHAR(250), @RoleId INT, @ClientId INT = NULL)
AS
BEGIN
	INSERT INTO Users(Names,LastNames,Email,Password,PhoneNumber,BirthDate,Adress
	,RoleId,ClientId,StateId) VALUES(@Names,@LastNames,@Email,@Password,@PhoneNumber,@BirthDate,
	@Adress,@RoleId,@ClientId,1);
	SELECT u.Names,u.LastNames,u.Email,u.PhoneNumber,u.BirthDate,u.Adress, r.Name [role], c.CommercialName company, s.Name state  
	FROM Users u 
	INNER JOIN Roles r ON r.RoleId = u.RoleId
	LEFT JOIN Client c on c.ClientId = u.ClientId 
	INNER JOIN State s ON s.StateId = u.StateId 
	WHERE u.UserId = SCOPE_IDENTITY()
END;

--Procedimiento para insertar marcas--
CREATE PROCEDURE CreateBrands(@Name VARCHAR(100))
AS
BEGIN
	INSERT INTO Brand(Name) VALUES(@Name)
	SELECT * FROM Brand WHERE Brand.BrandId = SCOPE_IDENTITY()
END;

SELECT * FROM Client c 

--Procedimiento para insertar categorias--
CREATE PROCEDURE CreateCategories(@Name VARCHAR(100))
AS
BEGIN
	INSERT INTO Category(Name) VALUES(@Name);
	SELECT * FROM Category c WHERE c.CategoryId=SCOPE_IDENTITY()
END;


--Procedimiento para insertar productos
CREATE PROCEDURE CreateProducts(@Name Varchar(100),@Code VARCHAR(50),@Stock INT,
@Price FLOAT,@Image TEXT = NULL, @StateId INT,@BrandId INT)
AS
BEGIN
	INSERT INTO Product(Name,Code,Stock,Price,Image,StateId,BrandId)
	VALUES(@Name,@Code,@Stock,@Price,@Image,@StateId,@BrandId)
	
	SELECT SCOPE_IDENTITY() AS ProductId
END;

--Procedimiento para enlazar categorias y productos--
CREATE PROCEDURE CreateCategoryProduct(@ProductId INT, @CategoryId INT)
AS
BEGIN
	INSERT INTO CategoryProduct(ProductId,CategoryId) VALUES (@ProductId,@CategoryId)
END;

--Procedimiento para insertar carrito--
CREATE PROCEDURE CreateShopCart(@UserId int)
AS
BEGIN
	INSERT INTO ShopCart(UserId) VALUES(@UserId)
END;

--Procedimiento para insertar carrito detalle--
CREATE PROCEDURE CreateShopCartDetail(@Quantity INT,@Price FLOAT,@SubTotal FLOAT,
@ShopCartId INT,@ProductId INT)
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION
		IF EXISTS(SELECT 1 FROM ShopCartDetail WHERE ShopCartId = @ShopCartId AND ProductId = @ProductId )
		BEGIN
			UPDATE ShopCartDetail SET Quantity = Quantity + @Quantity, SubTotal = (Quantity + @Quantity) * Price WHERE ShopCartId = @ShopCartId AND ProductId= @ProductId;
			
			SELECT * FROM ShopCartDetail WHERE ShopCartId= @ShopCartId AND ProductId= @ProductId;
		END;
		ELSE
		BEGIN
			INSERT INTO ShopCartDetail(Quantity,Price,SubTotal,ShopCartId,ProductId)
			VALUES(@Quantity,@Price,@SubTotal,@ShopCartId,@ProductId);
			
			SELECT * FROM ShopCartDetail scd WHERE scd.ShopCartDetailId =SCOPE_IDENTITY()
		END;
		COMMIT;
	END TRY
	BEGIN CATCH
		ROLLBACK;
		THROW;
	END CATCH
	
	

END;
--Procedimiento para insertar orden--
CREATE PROCEDURE CreateOrders(@Total FLOAT, @UserId INT)
AS
BEGIN
	
	BEGIN TRY
		DECLARE @ShopCartId INT;
		SELECT @ShopCartId = idShopCart FROM ShopCart sc WHERE sc.UserId = @UserId;
	BEGIN TRANSACTION
		IF EXISTS(SELECT 1 FROM ShopCartDetail INNER JOIN Product ON Product.ProductId = ShopCartDetail.ProductId 
				  WHERE ShopCartDetail.ShopCartId = @ShopCartId AND Product.Stock < ShopCartDetail.Quantity )
		BEGIN
			SELECT * FROM ShopCartDetail INNER JOIN Product ON Product.ProductId = ShopCartDetail.ProductId 
			WHERE ShopCartDetail.ShopCartId = @ShopCartId AND Product.Stock < ShopCartDetail.Quantity;
			ROLLBACK;
		END;
		ELSE
		BEGIN
			DECLARE @OrderId INT;
			
			INSERT INTO Orders(Total,UserId,StateId) VALUES(@Total,@UserId,3);
		
			SET @OrderId = SCOPE_IDENTITY();
		
			INSERT INTO OrderDetail (OrderId,ProductId,Quantity,Price,SubTotal)
			SELECT @OrderId,ProductId, Quantity, Price, SubTotal FROM ShopCartDetail sc
			WHERE sc.ShopCartId = @ShopCartId;
		
			UPDATE Product SET Product.Stock = Product.Stock - ShopCartDetail.Quantity 
			FROM Product INNER JOIN ShopCartDetail ON ShopCartDetail.ShopCartId = @ShopCartId
			WHERE ShopCartDetail.ProductId = Product.ProductId
		
	
			DELETE FROM ShopCartDetail WHERE ShopCartId=@ShopCartId;
			COMMIT;
		END;
	END TRY
	BEGIN CATCH
	ROLLBACK;
	THROW;
	END CATCH;

	
END;


--Procedimiento para insertar orden SOLO PARA CONSULTA DE PRUEBA DE LOS REQUISITOS--
CREATE PROCEDURE CreateOrders2(@Total FLOAT, @UserId INT, @StateId INT, @CreationDate DATETIME)
AS
BEGIN
	INSERT INTO Orders(Total,UserId,StateId,CreationDate) VALUES(@Total,@UserId,@StateId,@CreationDate)
END;

--Procedimiento para actualizar un estado--
CREATE PROCEDURE UpdateState(@StateId INT, @Name VARCHAR(50))
AS
BEGIN
	UPDATE State SET Name=@Name WHERE State.StateId=@StateId; 
	SELECT * FROM State s WHERE s.StateId=@StateId;
END;

--Procedimiento para actualizar una marca--
CREATE PROCEDURE UpdateBrand(@BrandId INT,@Name VARCHAR(100))
AS
BEGIN
	UPDATE Brand SET Name=@Name WHERE Brand.BrandId = @BrandId;
	SELECT * FROM Brand WHERE Brand.BrandId = @BrandId;
END;

--Procedimiento para actualizar un cliente--
CREATE PROCEDURE UpdateClient(@ClientId INT,
@CommercialName VARCHAR(100),
@Adress VARCHAR(250),
@PhoneNumber VARCHAR(8),
@CommercialEmail VARCHAR(100))
AS
BEGIN
	UPDATE Client SET CommercialName=@CommercialName, Adress=@Adress, PhoneNumber=@PhoneNumber, CommercialEmail=@CommercialEmail WHERE Client.ClientId = @ClientId;
	SELECT * FROM Client WHERE Client.ClientId = @ClientId;
END;



SELECT * FROM State s 

--Procedimiento para actualizar los usuarios--
CREATE PROCEDURE UpdateUserInfo
    @UserId INT,
    @Names VARCHAR(100),
    @LastNames VARCHAR(100),
    @Email VARCHAR(100),
    @PhoneNumber VARCHAR(8),
    @Adress VARCHAR(250),
    @RoleId INT,
    @ClientId INT
    
AS
BEGIN
    UPDATE Users
    SET 
        Names = @Names,
        LastNames = @LastNames,
        Email = @Email,
        PhoneNumber = @PhoneNumber,
        Adress = @Adress,
        RoleId = @RoleId,
        ClientId = @ClientId
        WHERE UserId = @UserId;
       
  SELECT u.Names, u.LastNames, u.Email, u.PhoneNumber, u.Adress, r.Name as [role], s.Name as state, c.CommercialName as company FROM Users u 
	INNER JOIN Roles r on u.RoleId = r.RoleId 
  INNER JOIN State s ON u.StateId = s.StateId
  LEFT JOIN Client c ON c.ClientId = u.ClientId 
  WHERE u.UserId = @UserId;
END;




--Procedimiento para activar o desactivar un usuario--
CREATE PROCEDURE UpdateUserState
    @UserId INT,
    @StateId INT
AS
BEGIN
    UPDATE Users
    SET 
        StateId = @StateId
    WHERE UserId = @UserId;
    SELECT u.Names, u.LastNames, u.Email, u.PhoneNumber, u.Adress, r.Name as 'role', s.Name as state, c.CommercialName as company FROM Users u 
	INNER JOIN Roles r on u.RoleId = r.RoleId 
  	INNER JOIN State s ON u.StateId = s.StateId
  	LEFT JOIN Client c ON c.ClientId = u.ClientId 
  	WHERE u.UserId = @UserId;
END;

--Procedimiento para actualizar contraseña de usuario--
CREATE PROCEDURE UpdateUserPassword(@UserId INT, @UserPassword VARCHAR(600))
AS
BEGIN
	UPDATE Users SET Users.Password = @UserPassword WHERE Users.UserId = @UserId;
 	SELECT u.Names, u.LastNames, u.Email, u.PhoneNumber, u.Adress, r.Name as 'role', s.Name as state, c.CommercialName as company FROM Users u 
	INNER JOIN Roles r on u.RoleId = r.RoleId 
  	INNER JOIN State s ON u.StateId = s.StateId
  	LEFT JOIN Client c ON c.ClientId = u.ClientId 
  	WHERE u.UserId = @UserId;
END;

SELECT * FROM Users u 

--Procedimiento para cambiar contraseña de usuario--
CREATE PROCEDURE

--Procedimiento para actualizar los productos--
CREATE PROCEDURE UpdateProduct(
    @ProductId INT,
    @Name VARCHAR(100),
    @Code VARCHAR(50),
    @Stock INT,
    @Price FLOAT,
    @StateId INT,
    @Image TEXT,
    @BrandId INT)
AS
BEGIN
    UPDATE Product
    SET
        Name = @Name,
        Code = @Code,
        Stock = @Stock,
        Price = @Price,
        Image = @Image,
        StateId = @StateId,
        BrandId = @BrandId,
        UpdateDate = GETDATE()
    WHERE ProductId = @ProductId;
END;

--Procedimiento para activar o desactivar un producto--
CREATE PROCEDURE UpdateProductState
    @ProductId INT,
    @StateId INT
AS
BEGIN
    UPDATE Product
    SET 
        StateId = @StateId,
        UpdateDate = GETDATE()  
    WHERE ProductId = @ProductId;
END;

--Procedimiento para editar un producto en el carrito--
CREATE PROCEDURE UpdateShopCartDetail (@Quantity INT, @Price FLOAT, @SubTotal FLOAT, @ShopCartId INT, @ProductId INT, @ShopCartDetailId INT)
AS
BEGIN
	UPDATE ShopCartDetail SET 
	Quantity = @Quantity, Price = @Price, SubTotal = @SubTotal 
	WHERE ShopCartDetail.ProductId = @ProductId AND ShopCartDetail.ShopCartId = @ShopCartId AND ShopCartDetail.ShopCartDetailId = @ShopCartDetailId;
	
		SELECT * FROM ShopCartRecords WHERE ShopCartId=@ShopCartId;

END;


--Procedimiento para eliminar carrito de compras--
CREATE PROCEDURE DeleteShopCartDetail
    @ShopCartId INT
AS
BEGIN
    DELETE FROM ShopCartDetail
    WHERE ShopCartId = @ShopCartId;
   
END;



--Procedimiento para eliminar un producto del carrito--
CREATE PROCEDURE DeleteProductFromShopCartDetail
    @ProductId INT,
    @ShopCartId INT
AS
BEGIN
       SELECT * FROM ShopCartDetail WHERE ProductId = @ProductId AND ShopCartId = @ShopCartId
	DELETE FROM ShopCartDetail
    WHERE ProductId = @ProductId AND ShopCartId = @ShopCartId;
END;


--Procedimiento para actualizar el estado de la orden--
CREATE PROCEDURE UpdateOrderState
    @OrderId INT,
    @StateId INT
AS
BEGIN
    UPDATE Orders
    SET StateId = @StateId
    WHERE OrderId = @OrderId;
   	SELECT OrderId,Total,CreationDate,StateId FROM Orders WHERE Orders.OrderId = @OrderId
END;

--Procedimiento para actualizar categoria--
CREATE PROCEDURE UpdateCategory
    @CategoryId INT,
    @Name VARCHAR(100)
AS
BEGIN
    UPDATE Category
    SET 
        Name = @Name
    WHERE CategoryId = @CategoryId;
   SELECT * FROM Category c WHERE c.CategoryId=@CategoryId
END;
--Procedimiento para activar o desactivar una categoria--
CREATE PROCEDURE UpdateCategoryState
    @CategoryId INT,
    @StateId INT
AS
BEGIN
    UPDATE Category
    SET 
        StateId = @StateId
    WHERE CategoryId = @CategoryId;
   
   UPDATE Product 
   SET StateId = @StateId, UpdateDate = GETDATE() 
   FROM Product 
   INNER JOIN CategoryProduct ON CategoryProduct.ProductId = Product.ProductId 
   WHERE CategoryProduct.CategoryId = @CategoryId
   
   SELECT * FROM Category c WHERE c.CategoryId = @CategoryId
END;




SELECT * FROM ShopCartDetail scd 

--Trigger para la tabla Orders para insertar los registros en OrderDetail--
CREATE PROCEDURE CreateOrderDetail(@Total FLOAT, @UserId INT)
AS
BEGIN
	BEGIN TRY
		DECLARE @ShopCartId INT;
		SELECT @ShopCartId = idShopCart FROM ShopCart sc WHERE sc.UserId = @UserId;
	BEGIN TRANSACTION
		IF EXISTS(SELECT 1 FROM ShopCartDetail INNER JOIN Product ON Product.ProductId = ShopCartDetail.ProductId 
				  WHERE ShopCartDetail.ShopCartId = @ShopCartId AND Product.Stock < ShopCartDetail.Quantity )
		BEGIN
			SELECT * FROM ShopCartDetail INNER JOIN Product ON Product.ProductId = ShopCartDetail.ProductId 
			WHERE ShopCartDetail.ShopCartId = @ShopCartId AND Product.Stock < ShopCartDetail.Quantity;
			ROLLBACK;
		END;
		ELSE
		BEGIN
			DECLARE @OrderId INT;
			
			INSERT INTO Orders(Total,UserId) VALUES(@Total,@UserId);
		
			SET @OrderId = SCOPE_IDENTITY();
		
			INSERT INTO OrderDetail (OrderId,ProductId,Quantity,Price,SubTotal)
			SELECT @OrderId,ProductId, Quantity, Price, SubTotal FROM ShopCartDetail sc
			WHERE sc.ShopCartId = @ShopCartId;
		
			UPDATE Product SET Product.Stock = Product.Stock - ShopCartDetail.Quantity 
			FROM Product INNER JOIN ShopCartDetail ON ShopCartDetail.ShopCartId = @ShopCartId
			WHERE ShopCartDetail.ProductId = Product.ProductId
		
	
			DELETE FROM ShopCartDetail WHERE ShopCartId=@ShopCartId;
			COMMIT;
		END;
	END TRY
	BEGIN CATCH
	ROLLBACK;
	THROW;
	END CATCH;

		
		
END;

CREATE TRIGGER CreateOrderDetail
ON Orders FOR INSERT 
AS
BEGIN
	DECLARE @ShopCartId INT;
	DECLARE @UserId INT;
	DECLARE @OrderId INT;
	
	SELECT @UserId = UserId, @OrderId = OrderId FROM inserted;
	SELECT @ShopCartId = idShopCart FROM ShopCart sc WHERE sc.UserId = @UserId;
	
	INSERT INTO OrderDetail (OrderId,ProductId,Quantity,Price,SubTotal)
	SELECT @OrderId,ProductId, Quantity, Price, SubTotal FROM ShopCartDetail sc
	WHERE sc.ShopCartId = @ShopCartId;
	
	UPDATE Product SET Product.Stock = Product.Stock - ShopCartDetail.Quantity 
	FROM Product INNER JOIN ShopCartDetail ON ShopCartDetail.ShopCartId = @ShopCartId
	WHERE ShopCartDetail.ProductId = Product.ProductId AND Product.Stock >= ShopCartDetail.Quantity;
		
	
	DELETE FROM ShopCartDetail WHERE ShopCartId=@ShopCartId;
END;


--Trigger para crear el carrito del usuario al crearlo--
CREATE TRIGGER CreateUserShopCart
ON Users FOR INSERT
AS
BEGIN
	DECLARE @UserId INT
	SELECT @UserId = UserId FROM inserted;
	
	EXEC CreateShopCart @UserId
END;






SELECT * FROM Users
SELECT * FROM ShopCart sc 
SELECT * FROM ShopCartDetail scd 
SELECT * FROM OrderDetail od 
SELECT * FROM Orders o 
SELECT * FROM Product p 

SELECT SUM(SubTotal) FROM ShopCartDetail scd 





CREATE VIEW ProductsWithStock
AS
	SELECT COUNT(*) AS PRODUCTS FROM Product p WHERE p.StateId = 1 AND p.Stock > 0;


CREATE VIEW OrdersAugust2024
AS
	SELECT SUM(o.Total) as TOTAL FROM Orders o WHERE MONTH(o.CreationDate) = 8 AND YEAR(o.CreationDate) = 2024;

CREATE VIEW Top10Consumers
AS
	SELECT TOP 10 u.Names, u.LastNames, o.Total FROM Users u INNER JOIN Orders o ON u.UserId = o.UserId 
	ORDER BY o.Total DESC;

CREATE VIEW Top10Products
AS
	SELECT TOP 10 p.Name, SUM(od.Quantity) AS TOTAL FROM OrderDetail od INNER JOIN Product p ON p.ProductId = od.ProductId 
	GROUP BY p.Name ORDER BY SUM(od.Quantity) ASC;

CREATE VIEW ShopCartRecords
AS
SELECT Quantity,Price,SubTotal,ShopCartId,ProductId FROM ShopCartDetail

CREATE VIEW ShowOrderDetail
AS
SELECT OrderId,ProductId,Quantity,Price,SubTotal FROM OrderDetail

SELECT * FROM ShowOrderDetail WHERE OrderId=1




DROP VIEW ShopCartRecords;
DROP VIEW ShowOrderDetail; 

SELECT * FROM ProductsWithStock pws;
SELECT * FROM OrdersAugust2024 oa;
SELECT * FROM Top10Consumers;
SELECT * FROM Top10Products;

EXEC CreateRoles @Name = 'Cliente';
EXEC CreateRoles @Name = 'Operador';

SELECT * FROM Roles r;

EXEC CreateStates @Name = 'Activo'; 
EXEC CreateStates @Name = 'Inactivo'; 
EXEC CreateStates @Name = 'Confirmada';
EXEC CreateStates @Name = 'Entregada';
EXEC CreateStates @Name = 'Cancelada'; 

SELECT * FROM State s;

EXEC CreateClients @CommercialName = 'Comercial ABC', @Adress = 'Calle Ficticia 123, Ciudad X', @PhoneNumber = '12345678', @CommercialEmail = 'contacto@comercialabc.com';
EXEC CreateClients @CommercialName = 'Comercial XYZ', @Adress = 'Avenida Principal 456, Ciudad Y', @PhoneNumber = '23456789', @CommercialEmail = 'info@comercialxyz.com';
EXEC CreateClients @CommercialName = 'Distribuidora El Sol', @Adress = 'Calle Sol 789, Ciudad Z', @PhoneNumber = '34567890', @CommercialEmail = 'ventas@distribuidoraelsol.com';
EXEC CreateClients @CommercialName = 'Productos Innovadores', @Adress = 'Calle Nueva 101, Ciudad W', @PhoneNumber = '45678901', @CommercialEmail = 'contacto@productosinnovadores.com';
EXEC CreateClients @CommercialName = 'Supermarket 360', @Adress = 'Avenida 360 202, Ciudad V', @PhoneNumber = '56789012', @CommercialEmail = 'info@supermarket360.com';
EXEC CreateClients @CommercialName = 'Tecnología Avanzada', @Adress = 'Calle Tecnológica 303, Ciudad U', @PhoneNumber = '67890123', @CommercialEmail = 'soporte@tecnologiaavanzada.com';
EXEC CreateClients @CommercialName = 'Fábrica ABC', @Adress = 'Zona Industrial 404, Ciudad T', @PhoneNumber = '78901234', @CommercialEmail = 'ventas@fabricaabc.com';
EXEC CreateClients @CommercialName = 'Automóviles Premium', @Adress = 'Carretera 505, Ciudad S', @PhoneNumber = '89012345', @CommercialEmail = 'contacto@automovilespremium.com';
EXEC CreateClients @CommercialName = 'Tienda Digital', @Adress = 'Centro Comercial 606, Ciudad R', @PhoneNumber = '90123456', @CommercialEmail = 'info@tiendadigital.com';
EXEC CreateClients @CommercialName = 'Electrodomésticos Modernos', @Adress = 'Calle Eléctrica 707, Ciudad Q', @PhoneNumber = '01234567', @CommercialEmail = 'soporte@electrodomesticosmodernos.com';
EXEC CreateClients @CommercialName = 'Ropa y Moda', @Adress = 'Avenida del Estilo 808, Ciudad P', @PhoneNumber = '12345678', @CommercialEmail = 'ventas@ropaymoda.com';
EXEC CreateClients @CommercialName = 'Restaurantes Deliciosos', @Adress = 'Plaza Gastronómica 909, Ciudad O', @PhoneNumber = '23456789', @CommercialEmail = 'reservas@restaurantesdeliciosos.com';
EXEC CreateClients @CommercialName = 'Construcciones A1', @Adress = 'Calle Construcción 1010, Ciudad N', @PhoneNumber = '34567890', @CommercialEmail = 'contacto@construccionesa1.com';
EXEC CreateClients @CommercialName = 'Librería El Saber', @Adress = 'Calle Libro 1111, Ciudad M', @PhoneNumber = '45678901', @CommercialEmail = 'info@libreriaelsaber.com';
EXEC CreateClients @CommercialName = 'Juguetes Fantásticos', @Adress = 'Avenida Juguetes 1212, Ciudad L', @PhoneNumber = '56789012', @CommercialEmail = 'ventas@juguetesfantasticos.com';

SELECT * FROM Client c;

-- Insertar 15 registros de usuarios utilizando el procedimiento CreateUser
EXEC CreateUser @Names = 'Juan', @LastNames = 'Pérez', @Email = 'juan.perez@email.com', @Password = 'password123', @PhoneNumber = '12345678', @BirthDate = '1985-03-12', @Adress = 'Calle Ficticia 123, Ciudad X', @RoleId = 1, @ClientId = 1, @StateId = 1;
EXEC CreateUser @Names = 'Ana', @LastNames = 'González', @Email = 'ana.gonzalez@email.com', @Password = 'password123', @PhoneNumber = '23456789', @BirthDate = '1990-07-15', @Adress = 'Avenida Principal 456, Ciudad Y', @RoleId = 2, @ClientId = NULL, @StateId = 1;
EXEC CreateUser @Names = 'Carlos', @LastNames = 'Rodríguez', @Email = 'carlos.rodriguez@email.com', @Password = 'password123', @PhoneNumber = '34567890', @BirthDate = '1980-05-21', @Adress = 'Calle Sol 789, Ciudad Z', @RoleId = 1, @ClientId = 2, @StateId = 2;
EXEC CreateUser @Names = 'María', @LastNames = 'López', @Email = 'maria.lopez@email.com', @Password = 'password123', @PhoneNumber = '45678901', @BirthDate = '1995-02-18', @Adress = 'Calle Nueva 101, Ciudad W', @RoleId = 2, @ClientId = NULL, @StateId = 1;
EXEC CreateUser @Names = 'Pedro', @LastNames = 'Sánchez', @Email = 'pedro.sanchez@email.com', @Password = 'password123', @PhoneNumber = '56789012', @BirthDate = '1987-11-30', @Adress = 'Avenida 360 202, Ciudad V', @RoleId = 1, @ClientId = 3, @StateId = 2;
EXEC CreateUser @Names = 'Lucía', @LastNames = 'Mendoza', @Email = 'lucia.mendoza@email.com', @Password = 'password123', @PhoneNumber = '67890123', @BirthDate = '2000-09-10', @Adress = 'Calle Tecnológica 303, Ciudad U', @RoleId = 2, @ClientId = NULL, @StateId = 1;
EXEC CreateUser @Names = 'Miguel', @LastNames = 'Fernández', @Email = 'miguel.fernandez@email.com', @Password = 'password123', @PhoneNumber = '78901234', @BirthDate = '1988-01-05', @Adress = 'Zona Industrial 404, Ciudad T', @RoleId = 1, @ClientId = 4, @StateId = 2;
EXEC CreateUser @Names = 'Elena', @LastNames = 'Vázquez', @Email = 'elena.vazquez@email.com', @Password = 'password123', @PhoneNumber = '89012345', @BirthDate = '1992-06-25', @Adress = 'Carretera 505, Ciudad S', @RoleId = 2, @ClientId = NULL, @StateId = 1;
EXEC CreateUser @Names = 'Andrés', @LastNames = 'Moreno', @Email = 'andres.moreno@email.com', @Password = 'password123', @PhoneNumber = '90123456', @BirthDate = '1975-12-01', @Adress = 'Centro Comercial 606, Ciudad R', @RoleId = 1, @ClientId = 5, @StateId = 1;
EXEC CreateUser @Names = 'Carmen', @LastNames = 'Ramírez', @Email = 'carmen.ramirez@email.com', @Password = 'password123', @PhoneNumber = '01234567', @BirthDate = '1993-10-10', @Adress = 'Calle Eléctrica 707, Ciudad Q', @RoleId = 2, @ClientId = NULL, @StateId = 1;
EXEC CreateUser @Names = 'José', @LastNames = 'Hernández', @Email = 'jose.hernandez@email.com', @Password = 'password123', @PhoneNumber = '12345678', @BirthDate = '1986-04-23', @Adress = 'Avenida del Estilo 808, Ciudad P', @RoleId = 1, @ClientId = 6, @StateId = 2;
EXEC CreateUser @Names = 'Raúl', @LastNames = 'Jiménez', @Email = 'raul.jimenez@email.com', @Password = 'password123', @PhoneNumber = '23456789', @BirthDate = '1991-08-19', @Adress = 'Plaza Gastronómica 909, Ciudad O', @RoleId = 2, @ClientId = NULL, @StateId = 1;
EXEC CreateUser @Names = 'Isabel', @LastNames = 'Álvarez', @Email = 'isabel.alvarez@email.com', @Password = 'password123', @PhoneNumber = '34567890', @BirthDate = '1983-11-17', @Adress = 'Calle Construcción 1010, Ciudad N', @RoleId = 1, @ClientId = 7, @StateId = 2;
EXEC CreateUser @Names = 'Antonio', @LastNames = 'Gómez', @Email = 'antonio.gomez@email.com', @Password = 'password123', @PhoneNumber = '45678901', @BirthDate = '1982-03-28', @Adress = 'Calle Libro 1111, Ciudad M', @RoleId = 2, @ClientId = NULL, @StateId = 1;

SELECT * FROM Users u;

-- Insertar 15 registros en la tabla Brand utilizando el procedimiento CreateBrands
EXEC CreateBrands @Name = 'Nike';
EXEC CreateBrands @Name = 'Adidas';
EXEC CreateBrands @Name = 'Puma';
EXEC CreateBrands @Name = 'Reebok';
EXEC CreateBrands @Name = 'Under Armour';
EXEC CreateBrands @Name = 'New Balance';
EXEC CreateBrands @Name = 'Converse';
EXEC CreateBrands @Name = 'Vans';
EXEC CreateBrands @Name = 'Skechers';
EXEC CreateBrands @Name = 'Asics';
EXEC CreateBrands @Name = 'Fila';
EXEC CreateBrands @Name = 'Champion';
EXEC CreateBrands @Name = 'Jordan';
EXEC CreateBrands @Name = 'The North Face';
EXEC CreateBrands @Name = 'Columbia';

SELECT * FROM Brand b;

-- Insertar 15 registros en la tabla Category utilizando el procedimiento CreateCategories
EXEC CreateCategories @Name = 'Ropa Deportiva';
EXEC CreateCategories @Name = 'Calzado Deportivo';
EXEC CreateCategories @Name = 'Accesorios';
EXEC CreateCategories @Name = 'Electrónica';
EXEC CreateCategories @Name = 'Hogar';
EXEC CreateCategories @Name = 'Muebles';
EXEC CreateCategories @Name = 'Juguetes';
EXEC CreateCategories @Name = 'Salud y Belleza';
EXEC CreateCategories @Name = 'Alimentos y Bebidas';
EXEC CreateCategories @Name = 'Tecnología';
EXEC CreateCategories @Name = 'Ropa Casual';
EXEC CreateCategories @Name = 'Bolsos y Carteras';
EXEC CreateCategories @Name = 'Ropa Infantil';
EXEC CreateCategories @Name = 'Productos para Mascotas';
EXEC CreateCategories @Name = 'Joyería y Relojes';

SELECT * FROM Category c;

-- Insertar 15 registros adicionales en la tabla Product utilizando el procedimiento CreateProducts
EXEC CreateProducts @Name = 'Nike Air Zoom', @Code = 'NA567', @Stock = 80, @Price = 110.00, @Image = NULL, @StateId = 1, @BrandId = 1;
EXEC CreateProducts @Name = 'Adidas NMD', @Code = 'AN123', @Stock = 60, @Price = 130.00, @Image = NULL, @StateId = 1, @BrandId = 2;
EXEC CreateProducts @Name = 'Puma RS-X', @Code = 'PR456', @Stock = 45, @Price = 90.00, @Image = NULL, @StateId = 1, @BrandId = 3;
EXEC CreateProducts @Name = 'Reebok Nano', @Code = 'RN789', @Stock = 50, @Price = 100.00, @Image = NULL, @StateId = 1, @BrandId = 4;
EXEC CreateProducts @Name = 'Under Armour Hovr', @Code = 'UA654', @Stock = 30, @Price = 180.00, @Image = NULL, @StateId = 1, @BrandId = 5;
EXEC CreateProducts @Name = 'New Balance 574', @Code = 'NB321', @Stock = 40, @Price = 120.00, @Image = NULL, @StateId = 1, @BrandId = 6;
EXEC CreateProducts @Name = 'Converse One Star', @Code = 'COS987', @Stock = 55, @Price = 65.00, @Image = NULL, @StateId = 1, @BrandId = 7;
EXEC CreateProducts @Name = 'Vans Sk8-Hi', @Code = 'VS432', @Stock = 60, @Price = 85.00, @Image = NULL, @StateId = 1, @BrandId = 8;
EXEC CreateProducts @Name = 'Skechers Go Walk', @Code = 'SG654', @Stock = 25, @Price = 55.00, @Image = NULL, @StateId = 1, @BrandId = 9;
EXEC CreateProducts @Name = 'Asics Gel Nimbus', @Code = 'AG321', @Stock = 20, @Price = 140.00, @Image = NULL, @StateId = 1, @BrandId = 10;
EXEC CreateProducts @Name = 'Fila Ray Tracer', @Code = 'FR789', @Stock = 30, @Price = 80.00, @Image = NULL, @StateId = 1, @BrandId = 11;
EXEC CreateProducts @Name = 'Champion Powerblend', @Code = 'CP123', @Stock = 50, @Price = 55.00, @Image = NULL, @StateId = 1, @BrandId = 12;
EXEC CreateProducts @Name = 'Jordan 4 Retro', @Code = 'JR567', @Stock = 15, @Price = 220.00, @Image = NULL, @StateId = 1, @BrandId = 13;
EXEC CreateProducts @Name = 'The North Face Backback', @Code = 'TNF456', @Stock = 35, @Price = 150.00, @Image = NULL, @StateId = 1, @BrandId = 14;
EXEC CreateProducts @Name = 'Columbia Sportswear Hat', @Code = 'CH987', @Stock = 60, @Price = 40.00, @Image = NULL, @StateId = 1, @BrandId = 15;

SELECT * FROM Product p;
SELECT * FROM ShopCart sc 
SELECT * FROM Product p inner join CategoryProduct cp on cp.ProductId = p.ProductId 
inner join Category c on c.CategoryId =cp.CategoryId 

EXEC CreateCategoryProduct @ProductId = 1, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 1, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 2, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 2, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 3, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 3, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 4, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 4, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 5, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 5, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 6, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 6, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 7, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 7, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 8, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 8, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 9, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 9, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 10, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 10, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 11, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 11, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 12, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 12, @CategoryId = 11; -- Ropa Casual
EXEC CreateCategoryProduct @ProductId = 13, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 13, @CategoryId = 11; -- Ropa Casual
EXEC CreateCategoryProduct @ProductId = 14, @CategoryId = 1; -- Ropa Deportiva
EXEC CreateCategoryProduct @ProductId = 14, @CategoryId = 4; -- Electrónica
EXEC CreateCategoryProduct @ProductId = 15, @CategoryId = 2; -- Calzado Deportivo
EXEC CreateCategoryProduct @ProductId = 15, @CategoryId = 1; -- Ropa Deportiva

SELECT * FROM CategoryProduct cp;

EXEC CreateShopCartDetail @Quantity = 2, @Price = 110.00, @SubTotal = 220.00, @ShopCartId = 1, @ProductId = 1;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 130.00, @SubTotal = 130.00, @ShopCartId = 1, @ProductId = 2;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 90.00, @SubTotal = 270.00, @ShopCartId = 1, @ProductId = 3;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 100.00, @SubTotal = 100.00, @ShopCartId = 1, @ProductId = 4;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 180.00, @SubTotal = 360.00, @ShopCartId = 1, @ProductId = 5;
EXEC CreateShopCartDetail @Quantity = 4, @Price = 120.00, @SubTotal = 480.00, @ShopCartId = 1, @ProductId = 6;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 65.00, @SubTotal = 65.00, @ShopCartId = 1, @ProductId = 7;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 85.00, @SubTotal = 255.00, @ShopCartId = 1, @ProductId = 8;
EXEC CreateShopCartDetail @Quantity = 5, @Price = 55.00, @SubTotal = 275.00, @ShopCartId = 1, @ProductId = 9;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 140.00, @SubTotal = 140.00, @ShopCartId = 1, @ProductId = 10;

SELECT * FROM ShopCartDetail scd;

-- CONSULTA SOLO PARA PRUEBA DE LA CONSULTA DE AGOSTO 2024--
EXEC CreateShopCartDetail @Quantity = 3, @Price = 110.00, @SubTotal = 330.00, @ShopCartId = 2, @ProductId = 1;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 130.00, @SubTotal = 260.00, @ShopCartId = 2, @ProductId = 2;
EXEC CreateShopCartDetail @Quantity = 5, @Price = 90.00, @SubTotal = 450.00, @ShopCartId = 2, @ProductId = 3;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 100.00, @SubTotal = 200.00, @ShopCartId = 2, @ProductId = 4;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 180.00, @SubTotal = 540.00, @ShopCartId = 2, @ProductId = 5;
EXEC CreateShopCartDetail @Quantity = 6, @Price = 120.00, @SubTotal = 720.00, @ShopCartId = 2, @ProductId = 6;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 65.00, @SubTotal = 130.00, @ShopCartId = 2, @ProductId = 7;
EXEC CreateShopCartDetail @Quantity = 4, @Price = 85.00, @SubTotal = 340.00, @ShopCartId = 2, @ProductId = 8;
EXEC CreateShopCartDetail @Quantity = 6, @Price = 55.00, @SubTotal = 330.00, @ShopCartId = 2, @ProductId = 9;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 140.00, @SubTotal = 280.00, @ShopCartId = 2, @ProductId = 10;

SELECT * FROM ShopCartDetail scd;


EXEC CreateOrders @Total=2295.0, @UserId=1, @StateId=5

--Se crea la orden y posteriormente se crea el detalle de la misma. De igual forma se edita el stock de productos--
SELECT * FROM Orders o;
SELECT * FROM OrderDetail od;
SELECT * FROM Product p;

--PRUEBA SOLO PARA LA CONSULTA DE AGOSTO 2024--
EXEC CreateOrders2 @Total = 3580.0, @UserId = 2, @StateId = 5, @CreationDate = '2024-08-15 14:30:00';
SELECT * FROM Orders o;
SELECT * FROM OrderDetail od;
SELECT * FROM Product p;

--ACTUALIZAR USUARIO--
SELECT * FROM Users u;
EXEC UpdateUserInfo 
    @UserId = 1, 
    @Names = 'Juan', 
    @LastNames = 'Pérez', 
    @Email = 'juan.perez@email.com', 
    @Password = 'newpassword123', 
    @PhoneNumber = '12345678', 
    @BirthDate = '1985-03-12', 
    @Adress = 'Calle Ficticia 123, Ciudad X', 
    @RoleId = 1, 
    @ClientId = 1, 
    @StateId = 1;

   EXEC UpdateUserInfo 
    @UserId = 2, 
    @Names = 'Ana', 
    @LastNames = 'González', 
    @Email = 'ana.gonzalez@email.com', 
    @Password = 'newpassword123', 
    @PhoneNumber = '23456789', 
    @BirthDate = '1990-07-15', 
    @Adress = 'Avenida Principal 456, Ciudad Y', 
    @RoleId = 2, 
    @ClientId = NULL, 
    @StateId = 1;

   EXEC UpdateUserInfo 
    @UserId = 3, 
    @Names = 'Carlos', 
    @LastNames = 'Rodríguez', 
    @Email = 'carlos.rodriguez@email.com', 
    @Password = 'newpassword123', 
    @PhoneNumber = '34567890', 
    @BirthDate = '1980-05-21', 
    @Adress = 'Calle Sol 789, Ciudad Z', 
    @RoleId = 1, 
    @ClientId = 2, 
    @StateId = 2;
   
SELECT * FROM Users u;
   
--ACTUALIZAR ESTADO DE USUARIOS--
SELECT * FROM Users u;

   EXEC UpdateUserState 
    @UserId = 1, 
    @StateId = 2; 

    EXEC UpdateUserState 
    @UserId = 2, 
    @StateId = 1; 
   
   EXEC UpdateUserState 
    @UserId = 3, 
    @StateId = 2; 
   
SELECT * FROM Users u;
SELECT * FROM ShopCart sc 
--ACTUALIZAR PRODUCTOS--
SELECT * FROM Product p;
   EXEC UpdateProduct 
    @ProductId = 1, 
    @Stock = 100, 
    @Price = 115.00, 
    @StateId = 2;

   EXEC UpdateProduct 
    @ProductId = 2, 
    @Price = 125.00, 
    @BrandId = 6, 
    @StateId = 2;

   EXEC UpdateProduct 
    @ProductId = 3, 
    @Stock = 50, 
    @Price = 95.00, 
    @StateId = 1;
   
SELECT * FROM Product p WHERE p.StateId = 2;

--ACTUALIZAR ESTADO PRODUCTOS--
SELECT * FROM Product p;
   EXEC UpdateProductState 
    @ProductId = 1, 
    @StateId = 1;

   EXEC UpdateProductState 
    @ProductId = 2, 
    @StateId = 1;

   EXEC UpdateProductState 
    @ProductId = 3, 
    @StateId = 2;
   
SELECT * FROM Product p;
SELECT * FROM State s 
--ELIMINAR CARRITO DE COMPRAS--
--PRIMERO EJECUTA ESTOS PROCEDIMIENTOS PARA LLENAR UN CARRITO--
EXEC CreateShopCartDetail @Quantity = 2, @Price = 110.00, @SubTotal = 220.00, @ShopCartId = 1, @ProductId = 1;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 130.00, @SubTotal = 130.00, @ShopCartId = 1, @ProductId = 2;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 90.00, @SubTotal = 270.00, @ShopCartId = 1, @ProductId = 3;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 100.00, @SubTotal = 100.00, @ShopCartId = 1, @ProductId = 4;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 180.00, @SubTotal = 360.00, @ShopCartId = 1, @ProductId = 5;
EXEC CreateShopCartDetail @Quantity = 4, @Price = 120.00, @SubTotal = 480.00, @ShopCartId = 1, @ProductId = 6;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 65.00, @SubTotal = 65.00, @ShopCartId = 1, @ProductId = 7;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 85.00, @SubTotal = 255.00, @ShopCartId = 1, @ProductId = 8;
EXEC CreateShopCartDetail @Quantity = 5, @Price = 55.00, @SubTotal = 275.00, @ShopCartId = 1, @ProductId = 9;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 140.00, @SubTotal = 140.00, @ShopCartId = 1, @ProductId = 10;

SELECT * FROM ShopCartDetail scd;

--AHORA SI PUEDES BORRAR EL CARRITO SI GUSTAS--
   EXEC DeleteShopCartDetail 
    @ShopCartId = 1;
   
--CREA PRIMERO EL CARRITO--
EXEC CreateShopCartDetail @Quantity = 3, @Price = 110.00, @SubTotal = 330.00, @ShopCartId = 2, @ProductId = 1;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 130.00, @SubTotal = 260.00, @ShopCartId = 2, @ProductId = 2;
EXEC CreateShopCartDetail @Quantity = 5, @Price = 90.00, @SubTotal = 450.00, @ShopCartId = 2, @ProductId = 3;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 100.00, @SubTotal = 200.00, @ShopCartId = 2, @ProductId = 4;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 180.00, @SubTotal = 540.00, @ShopCartId = 2, @ProductId = 5;
EXEC CreateShopCartDetail @Quantity = 6, @Price = 120.00, @SubTotal = 720.00, @ShopCartId = 2, @ProductId = 6;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 65.00, @SubTotal = 130.00, @ShopCartId = 2, @ProductId = 7;
EXEC CreateShopCartDetail @Quantity = 4, @Price = 85.00, @SubTotal = 340.00, @ShopCartId = 2, @ProductId = 8;
EXEC CreateShopCartDetail @Quantity = 6, @Price = 55.00, @SubTotal = 330.00, @ShopCartId = 2, @ProductId = 9;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 140.00, @SubTotal = 280.00, @ShopCartId = 2, @ProductId = 10;

--AHORA SI PUEDES BORRARLO--
   
   EXEC DeleteShopCartDetail 
    @ShopCartId = 2;
   
SELECT * FROM ShopCartDetail scd;

--ELIMINAR UN PRODUCTO DEL CARRITO--
--PRIMERO CREA EL CARRITO--
EXEC CreateShopCartDetail @Quantity = 2, @Price = 110.00, @SubTotal = 220.00, @ShopCartId = 1, @ProductId = 1;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 130.00, @SubTotal = 130.00, @ShopCartId = 1, @ProductId = 2;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 90.00, @SubTotal = 270.00, @ShopCartId = 1, @ProductId = 3;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 100.00, @SubTotal = 100.00, @ShopCartId = 1, @ProductId = 4;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 180.00, @SubTotal = 360.00, @ShopCartId = 1, @ProductId = 5;
EXEC CreateShopCartDetail @Quantity = 4, @Price = 120.00, @SubTotal = 480.00, @ShopCartId = 1, @ProductId = 6;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 65.00, @SubTotal = 65.00, @ShopCartId = 1, @ProductId = 7;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 85.00, @SubTotal = 255.00, @ShopCartId = 1, @ProductId = 8;
EXEC CreateShopCartDetail @Quantity = 5, @Price = 55.00, @SubTotal = 275.00, @ShopCartId = 1, @ProductId = 9;
EXEC CreateShopCartDetail @Quantity = 1, @Price = 140.00, @SubTotal = 140.00, @ShopCartId = 1, @ProductId = 10;

SELECT * FROM ShopCartDetail scd;
   
--AHORA SI PUEDES BORRAR UN PRODUCTO
EXEC DeleteProductFromShopCartDetail 
    @ProductId = 2, 
    @ShopCartId = 1;
   
SELECT * FROM ShopCartDetail scd;

--PRIMERO CREA EL CARRITO--
EXEC CreateShopCartDetail @Quantity = 3, @Price = 110.00, @SubTotal = 330.00, @ShopCartId = 2, @ProductId = 1;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 130.00, @SubTotal = 260.00, @ShopCartId = 2, @ProductId = 2;
EXEC CreateShopCartDetail @Quantity = 5, @Price = 90.00, @SubTotal = 450.00, @ShopCartId = 2, @ProductId = 3;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 100.00, @SubTotal = 200.00, @ShopCartId = 2, @ProductId = 4;
EXEC CreateShopCartDetail @Quantity = 3, @Price = 180.00, @SubTotal = 540.00, @ShopCartId = 2, @ProductId = 5;
EXEC CreateShopCartDetail @Quantity = 6, @Price = 120.00, @SubTotal = 720.00, @ShopCartId = 2, @ProductId = 6;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 65.00, @SubTotal = 130.00, @ShopCartId = 2, @ProductId = 7;
EXEC CreateShopCartDetail @Quantity = 4, @Price = 85.00, @SubTotal = 340.00, @ShopCartId = 2, @ProductId = 8;
EXEC CreateShopCartDetail @Quantity = 6, @Price = 55.00, @SubTotal = 330.00, @ShopCartId = 2, @ProductId = 9;
EXEC CreateShopCartDetail @Quantity = 2, @Price = 140.00, @SubTotal = 280.00, @ShopCartId = 2, @ProductId = 10;

SELECT * FROM ShopCartDetail scd;

--AHORA SI PUEDES BORRAR UN PRODUCTO
   EXEC DeleteProductFromShopCartDetail 
    @ProductId = 3, 
    @ShopCartId = 2;

SELECT * FROM ShopCartDetail scd;

--ACTUALIZAR ESTADO DE ORDEN--
SELECT * FROM Orders o;
   EXEC UpdateOrderState 
    @OrderId = 1, 
    @StateId = 3;

   EXEC UpdateOrderState 
    @OrderId = 2, 
    @StateId = 3;
   
SELECT * FROM Orders o;
   
--ACTUALIZAR CATEGORIAS--
SELECT * FROM Category c;
   EXEC UpdateCategory 
    @CategoryId = 1, 
    @Name = 'Deportes';

   EXEC UpdateCategory 
    @CategoryId = 2, 
    @Name = 'Electrónica';
   
SELECT * FROM Category c;
   
--ACTIVAR O DESACTIVAR UNA CATEGORIA--
SELECT * FROM Category c;
SELECT * FROM Product p;

   EXEC UpdateCategoryState 
    @CategoryId = 1, 
    @StateId = 2;
   
--AHORA LA CATEGORIA Y LOS PRODUCTOS RELACIONADOS A ELLA ESTAN DESACTIVADOS--
SELECT * FROM Category c; 
SELECT * FROM Product p;

   EXEC UpdateCategoryState 
    @CategoryId = 2, 
    @StateId = 2;
--AHORA LA CATEGORIA Y LOS PRODUCTOS RELACIONADOS A ELLA ESTAN DESACTIVADOS--
SELECT * FROM Category c;
SELECT * FROM Product p;
   
   


