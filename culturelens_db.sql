-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2025 at 05:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `culturelens_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `IDNumber` varchar(50) NOT NULL,
  `StartingDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `CountryID` int(11) NOT NULL,
  `CountryName` varchar(100) NOT NULL,
  `Traditions` text DEFAULT NULL,
  `Festivals` text DEFAULT NULL,
  `DressCode` text DEFAULT NULL,
  `Greetings` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `ExperienceID` int(11) NOT NULL,
  `CountryID` int(11) DEFAULT NULL,
  `ExperienceName` varchar(150) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `itinerary`
--

CREATE TABLE `itinerary` (
  `ItineraryID` int(11) NOT NULL,
  `TravelerID` int(11) DEFAULT NULL,
  `Destination` varchar(150) DEFAULT NULL,
  `TravelDates` varchar(100) DEFAULT NULL,
  `Budget` decimal(10,2) DEFAULT NULL,
  `Interests` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itinerary`
--

INSERT INTO `itinerary` (`ItineraryID`, `TravelerID`, `Destination`, `TravelDates`, `Budget`, `Interests`) VALUES
(1, 1, 'Kyoto, Japan', '2025-12-15 to 2025-12-20', 30000.00, 'Temples, Food, Local Culture'),
(2, 1, 'Kyoto, Japan', '2025-12-15 to 2025-12-18', 30000.00, 'Temples, Food, Culture');

-- --------------------------------------------------------

--
-- Table structure for table `landmark`
--

CREATE TABLE `landmark` (
  `LandmarkID` int(11) NOT NULL,
  `CountryID` int(11) DEFAULT NULL,
  `LandmarkName` varchar(150) NOT NULL,
  `Description` text DEFAULT NULL,
  `CulturalEtiquette` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `NotificationID` int(11) NOT NULL,
  `TravelerID` int(11) DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `Location` varchar(150) DEFAULT NULL,
  `DateTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `ReviewID` int(11) NOT NULL,
  `TravelerID` int(11) DEFAULT NULL,
  `TargetType` varchar(50) DEFAULT NULL,
  `TargetID` int(11) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL CHECK (`Rating` between 1 and 5),
  `Comment` text DEFAULT NULL,
  `DatePosted` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`ReviewID`, `TravelerID`, `TargetType`, `TargetID`, `Rating`, `Comment`, `DatePosted`) VALUES
(1, 1, 'Landmark', 1, 5, 'The temple was serene and culturally rich!', '2025-10-13 22:06:33');

-- --------------------------------------------------------

--
-- Table structure for table `savedtrips`
--

CREATE TABLE `savedtrips` (
  `SavedTripID` int(11) NOT NULL,
  `TravelerID` int(11) NOT NULL,
  `ItineraryID` int(11) NOT NULL,
  `SavedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `savedtrips`
--

INSERT INTO `savedtrips` (`SavedTripID`, `TravelerID`, `ItineraryID`, `SavedAt`) VALUES
(1, 1, 1, '2025-10-13 22:45:44');

-- --------------------------------------------------------

--
-- Table structure for table `translationlog`
--

CREATE TABLE `translationlog` (
  `TranslationID` int(11) NOT NULL,
  `TravelerID` int(11) DEFAULT NULL,
  `InputText` text DEFAULT NULL,
  `OutputText` text DEFAULT NULL,
  `SourceLanguage` varchar(50) DEFAULT NULL,
  `TargetLanguage` varchar(50) DEFAULT NULL,
  `DateTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `translationlog`
--

INSERT INTO `translationlog` (`TranslationID`, `TravelerID`, `InputText`, `OutputText`, `SourceLanguage`, `TargetLanguage`, `DateTime`) VALUES
(1, 1, 'Hello', 'Konnichiwa', 'English', 'Japanese', '2025-10-13 22:13:23');

-- --------------------------------------------------------

--
-- Table structure for table `traveler`
--

CREATE TABLE `traveler` (
  `TravelerID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `traveler`
--

INSERT INTO `traveler` (`TravelerID`, `UserID`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `travelstory`
--

CREATE TABLE `travelstory` (
  `StoryID` int(11) NOT NULL,
  `TravelerID` int(11) DEFAULT NULL,
  `Title` varchar(150) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `DatePosted` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travelstory`
--

INSERT INTO `travelstory` (`StoryID`, `TravelerID`, `Title`, `Content`, `DatePosted`) VALUES
(1, 1, 'My Trip to Kyoto', 'I visited Fushimi Inari Shrine, and it was beautiful!', '2025-10-13 22:05:49');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `PreferredLanguage` varchar(50) DEFAULT NULL,
  `UserType` enum('Traveler','Admin') DEFAULT 'Traveler'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Email`, `Password`, `FirstName`, `LastName`, `ContactNumber`, `PreferredLanguage`, `UserType`) VALUES
(1, 'zidane@example.com', '$2y$10$NtuQLnosZPh4YOaHwCDN4eIto7lvVB1DXmjBIjiJjd6Z5wS664Kme', 'Zidane', 'Salvador', '09987654321', 'Japanese', 'Traveler');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`CountryID`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`ExperienceID`),
  ADD KEY `CountryID` (`CountryID`);

--
-- Indexes for table `itinerary`
--
ALTER TABLE `itinerary`
  ADD PRIMARY KEY (`ItineraryID`),
  ADD KEY `TravelerID` (`TravelerID`);

--
-- Indexes for table `landmark`
--
ALTER TABLE `landmark`
  ADD PRIMARY KEY (`LandmarkID`),
  ADD KEY `CountryID` (`CountryID`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`NotificationID`),
  ADD KEY `TravelerID` (`TravelerID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `TravelerID` (`TravelerID`);

--
-- Indexes for table `savedtrips`
--
ALTER TABLE `savedtrips`
  ADD PRIMARY KEY (`SavedTripID`),
  ADD KEY `TravelerID` (`TravelerID`),
  ADD KEY `ItineraryID` (`ItineraryID`);

--
-- Indexes for table `translationlog`
--
ALTER TABLE `translationlog`
  ADD PRIMARY KEY (`TranslationID`),
  ADD KEY `TravelerID` (`TravelerID`);

--
-- Indexes for table `traveler`
--
ALTER TABLE `traveler`
  ADD PRIMARY KEY (`TravelerID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `travelstory`
--
ALTER TABLE `travelstory`
  ADD PRIMARY KEY (`StoryID`),
  ADD KEY `TravelerID` (`TravelerID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `CountryID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `ExperienceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `itinerary`
--
ALTER TABLE `itinerary`
  MODIFY `ItineraryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `landmark`
--
ALTER TABLE `landmark`
  MODIFY `LandmarkID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `NotificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `savedtrips`
--
ALTER TABLE `savedtrips`
  MODIFY `SavedTripID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `translationlog`
--
ALTER TABLE `translationlog`
  MODIFY `TranslationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `traveler`
--
ALTER TABLE `traveler`
  MODIFY `TravelerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `travelstory`
--
ALTER TABLE `travelstory`
  MODIFY `StoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`CountryID`) REFERENCES `country` (`CountryID`) ON DELETE CASCADE;

--
-- Constraints for table `itinerary`
--
ALTER TABLE `itinerary`
  ADD CONSTRAINT `itinerary_ibfk_1` FOREIGN KEY (`TravelerID`) REFERENCES `traveler` (`TravelerID`) ON DELETE CASCADE;

--
-- Constraints for table `landmark`
--
ALTER TABLE `landmark`
  ADD CONSTRAINT `landmark_ibfk_1` FOREIGN KEY (`CountryID`) REFERENCES `country` (`CountryID`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`TravelerID`) REFERENCES `traveler` (`TravelerID`) ON DELETE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`TravelerID`) REFERENCES `traveler` (`TravelerID`) ON DELETE CASCADE;

--
-- Constraints for table `savedtrips`
--
ALTER TABLE `savedtrips`
  ADD CONSTRAINT `savedtrips_ibfk_1` FOREIGN KEY (`TravelerID`) REFERENCES `traveler` (`TravelerID`),
  ADD CONSTRAINT `savedtrips_ibfk_2` FOREIGN KEY (`ItineraryID`) REFERENCES `itinerary` (`ItineraryID`);

--
-- Constraints for table `translationlog`
--
ALTER TABLE `translationlog`
  ADD CONSTRAINT `translationlog_ibfk_1` FOREIGN KEY (`TravelerID`) REFERENCES `traveler` (`TravelerID`) ON DELETE CASCADE;

--
-- Constraints for table `traveler`
--
ALTER TABLE `traveler`
  ADD CONSTRAINT `traveler_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `travelstory`
--
ALTER TABLE `travelstory`
  ADD CONSTRAINT `travelstory_ibfk_1` FOREIGN KEY (`TravelerID`) REFERENCES `traveler` (`TravelerID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
