-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-11-2021 a las 22:44:17
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmacia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `dni` int(8) DEFAULT NULL,
  `edad` date NOT NULL,
  `telefono` int(15) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `sexo` varchar(45) NOT NULL,
  `adicional` varchar(500) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `apellidos`, `dni`, `edad`, `telefono`, `correo`, `sexo`, `adicional`, `avatar`, `estado`) VALUES
(1, 'Eduardo', 'Maguina Canales', 87654321, '1966-10-08', 986431890, 'emaguinac@gmail.com', 'Masculino', NULL, NULL, 'A'),
(2, 'carlos', 'correa', 35435435, '2021-11-07', 2147483647, 'amasip@gmail.com', 'masculino', 'crcrcr', 'cliente_default.png', 'A'),
(3, 'cristiano', 'ronaldo', 46546546, '2021-10-24', 2147483647, 'cristiano@cristiano.com', 'masculino', 'cr7', 'cliente_default.png', 'I'),
(4, 'coco', 'burger', 13213213, '2021-10-15', 13213213, '1631469@utp.edu.pe', 'masculino', 'ghghg', 'cliente_default.png', 'I'),
(5, 'aws', 'red', 5466546, '2021-10-31', 35435, 'fapsrl@gmail.com', 'masculino', 'jh', 'cliente_default.png', 'I'),
(6, 'manuel', 'neuer', 98765090, '2021-11-06', 2147483647, 'neuer@gmail.com', 'masculino', 'bayern', 'cliente_default.png', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `fecha_compra` date NOT NULL,
  `fecha_entrega` date NOT NULL,
  `total` float NOT NULL,
  `id_estado_pago` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id`, `codigo`, `fecha_compra`, `fecha_entrega`, `total`, `id_estado_pago`, `id_proveedor`) VALUES
(14, '1321321', '2021-10-30', '2021-10-31', 1, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalle` int(11) NOT NULL,
  `det_cantidad` int(11) NOT NULL,
  `det_vencimiento` date NOT NULL,
  `id_det_lote` int(11) NOT NULL,
  `id_det_prod` int(11) NOT NULL,
  `lote_id_prov` int(255) NOT NULL,
  `id_det_venta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_venta`
--

INSERT INTO `detalle_venta` (`id_detalle`, `det_cantidad`, `det_vencimiento`, `id_det_lote`, `id_det_prod`, `lote_id_prov`, `id_det_venta`) VALUES
(22, 10, '2021-10-31', 6, 9, 3, 23),
(23, 1, '2021-11-19', 5, 9, 3, 23),
(24, 2, '2021-11-19', 5, 9, 3, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pago`
--

CREATE TABLE `estado_pago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado_pago`
--

INSERT INTO `estado_pago` (`id`, `nombre`) VALUES
(1, 'Cancelado'),
(2, 'No cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `laboratorio`
--

CREATE TABLE `laboratorio` (
  `id_laboratorio` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `laboratorio`
--

INSERT INTO `laboratorio` (`id_laboratorio`, `nombre`, `avatar`, `estado`) VALUES
(1, 'Bayer Munich', 'lab_default.jpg', 'I'),
(2, 'Biotech', 'lab_default.jpg', 'A'),
(3, 'Pixed', 'lab_default.jpg', 'A'),
(4, 'Alpharma', 'lab_default.jpg', 'A'),
(5, 'Abbiot', 'lab_default.jpg', 'A'),
(6, 'JP Farma', 'lab_default.jpg', 'A'),
(7, 'Umbrella Corp', 'lab_default.jpg', 'A'),
(8, 'Vitalis', 'lab_default.jpg', 'A'),
(9, 'VI Farma', 'lab_default.jpg', 'A'),
(10, 'Union del Peru', 'lab_default.jpg', 'A'),
(11, 'Sinop', 'lab_default.jpg', 'I'),
(12, 'verguenza lima', 'lab_default.jpg', 'I'),
(13, 'steve', 'lab_default.jpg', 'I'),
(14, 'mko', 'lab_default.jpg', 'I'),
(15, 'para', 'lab_default.jpg', 'I');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lote`
--

CREATE TABLE `lote` (
  `id` int(11) NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `cantidad_lote` int(11) NOT NULL,
  `vencimiento` date NOT NULL,
  `precio_compra` float NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_compra` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lote`
--

INSERT INTO `lote` (`id`, `codigo`, `cantidad`, `cantidad_lote`, `vencimiento`, `precio_compra`, `estado`, `id_compra`, `id_producto`) VALUES
(4, '21321321', 10, 10, '2021-12-04', 1, 'A', 14, 9),
(5, '6765765', 10, 7, '2021-11-19', 1, 'A', 14, 9),
(6, '987979', 10, 0, '2021-10-31', 1, 'I', 14, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentacion`
--

CREATE TABLE `presentacion` (
  `id_presentacion` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `presentacion`
--

INSERT INTO `presentacion` (`id_presentacion`, `nombre`, `estado`) VALUES
(1, 'masyup', 'A'),
(4, 'lol', 'A'),
(5, 'test', 'I'),
(6, 'tmr', 'I'),
(7, 'hand', 'I'),
(8, 'conce', 'I'),
(9, 'cabero', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `concentracion` varchar(255) DEFAULT NULL,
  `adicional` varchar(255) DEFAULT NULL,
  `precio` float NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `prod_lab` int(11) NOT NULL,
  `prod_tip_prod` int(11) NOT NULL,
  `prod_present` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `concentracion`, `adicional`, `precio`, `avatar`, `estado`, `prod_lab`, `prod_tip_prod`, `prod_present`) VALUES
(1, 'jordan', 'jordan', 'jordan', 16.4, '6157ed7302482-6157d10582ad5-bisovol.jpg', 'A', 5, 2, 4),
(7, 'ibuprofeno', '500mg', 'tabletas', 5.6, '6157d4471ccf0-6157d11209b7f-flutox.jpg', 'A', 5, 2, 4),
(9, 'asidomol', 'as', 'as', 1.5, '6157d40a0b27e-6157d0ed82689-plexus.jpg', 'A', 5, 2, 4),
(10, 'jo', '', '', 0, 'prod_default.png', 'I', 5, 2, 4),
(11, 'cancer', 'cancer', 'cancer', 18, 'prod_default.png', 'A', 5, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL,
  `ruc` varchar(255) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `telefono` int(11) NOT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `ruc`, `nombre`, `telefono`, `correo`, `direccion`, `avatar`, `estado`) VALUES
(1, '20263804300', 'faride', 9876554, 'fapsrl@gmail.com', 'icaro', '6147fa665a7c8-2.jpg', 'A'),
(2, '12345678911', 'DragonFar', 987654326, 'dragonfar@dragonfar.com', 'las amapolas 304 - Lince', '6147fa88b2f60-3.jpg', 'A'),
(3, '20263804333', 'Amasip', 235799, 'amasip@gmail.com', 'chorrillos', 'prov_default.png', 'A'),
(7, '43243243243', 'yamil', 43432432, 'yamil@yamil.com', 'resef', 'prov_default.png', 'A'),
(8, '34535354354', 'luigu', 42432432, 'yamil@yamil.com', 'cesae', 'prov_default.png', 'A'),
(9, '64654654654', 'steve', 2147483647, 'steve@steve.com', 'sesre', 'prov_default.png', 'A'),
(10, '13213213215', 'pepito y los palotes', 2147483647, 'pepito@gmail.com', 'palotes 6', 'prov_default.png', 'I');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_producto`
--

CREATE TABLE `tipo_producto` (
  `id_tip_prod` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_producto`
--

INSERT INTO `tipo_producto` (`id_tip_prod`, `nombre`, `estado`) VALUES
(1, 'Generico', 'A'),
(2, 'Comercial', 'A'),
(5, 'ziko', 'A'),
(6, 'sfdk', 'I');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_us`
--

CREATE TABLE `tipo_us` (
  `id_tipo_us` int(11) NOT NULL,
  `nombre_tipo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_us`
--

INSERT INTO `tipo_us` (`id_tipo_us`, `nombre_tipo`) VALUES
(1, 'Administrador'),
(2, 'Tecnico'),
(3, 'Root');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_us` varchar(45) NOT NULL,
  `apellidos_us` varchar(45) NOT NULL,
  `edad` date NOT NULL,
  `dni_us` varchar(45) NOT NULL,
  `contrasena_us` varchar(255) NOT NULL,
  `telefono_us` int(11) DEFAULT NULL,
  `residencia_us` varchar(45) DEFAULT NULL,
  `correo_us` varchar(45) DEFAULT NULL,
  `sexo_us` varchar(25) DEFAULT NULL,
  `adicional_us` varchar(500) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `us_tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_us`, `apellidos_us`, `edad`, `dni_us`, `contrasena_us`, `telefono_us`, `residencia_us`, `correo_us`, `sexo_us`, `adicional_us`, `avatar`, `us_tipo`) VALUES
(1, 'Jordan Jesus', 'Pauca Laos', '1993-07-16', '48201920', '$2y$10$VQr3X5yEkh.ewJ1yeQEe0u9xtahZw74JFqyCT8aojSYFyb4WRUC/2', 998416580, 'Chorrillos', '1631469@utp.edu.pe', 'Masculino', 'Estudiante Universitario - UTP', '617d449131d12-bayern.png', 3),
(2, 'Jhonny Luis', 'Flores Muñoz', '1995-12-02', '12345', '12345', 987654321, 'La Victoria', '1412489@utp.edu.pe', 'Masculino', 'Programador', '61344c979bff3-jhonny.jpg', 1),
(6, 'yuliana', 'jauregui rosas', '2021-09-11', '98765', '98765', NULL, NULL, NULL, NULL, NULL, 'user_default.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_venta` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `cliente` varchar(45) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `vendedor` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`id_venta`, `fecha`, `cliente`, `dni`, `total`, `vendedor`, `id_cliente`) VALUES
(23, '2021-10-31 21:23:13', NULL, NULL, 99, 1, 2),
(24, '2021-10-31 23:27:17', NULL, NULL, 3, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta_producto`
--

CREATE TABLE `venta_producto` (
  `id_ventaproducto` int(11) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(11) NOT NULL,
  `subtotal` float NOT NULL,
  `producto_id_producto` int(11) NOT NULL,
  `venta_id_venta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `venta_producto`
--

INSERT INTO `venta_producto` (`id_ventaproducto`, `precio`, `cantidad`, `subtotal`, `producto_id_producto`, `venta_id_venta`) VALUES
(22, 9, 11, 99, 9, 23),
(23, 1.5, 2, 3, 9, 24);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado_pago` (`id_estado_pago`,`id_proveedor`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_det_venta_idx` (`id_det_venta`);

--
-- Indices de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  ADD PRIMARY KEY (`id_laboratorio`);

--
-- Indices de la tabla `lote`
--
ALTER TABLE `lote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_compra` (`id_compra`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  ADD PRIMARY KEY (`id_presentacion`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `prod_lab_idx` (`prod_lab`),
  ADD KEY `prod_tip_prod_idx` (`prod_tip_prod`),
  ADD KEY `prod_present_idx` (`prod_present`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`) USING BTREE;

--
-- Indices de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD PRIMARY KEY (`id_tip_prod`);

--
-- Indices de la tabla `tipo_us`
--
ALTER TABLE `tipo_us`
  ADD PRIMARY KEY (`id_tipo_us`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `us_tipo_idx` (`us_tipo`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `vendedor` (`vendedor`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD PRIMARY KEY (`id_ventaproducto`),
  ADD KEY `fk_venta_has_producto_producto1_idx` (`producto_id_producto`),
  ADD KEY `fk_venta_has_producto_venta1_idx` (`venta_id_venta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `lote`
--
ALTER TABLE `lote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `presentacion`
--
ALTER TABLE `presentacion`
  MODIFY `id_presentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `id_tip_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `tipo_us`
--
ALTER TABLE `tipo_us`
  MODIFY `id_tipo_us` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  MODIFY `id_ventaproducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_estado_pago`) REFERENCES `estado_pago` (`id`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`);

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `id_det_venta` FOREIGN KEY (`id_det_venta`) REFERENCES `venta` (`id_venta`);

--
-- Filtros para la tabla `lote`
--
ALTER TABLE `lote`
  ADD CONSTRAINT `lote_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`),
  ADD CONSTRAINT `lote_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `prod_lab` FOREIGN KEY (`prod_lab`) REFERENCES `laboratorio` (`id_laboratorio`),
  ADD CONSTRAINT `prod_present` FOREIGN KEY (`prod_present`) REFERENCES `presentacion` (`id_presentacion`),
  ADD CONSTRAINT `prod_tip_prod` FOREIGN KEY (`prod_tip_prod`) REFERENCES `tipo_producto` (`id_tip_prod`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `us_tipo` FOREIGN KEY (`us_tipo`) REFERENCES `tipo_us` (`id_tipo_us`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`vendedor`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`);

--
-- Filtros para la tabla `venta_producto`
--
ALTER TABLE `venta_producto`
  ADD CONSTRAINT `fk_venta_has_producto_producto1` FOREIGN KEY (`producto_id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `fk_venta_has_producto_venta1` FOREIGN KEY (`venta_id_venta`) REFERENCES `venta` (`id_venta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
