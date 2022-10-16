CREATE DATABASE IF NOT EXISTS `page`;
USE `page`;

CREATE TABLE `pages` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT,
	`Title` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`ID`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

CREATE TABLE `images` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT,
	`URL` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`ID`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;


CREATE TABLE `rowcontainer` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT,
	`PageID` INT(11) NOT NULL,
	PRIMARY KEY (`ID`) USING BTREE,
	INDEX `PageID` (`PageID`) USING BTREE,
	CONSTRAINT `rowcontainer_ibfk_1` FOREIGN KEY (`PageID`) REFERENCES `pages` (`ID`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;


CREATE TABLE `columncontainer` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT,
	`RowID` INT(11) NOT NULL,
	PRIMARY KEY (`ID`) USING BTREE,
	INDEX `RowID` (`RowID`) USING BTREE,
	CONSTRAINT `columncontainer_ibfk_1` FOREIGN KEY (`RowID`) REFERENCES `rowcontainer` (`ID`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;


CREATE TABLE `imageelements` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT,
	`ColumnID` INT(11) NOT NULL,
	`ImageID` INT(11) NOT NULL,
	PRIMARY KEY (`ID`) USING BTREE,
	INDEX `ColumnID` (`ColumnID`) USING BTREE,
	INDEX `ImageID` (`ImageID`) USING BTREE,
	CONSTRAINT `imageelements_ibfk_1` FOREIGN KEY (`ColumnID`) REFERENCES `columncontainer` (`ID`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `imageelements_ibfk_2` FOREIGN KEY (`ImageID`) REFERENCES `images` (`ID`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;


-- create a page with one row and 2 columns which each has an image

INSERT INTO `page`.`images` (`URL`) VALUES ('https://picsum.photos/200');
INSERT INTO `page`.`images` (`URL`) VALUES ('https://picsum.photos/id/237/200/300');

INSERT INTO `page`.`pages` (`Title`) VALUES ('Test Page');

INSERT INTO `page`.`rowcontainer` (`PageID`) VALUES ('1');

INSERT INTO `page`.`columncontainer` (`RowID`) VALUES ('1');
INSERT INTO `page`.`columncontainer` (`RowID`) VALUES ('1');

INSERT INTO `page`.`imageelements` (`ColumnID`, `ImageID`) VALUES ('1', '1');
INSERT INTO `page`.`imageelements` (`ColumnID`, `ImageID`) VALUES ('2', '2');

-- create an empty page
INSERT INTO `page`.`pages` (`Title`) VALUES ('Sample Page');

-- add another image
INSERT INTO `page`.`images` (`URL`) VALUES ('https://picsum.photos/id/236/200/300');
