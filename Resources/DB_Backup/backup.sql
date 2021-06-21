-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: mysql.hrz.tu-chemnitz.de
-- Generation Time: Jun 22, 2021 at 01:00 AM
-- Server version: 10.3.29-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SMS_DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `AssignedSubject`
--

CREATE TABLE IF NOT EXISTS `AssignedSubject` (
  `aid` varchar(20) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `sid` varchar(20) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Class`
--

CREATE TABLE IF NOT EXISTS `Class` (
  `cid` varchar(20) NOT NULL,
  `classname` varchar(15) NOT NULL,
  `is_removed` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ClassStudent`
--

CREATE TABLE IF NOT EXISTS `ClassStudent` (
  `csid` varchar(20) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `cid` varchar(20) NOT NULL,
  `isAssigned` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE IF NOT EXISTS `result` (
  `resid` varchar(20) NOT NULL,
  `marks` float NOT NULL,
  `tid` varchar(20) NOT NULL,
  `aid` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Subject`
--

CREATE TABLE IF NOT EXISTS `Subject` (
  `sid` varchar(20) NOT NULL,
  `subjectname` varchar(15) NOT NULL,
  `status` text NOT NULL,
  `uid` varchar(20) NOT NULL,
  `cid` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Test`
--

CREATE TABLE IF NOT EXISTS `Test` (
  `tid` varchar(20) NOT NULL,
  `testname` varchar(15) NOT NULL,
  `testdate` date NOT NULL,
  `sid` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `uid` varchar(20) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `firstname` varchar(15) NOT NULL,
  `lastname` varchar(15) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`uid`, `username`, `password`, `firstname`, `lastname`, `role`) VALUES
('sud', 'xyz', '$2y$12$SsDUkY6YTEQPQDeGJ8LcxukalkYU2rCatYTus4kQISnALZkyd22Om', 'God', 'Admin', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AssignedSubject`
--
ALTER TABLE `AssignedSubject`
  ADD PRIMARY KEY (`aid`),
  ADD KEY `fk_uid_assignsub` (`uid`),
  ADD KEY `fk_sid_assignsub` (`sid`);

--
-- Indexes for table `Class`
--
ALTER TABLE `Class`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `ClassStudent`
--
ALTER TABLE `ClassStudent`
  ADD PRIMARY KEY (`csid`),
  ADD KEY `fk_uid_cs` (`uid`),
  ADD KEY `fk_cid_cs` (`cid`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`resid`),
  ADD UNIQUE KEY `resid` (`resid`),
  ADD KEY `fk_tid_res` (`tid`),
  ADD KEY `fk_aid` (`aid`);

--
-- Indexes for table `Subject`
--
ALTER TABLE `Subject`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `fk_cid` (`cid`),
  ADD KEY `fk_uid` (`uid`);

--
-- Indexes for table `Test`
--
ALTER TABLE `Test`
  ADD PRIMARY KEY (`tid`),
  ADD KEY `fk_sid_test` (`sid`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`uid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AssignedSubject`
--
ALTER TABLE `AssignedSubject`
  ADD CONSTRAINT `fk_sid_assignsub` FOREIGN KEY (`sid`) REFERENCES `Subject` (`sid`),
  ADD CONSTRAINT `fk_uid_assignsub` FOREIGN KEY (`uid`) REFERENCES `User` (`uid`);

--
-- Constraints for table `ClassStudent`
--
ALTER TABLE `ClassStudent`
  ADD CONSTRAINT `fk_cid_cs` FOREIGN KEY (`cid`) REFERENCES `Class` (`cid`),
  ADD CONSTRAINT `fk_uid_cs` FOREIGN KEY (`uid`) REFERENCES `User` (`uid`);

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `fk_aid` FOREIGN KEY (`aid`) REFERENCES `AssignedSubject` (`aid`),
  ADD CONSTRAINT `fk_tid_res` FOREIGN KEY (`tid`) REFERENCES `Test` (`tid`);

--
-- Constraints for table `Subject`
--
ALTER TABLE `Subject`
  ADD CONSTRAINT `fk_cid` FOREIGN KEY (`cid`) REFERENCES `Class` (`cid`),
  ADD CONSTRAINT `fk_uid` FOREIGN KEY (`uid`) REFERENCES `User` (`uid`);

--
-- Constraints for table `Test`
--
ALTER TABLE `Test`
  ADD CONSTRAINT `fk_sid_test` FOREIGN KEY (`sid`) REFERENCES `Subject` (`sid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;