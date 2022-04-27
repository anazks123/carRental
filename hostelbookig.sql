-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2022 at 02:28 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hostelbookig`
--

-- --------------------------------------------------------

--
-- Table structure for table `addfeatures`
--

CREATE TABLE `addfeatures` (
  `mail` varchar(255) NOT NULL,
  `f1` varchar(100) NOT NULL,
  `f2` varchar(100) NOT NULL,
  `f3` varchar(100) NOT NULL,
  `tamount` int(100) NOT NULL,
  `noFoodA` varchar(100) NOT NULL,
  `id` int(11) NOT NULL,
  `menu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `addfeatures`
--

INSERT INTO `addfeatures` (`mail`, `f1`, `f2`, `f3`, `tamount`, `noFoodA`, `id`, `menu`) VALUES
('eka11@gmail.com', 'faeture 1', 'bUS STAND nEA', 'laundary ', 4500, '3500', 5, '');

-- --------------------------------------------------------

--
-- Table structure for table `addpost`
--

CREATE TABLE `addpost` (
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `id` int(2) NOT NULL,
  `regid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `shopname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` int(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `longt` varchar(10) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `username` varchar(50) NOT NULL,
  `usermobile` int(50) NOT NULL,
  `useremail` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `id` int(255) NOT NULL,
  `rs` varchar(50) NOT NULL DEFAULT 'notpayed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`shopname`, `email`, `mobile`, `city`, `lat`, `longt`, `status`, `username`, `usermobile`, `useremail`, `time`, `id`, `rs`) VALUES
('Eka Family Saloon', 'eka11@gmail.com', 2147483647, 'Kochi', '', '', 'pending', 'Anaz', 2147483647, 'anaz123@gmail.com', '2022-3-17 23:6:38', 22, 'notpayed');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `email` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `mobile` int(255) NOT NULL,
  `password` varchar(20) NOT NULL,
  `repassword2` varchar(255) NOT NULL,
  `id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`email`, `username`, `mobile`, `password`, `repassword2`, `id`) VALUES
('anaz123@gmail.com', 'Anaz', 2147483647, '123', '123', 5);

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `ShopName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` int(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cpassword` varchar(100) NOT NULL,
  `id` int(10) NOT NULL,
  `city` varchar(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `image` varchar(255) NOT NULL DEFAULT 'not updeted',
  `menu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`ShopName`, `email`, `mobile`, `password`, `cpassword`, `id`, `city`, `status`, `image`, `menu`) VALUES
('Eka Family Saloon', 'eka11@gmail.com', 2147483647, '123', '123', 6, 'Kochi', 'approved', 'images.jfif', 'anaz.jfif'),
('Glam Salon', 'glam12@gamil.com', 2147483647, '123', '123', 7, 'Kochi', 'approved', '0f274da970070ab779de6ea46a8523f4.jpg', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addfeatures`
--
ALTER TABLE `addfeatures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `addpost`
--
ALTER TABLE `addpost`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addfeatures`
--
ALTER TABLE `addfeatures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `addpost`
--
ALTER TABLE `addpost`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
