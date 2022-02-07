-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 07. Feb 2022 um 17:34
-- Server-Version: 10.5.12-MariaDB-0+deb11u1
-- PHP-Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `test`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bans`
--

CREATE TABLE `bans` (
  `ip` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat`
--

CREATE TABLE `chat` (
  `ip` text NOT NULL,
  `groupname` text NOT NULL,
  `username` text NOT NULL,
  `text` text NOT NULL,
  `ts` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `groups`
--

CREATE TABLE `groups` (
  `groupname` text DEFAULT NULL,
  `owner` text NOT NULL,
  `members` text DEFAULT NULL,
  `creation_date` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `members`
--

CREATE TABLE `members` (
  `username` text NOT NULL,
  `password` text NOT NULL,
  `registration_date` bigint(20) NOT NULL,
  `level` int(11) NOT NULL,
  `joined_groups` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `members`
--

INSERT INTO `members` (`username`, `password`, `registration_date`, `level`, `joined_groups`) VALUES
('null', 'null', 1644255260, 0, 'main');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
