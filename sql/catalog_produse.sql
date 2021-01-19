CREATE DATABASE `catalog_produse` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `catalog_produse`;


CREATE TABLE IF NOT EXISTS `produse` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `nume` varchar(30) DEFAULT NULL,
  `descriere` varchar(200) DEFAULT NULL,
  `pret` int(5) DEFAULT NULL,
  `producator` varchar(30) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
