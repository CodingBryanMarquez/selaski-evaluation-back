-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2022 a las 16:48:43
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `selaski`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `idOrder` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `orderNumber` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `dateTime` date NOT NULL,
  `providerName` varchar(64) COLLATE utf8_spanish2_ci NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `observation` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `totalValue` float NOT NULL,
  `status` enum('Rechazado','Pendiente','Aprobado','Unknown') COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`idOrder`, `idUser`, `orderNumber`, `dateTime`, `providerName`, `dateCreated`, `observation`, `totalValue`, `status`) VALUES
(2, 3, '30', '2022-07-08', '', '2022-05-20 04:55:39', NULL, 7500, 'Aprobado'),
(3, 1, '21', '2022-07-07', 'chile', '2022-05-20 04:56:56', '', 500, 'Aprobado'),
(5, 2, '27', '2022-07-08', 'chile', '2022-05-20 12:12:40', '', 7500, 'Aprobado'),
(6, 3, '28', '2022-07-08', 'chile', '2022-05-20 12:13:14', NULL, 7500, 'Aprobado'),
(7, 3, '35', '2022-07-08', '', '2022-05-20 12:19:23', NULL, 7500, 'Aprobado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_products`
--

CREATE TABLE `orders_products` (
  `idOrdersProducts` int(11) NOT NULL,
  `idOrder` int(11) NOT NULL,
  `valueUnit` float NOT NULL,
  `unit` enum('cm','kg','lb','cm3','m','gr','ft3') COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(32) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `sku` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `qtyBox` int(11) NOT NULL,
  `weight` varchar(16) COLLATE utf8_spanish2_ci NOT NULL,
  `volumen` varchar(16) COLLATE utf8_spanish2_ci NOT NULL,
  `mark` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `orders_products`
--

INSERT INTO `orders_products` (`idOrdersProducts`, `idOrder`, `valueUnit`, `unit`, `description`, `sku`, `quantity`, `qtyBox`, `weight`, `volumen`, `mark`, `status`) VALUES
(1, 5, 5, 'ft3', NULL, 'jh21', 12, 12, '75 kg', '5 ft3', 'phyzer', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(64) COLLATE utf8_spanish2_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `name`, `email`, `status`) VALUES
(1, 'Bryan', 'Bryan@mail.com', 1),
(2, 'David', 'David@mail.com', 1),
(3, 'Test', 'Test@mail.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`idOrder`),
  ADD UNIQUE KEY `orderNumber` (`orderNumber`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`idOrdersProducts`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `idOrder` (`idOrder`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `idOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `orders_products`
--
ALTER TABLE `orders_products`
  MODIFY `idOrdersProducts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
