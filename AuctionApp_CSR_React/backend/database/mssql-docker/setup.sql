CREATE DATABASE AuctionApp;
GO

ALTER LOGIN sa ENABLE;
GO
ALTER LOGIN sa WITH PASSWORD = 'Haslo123!';
GO

use AuctionApp
go
exec sp_addrolemember 'db_owner', 'sa'
go